export const initialCards = [
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

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__field",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//---------------------forms----------------------------------------------//
export const profileEditForm = document.forms["add-profile-form"];
export const addCardFormElement = document.forms["add-card-form"];
//----------------------page buttons--------------------------------------//
export const profileEditButton = document.querySelector("#profile-edit-button");
export const addNewCardButton = document.querySelector("#profile-add-button");
//-----------------------cards----------------------------------------------//
export const cardListEl = document.querySelector(".gallery__cards");
//--------------------------prevew image element----------------------------//
export const previewPopup = document.querySelector("#modal-image");
export const imagePreviewPopup = previewPopup.querySelector(".modal__image");
export const titlePreviewPopup = previewPopup.querySelector(
  ".modal__image-title"
);
//--------------------------profile inputs-----------------------------------//
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const profileCloseBtn = document.querySelector(
  "#profile-modal-close-button"
);
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
export const cardEditModal = document.querySelector("#card-edit-modal");
export const cardModalCloseBtn = document.querySelector(
  "#card-modal-close-button"
);
export const cardTitleInput = document.querySelector("#card-title-input");
export const cardUrlInput = document.querySelector("#image-URL-input");
export const imageModalCloseBtn = document.querySelector(
  "#image-modal-close-button"
);
