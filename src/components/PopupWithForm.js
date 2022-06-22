/**
 * - Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
 * - Содержит приватный метод `_getInputValues`, который собирает данные всех полей формы.
 * - Перезаписывает родительский метод `setEventListeners`. Так как он должен не только
 *   добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
 * - Перезаписывает родительский метод `close`, так как при закрытии попапа форма
 *   должна ещё и сбрасываться.
 */

import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, { callBack }) {
    super(popup);
    this._form = this._popup.querySelector('.form');
    this._inputsList = this._popup.querySelectorAll('.popup__input');
    this._submitButton = this._popup.querySelector('.popup__submit');
    this._callBack = callBack;
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
      this._callBack();
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
