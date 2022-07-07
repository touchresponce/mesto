import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, { callBack }) {
    super(popup);
    this._form = this._popup.querySelector('.form');
    this._inputsList = this._popup.querySelectorAll('.popup__input');
    this._callBack = callBack;
    this._submitButton = this._popup.querySelector('.popup__submit');
    this._buttonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._inputsValues = {};

    this._inputsList.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    });

    return this._inputsValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callBack(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._buttonText;
    }
  }
}
