import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//---------------------forms----------------------------------------------//
const profileEditForm = document.forms["add-profile-form"];
const addCardFormElement = document.forms["add-card-form"];
//----------------------page buttons--------------------------------------//
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector("#profile-add-button");
//-----------------------cards----------------------------------------------//
const cardListEl = document.querySelector(".gallery__cards");
//--------------------------prevew image element----------------------------//
const previewPopup = document.querySelector("#modal-image");
const imagePreviewPopup = previewPopup.querySelector(".modal__image");
const titlePreviewPopup = previewPopup.querySelector(".modal__image-title");
//--------------------------profile inputs-----------------------------------//
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileCloseBtn = document.querySelector("#profile-modal-close-button");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardEditModal = document.querySelector("#card-edit-modal");
const cardModalCloseBtn = document.querySelector("#card-modal-close-button");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#image-URL-input");
const imageModalCloseBtn = document.querySelector("#image-modal-close-button");

//----------------------------event handlers---------------------------------//
//function handleImageClick(cardData) {
//imagePreviewPopup.src = cardData.link;
//imagePreviewPopup.alt = cardData.name + " " + "Image";
//titlePreviewPopup.textContent = cardData.name;
//openPopup(previewPopup);
//}

function handleImageClick(data) {
  popupImage.open(data);
}

function handleProfileEditSubmit(inputValues) {
  //evt.preventDefault();
  userInfo.setUserInfo(inputValues.name, inputValues.job);
  //profileTitle.textContent = profileTitleInput.value;
  //profileDescription.textContent = profileDescriptionInput.value;
  //closePopup(profileEditModal);
  profileEditPopup.close();
}

//function handleAddCardFormSubmit(evt) {
//evt.preventDefault();
//const name = cardTitleInput.value;
//const link = cardUrlInput.value;
//renderCard({ name, link });
//evt.target.reset();
//closePopup(cardEditModal);
//addCardValidator.disableButton();
//}

function handleAddCardFormSubmit(data) {
  const { name, link } = data;
  const cardData = { name: name, link: link };
  const cardElement = getCardElement(cardData);
  cardSection.addItem(cardElement);
  newCardPopup.close();
  newCardPopup.reset();
  addCardValidator.disableButton();
}

//-----------------------------------event listeners--------------------------//
//profileEditButton.addEventListener("click", () => {
//profileTitleInput.value = profileTitle.textContent;
//profileDescriptionInput.value = profileDescription.textContent;
//openPopup(profileEditModal);
//profileEditPopup.open();
//});

profileEditButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  profileTitleInput.value = data.name;
  profileDescriptionInput.value = data.job;
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  //openPopup(cardEditModal);
  newCardPopup.open();
});

//profileCloseBtn.addEventListener("click", () => {
//closePopup(profileEditModal);
//profileEditPopup.close();
//});
//cardModalCloseBtn.addEventListener("click", () => {
//closePopup(cardEditModal);
//newCardPopup.close();
//});
//imageModalCloseBtn.addEventListener("click", () => {
//closePopup(previewPopup);
//popupImage.close();
//});

//profileEditForm.addEventListener("submit", handleProfileEditSubmit);
//addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

//initialCards.forEach((cardData) => {
//cardListEl.prepend(getCardElement(cardData));
//});
//---------------------------------functions---------------------------------//

//function openPopup(popup) {
//popup.classList.add("modal_opened");
//popup.addEventListener("mousedown", closePopupOverlay);
//document.addEventListener("keydown", closePopupByEscape);
//}

//function closePopup(popup) {
//popup.classList.remove("modal_opened");
//popup.removeEventListener("mousedown", closePopupOverlay);
//document.removeEventListener("keydown", closePopupByEscape);
//}

//function closePopupOverlay(evt) {
//if (evt.target === evt.currentTarget) {
//closePopup(evt.currentTarget);
//}
//}

//function closePopupByEscape(evt) {
//if (evt.key === "Escape") {
//const openedModal = document.querySelector(".modal_opened");
//closePopup(openedModal);
//}
//}

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

function renderCard(cardData) {
  const card = getCardElement(cardData);
  cardListEl.prepend(card);
}

//-----------------instantiations------------------------------//
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__field",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

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
