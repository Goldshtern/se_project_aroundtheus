export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__field",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const profileEditForm = document.forms["add-profile-form"];
export const addCardFormElement = document.forms["add-card-form"];
export const editAvatarForm = document.forms["add-avatar-form"];
export const profileEditButton = document.querySelector("#profile-edit-button");
export const addNewCardButton = document.querySelector("#profile-add-button");
export const profileAvatarButton = document.querySelector(
  "#avatar-edit-button"
);
export const cardListEl = document.querySelector(".gallery__cards");
export const previewPopup = document.querySelector("#modal-image");
export const imagePreviewPopup = previewPopup.querySelector(".modal__image");
export const titlePreviewPopup = previewPopup.querySelector(
  ".modal__image-title"
);
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
