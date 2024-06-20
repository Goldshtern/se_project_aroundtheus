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
  //cardListEl,
} from "../utils/constants.js";
import Api from "../components/Api.js";
import { data } from "autoprefixer";
import PopupConfirmDelete from "../components/popupConfirmDelete.js";
import cssnanoPlugin from "cssnano";
//----------------------------------API--------------------------------------//
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "096eb059-8249-432c-aed5-ea6f0d18c1d5",
    "Content-Type": "application/json",
  },
});

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

api.getUser().then((inputValues) => {
  userInfo.setUserInfo(inputValues.name, inputValues.about);
});

function handleAddCardFormSubmit(cardData) {
  //newCardPopup.renderLoading(true);
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
    .catch((error) => {
      console.error("Error adding card:", error);
    });
  //.finally(() => {
  //newCardPopup.renderLoading(false);
  //});
}

//api.removeCard("666dfa668bacc8001af7bb12").then((res) => console.log(res));
//api.editProfile(data).then((res) => console.log(res));
//----------------------------event handlers---------------------------------//
function handleImageClick(cardData) {
  popupImage.open(cardData);
}

function handleProfileEditSubmit(inputValues) {
  userInfo.setUserInfo(inputValues.name, inputValues.about);
  profileEditValidator.disableButton();
  profileEditPopup.close();
}

//function handleAddCardFormSubmit(cardData) {
//cardSection.addItem(
//getCardElement({ name: cardData.name, link: cardData.link })
//);
//addCardValidator.disableButton();
//newCardPopup.resetForm();
//newCardPopup.close();
//}

//-----------------------------------event listeners--------------------------//

profileEditButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  profileTitleInput.value = data.name;
  profileDescriptionInput.value = data.job;
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

//---------------------------------functions---------------------------------//
function getCardElement(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteCard
  );
  const cardElement = card.getView();
  return cardElement;
}

//-----------------instantiations------------------------------//
const profileEditValidator = new FormValidator(config, profileEditForm);
const addCardValidator = new FormValidator(config, addCardFormElement);

profileEditValidator.enableValidation();
addCardValidator.enableValidation();

//const cardSection = new Section(
//{
//items: initialCards,
//renderer: (cardData) => {
//const cardElement = getCardElement(cardData);
//cardSection.addItem(cardElement);
//},
//},
//".gallery__cards"
//);
//cardSection.renderItems();

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

const deleteCardPopup = new PopupConfirmDelete("#modal-delete-card");
deleteCardPopup.setEventListeners();

function handleDeleteCard(card) {
  deleteCardPopup.open();
  deleteCardPopup.setConfirmDelete(() => {
    api
      .removeCard(card._id)
      .then(() => {
        deleteCardPopup.close;
        card.removeCardElement();
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      });
  });
}

const userInfo = new UserInfo(".profile__title", ".profile__description");
