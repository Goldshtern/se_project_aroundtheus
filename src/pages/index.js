import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import {
  initialCards,
  config,
  profileEditForm,
  addCardFormElement,
  profileEditButton,
  addNewCardButton,
  profileTitleInput,
  profileDescriptionInput,
} from "../utils/constants.js";

//----------------------------event handlers---------------------------------//
function handleImageClick(cardData) {
  popupImage.open(cardData);
}

function handleProfileEditSubmit(inputValues) {
  userInfo.setUserInfo(inputValues.name, inputValues.job);
  profileEditValidator.disableButton();
  profileEditPopup.close();
}

function handleAddCardFormSubmit(cardData) {
  cardSection.addItem(
    getCardElement({ name: cardData.name, link: cardData.link })
  );
  addCardValidator.disableButton();
  newCardPopup.close();
}

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
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

//-----------------instantiations------------------------------//
const profileEditValidator = new FormValidator(config, profileEditForm);
const addCardValidator = new FormValidator(config, addCardFormElement);

profileEditValidator.enableValidation();
addCardValidator.enableValidation();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = getCardElement(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".gallery__cards"
);
cardSection.renderItems();

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

const userInfo = new UserInfo(".profile__title", ".profile__description");
