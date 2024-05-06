export default class FormValidator {
  constructor(validationSettings, formEl) {
    this._inputSelector = validationSettings.inputSelector;
    this._submitButtonSelector = validationSettings.submitButtonSelector;
    this._inactiveButtonClass = validationSettings.inactiveButtonClass;
    this._inputErrorClass = validationSettings.inputErrorClass;
    this._errorClass = validationSettings.errorClass;

    this._form = formEl;
  }

  _showInputError(inputEl) {
    const errorElement = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorElement.textContent = inputEl.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorElement = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorElement.textContent = " ";
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }

    this._hideInputError(inputEl);
  }

  _hasInvalidInput() {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputEls)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }

    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  //_setEventListeners() {
  //this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
  //this._submitButton = this._form.querySelector(this_submitButtonSelector);

  //this._inputEls.forEach((inputEl) => {
  //inputEl.addEventListener("input", () => {
  //checkInputValidity(inputEl);
  //toggleButtonState();
  //});
  //});
  //}

  _setEventListeners() {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault(evt);
    });

    this._setEventListeners();
  }
}
