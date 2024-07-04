import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import {
  config,
  profileEditForm,
  addCardFormElement,
  profileEditButton,
  addNewCardButton,
  profileTitleInput,
  profileDescriptionInput,
  profileAvatarButton,
  editAvatarForm,
} from "../utils/constants.js";
import Api from "../components/Api.js";
import PopupConfirmDelete from "../components/PopupConfirmDelete.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "096eb059-8249-432c-aed5-ea6f0d18c1d5",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

let cardSection;
api
  .getInitialCards()
  .then((cardData) => {
    cardSection = new Section(
      {
        items: cardData,
        renderer: (cardData) => {
          const cardElement = getCardElement(cardData);
          cardSection.addItem(cardElement);
        },
      },
      ".gallery__cards"
    );
    cardSection.renderItems();
  })
  .catch(console.error);

api
  .getUser()
  .then((inputValues) => {
    userInfo.setUserInfo(inputValues.name, inputValues.about);
    userInfo.setAvatar(inputValues.avatar);
  })
  .catch(console.error);

function handleAddCardFormSubmit(cardData) {
  newCardPopup.viewLoading(true);
  api
    .addCard(cardData)
    .then((data) => {
      cardSection.addItem(getCardElement(data));
      addCardValidator.disableButton();
      newCardPopup.resetForm();
      newCardPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      newCardPopup.viewLoading(false);
    });
}

function handleImageClick(cardData) {
  popupImage.open(cardData);
}

function handleProfileEditSubmit(inputValues) {
  profileEditPopup.viewLoading(true);
  api
    .editProfile(inputValues.name, inputValues.about)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about);
      profileEditValidator.disableButton();
      profileEditPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      profileEditPopup.viewLoading(false);
    });
}

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

profileEditButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  profileTitleInput.value = data.name;
  profileDescriptionInput.value = data.about;
  profileEditPopup.open();
});

function getCardElement(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleLikeIcon
  );
  const cardElement = card.getView();
  return cardElement;
}

const profileEditValidator = new FormValidator(config, profileEditForm);
const addCardValidator = new FormValidator(config, addCardFormElement);
const addAvatarValidator = new FormValidator(config, editAvatarForm);

profileEditValidator.enableValidation();
addCardValidator.enableValidation();
addAvatarValidator.enableValidation();

const popupImage = new PopupWithImage("#modal-image");
popupImage.setEventListeners();

const newCardPopup = new PopupWithForm(
  "#card-edit-modal",
  handleAddCardFormSubmit
);
newCardPopup.setEventListeners();

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditPopup.setEventListeners();

function handleLikeIcon(card) {
  if (card.isLiked) {
    api
      .removeLike(card.id)
      .then(() => {
        card.setIsLiked(false);
      })
      .catch(console.error);
  } else {
    api
      .addLike(card.id)
      .then(() => {
        card.setIsLiked(true);
      })
      .catch(console.error);
  }
}

const deleteCardPopup = new PopupConfirmDelete("#modal-delete-card");
deleteCardPopup.setEventListeners();

function handleDeleteCard(card) {
  deleteCardPopup.open();
  deleteCardPopup.setConfirmDelete(() => {
    api
      .removeCard(card.id)
      .then(() => {
        card.removeCardElement();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

profileAvatarButton.addEventListener("click", () => {
  avatarEditPopup.open();
});

const avatarEditPopup = new PopupWithForm(
  "#modal-update-avatar",
  handleAvatarSubmit
);
avatarEditPopup.setEventListeners();

function handleAvatarSubmit({ link }) {
  avatarEditPopup.viewLoading(true);
  api
    .updateAvatar(link)
    .then(() => {
      userInfo.setAvatar(link);
      avatarEditPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarEditPopup.viewLoading(false);
    });
}
