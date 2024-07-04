export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLikeIcon
  ) {
    this._data = { name, link, _id, isLiked };
    this._name = name;
    this._link = link;
    this.id = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this.isLiked = isLiked;
    this._handleLikeIcon = handleLikeIcon;
  }

  getLikedStatus() {
    return this.isLiked;
  }

  setIsLiked(isLiked) {
    this.isLiked = isLiked;
    this._renderLikes();
  }

  _renderLikes() {
    if (this.isLiked) {
      this._likeBtn.classList.add("card__like-button_active");
    } else {
      this._likeBtn.classList.remove("card__like-button_active");
    }
  }

  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      this._handleLikeIcon(this);
    });

    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteCard(this);
    });
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({
        name: this._name,
        link: this._link,
      });
    });
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._deleteBtn = this._cardElement.querySelector(".card__delete-button");
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._data.name + " " + "Image";
    this._cardTitleEl.textContent = this._data.name;
    this._setEventListeners();
    this._renderLikes();
    return this._cardElement;
  }

  removeCardElement() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
