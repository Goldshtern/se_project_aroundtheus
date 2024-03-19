const initialCards = [
  {
    name: "Ycardosemite Valley",
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
const ImageModalCloseBtn = document.querySelector("#image-modal-close-button");

function openPopup() {
  previewPopup.classList.add("modal_opened");
}

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
  cardEditModal.classList.remove("modal_opened");
  previewPopup.classList.remove("modal_opened");
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
    openPopup();
  });
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-button_active");
  });
  deleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name + " " + "Image";
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
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
  closePopup();
  evt.target.reset(cardElement);
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});
addNewCardButton.addEventListener("click", () => {
  cardEditModal.classList.add("modal_opened");
});

profileCloseBtn.addEventListener("click", closePopup);
cardModalCloseBtn.addEventListener("click", closePopup);
ImageModalCloseBtn.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => {
  cardListEl.prepend(getCardElement(cardData));
});
