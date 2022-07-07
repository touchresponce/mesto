import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popup, { callBack }) {
    super(popup);
    this._form = this._popup.querySelector('.form');
    this._callBack = callBack;
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callBack(this._card);
    });
  }
}
