import { data } from "autoprefixer";
import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImageElement =
      this._popupElement.querySelector(".modal__image");
    this._previewImageElementTitle = this._popupElement.querySelector(
      ".modal__image-title"
    );
  }
  open(cardData) {
    this._previewImageElement.setAttribute("src", cardData.link);
    this._previewImageElement.setAttribute(
      "alt",
      cardData.name + " " + "Image"
    );
    this._previewImageElementTitle.textContent = cardData.name;
    super.open();
  }
}
