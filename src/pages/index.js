import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import {
  //initialCards,
  config,
  profileEditForm,
  addCardFormElement,
  profileEditButton,
  addNewCardButton,
  profileTitleInput,
  profileDescriptionInput,
  profileAvatarButton,
  editAvatarForm,
  //cardListEl,
} from "../utils/constants.js";
import Api from "../components/Api.js";
import PopupConfirmDelete from "../components/popupConfirmDelete.js";
//----------------------------------API--------------------------------------//
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
  .catch((err) => console.error(err));

api
  .getUser()
  .then((inputValues) => {
    userInfo.setUserInfo(inputValues.name, inputValues.about);
    userInfo.setAvatar(inputValues.avatar);
  })
  .catch((err) => console.error(err));

function handleAddCardFormSubmit(cardData) {
  newCardPopup.viewLoading(true);
  api
    .addCard(cardData)
    .then((cardData) => {
      cardSection.addItem(
        getCardElement({ name: cardData.name, link: cardData.link })
      );
      addCardValidator.disableButton();
      newCardPopup.resetForm();
      newCardPopup.close();
    })
    .catch((err) => {
      console.err(err);
    })
    .finally(() => {
      newCardPopup.viewLoading(false);
    });
}

//----------------------------event handlers---------------------------------//
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
    .catch((err) => {
      console.err(err);
    })
    .finally(() => {
      avatarEditPopup.viewLoading(false);
    });
}

//-----------------------------------event listeners--------------------------//
addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

profileEditButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  profileTitleInput.value = data.name;
  profileDescriptionInput.value = data.about;
  profileEditPopup.open();
});

//---------------------------------functions---------------------------------//
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

//-----------------instantiations------------------------------//
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
      .catch((err) => console.error(err));
  } else {
    api
      .addLike(card.id)
      .then(() => {
        card.setIsLiked(true);
      })
      .catch((err) => console.error(err));
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
