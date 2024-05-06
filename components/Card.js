export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._data = { name, link };
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    //".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    //".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    //image preview
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({
          name: this._name,
          link: this._link,
        });
      });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
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
}
