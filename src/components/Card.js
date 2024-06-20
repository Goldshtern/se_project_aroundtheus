export default class Card {
  constructor(
    { name, link, _id },
    cardSelector,
    handleImageClick,
    handleDeleteCard
  ) {
    this._data = { name, link, _id };
    this._name = name;
    this._link = link;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
  }

  _setEventListeners() {
    //".card__like-button"
    this._likeBtn.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    //".card__delete-button"
    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteCard();
    });
    //image preview
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({
        name: this._name,
        link: this._link,
      });
    });
  }

  _handleLikeIcon() {
    this._likeBtn.classList.toggle("card__like-button_active");
  }

  //getId() {
  //return this._id;
  //}

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._deleteBtn = this._cardElement.querySelector(".card__delete-button");
    //get the card view
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._data.name + " " + "Image";
    this._cardTitleEl.textContent = this._data.name;
    //set event listeners
    this._setEventListeners();
    //return the card
    return this._cardElement;
  }
  removeCardElement() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
