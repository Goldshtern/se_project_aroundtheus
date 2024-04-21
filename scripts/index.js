import Card from "./Card.js";

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

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const card = new Card(cardData, "#card-template");
card.getView();

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseBtn = document.querySelector("#profile-modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".gallery__cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector("#profile-add-button");
const cardEditModal = document.querySelector("#card-edit-modal");
const cardModalCloseBtn = document.querySelector("#card-modal-close-button");
const addCardFormElement = document.querySelector("#add-card-form");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#image-URL-input");
const previewPopup = document.querySelector("#modal-image");
const imagePreviewPopup = previewPopup.querySelector(".modal__image");
const titlePreviewPopup = previewPopup.querySelector(".modal__image-title");
const imageModalCloseBtn = document.querySelector("#image-modal-close-button");

function openPopup(popup) {
  popup.classList.add("modal_opened");
  popup.addEventListener("mousedown", closePopupOverlay);
  document.addEventListener("keydown", closePopupByEscape);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  popup.removeEventListener("mousedown", closePopupOverlay);
  document.removeEventListener("keydown", closePopupByEscape);
}

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function closePopupByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopup(openedModal);
  }
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeBtn = cardElement.querySelector(".card__like-button");
  const deleteBtn = cardElement.querySelector(".card__delete-button");

  cardImageEl.addEventListener("click", () => {
    imagePreviewPopup.src = cardData.link;
    imagePreviewPopup.alt = cardData.name + " " + "Image";
    titlePreviewPopup.textContent = cardData.name;
    openPopup(previewPopup);
  });
  //likeBtn.addEventListener("click", handleLikeIcon);
  //deleteBtn.addEventListener("click", handleDeleteCard);
  cardImageEl.src = card;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name + " " + "Image";
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

//function handleLikeIcon(evt) {
//evt.target.classList.toggle("card__like-button_active");
//}

//function handleDeleteCard(evt) {
//evt.target.closest(".card").remove();
//}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  cardListEl.prepend(cardElement);
  closePopup(cardEditModal);
  evt.target.reset();
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});
addNewCardButton.addEventListener("click", () => {
  openPopup(cardEditModal);
});

profileCloseBtn.addEventListener("click", () => {
  closePopup(profileEditModal);
});
cardModalCloseBtn.addEventListener("click", () => {
  closePopup(cardEditModal);
});
imageModalCloseBtn.addEventListener("click", () => {
  closePopup(previewPopup);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => {
  cardListEl.prepend(getCardElement(cardData));
});
