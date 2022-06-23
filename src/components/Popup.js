/**
 * Отвечает за открытие и закрытие попапа.
 * - Принимает в конструктор селектор попапа.
 * - Содержит публичные методы `open` и `close`,
 *   которые отвечают за открытие и закрытие попапа.
 * - Содержит приватный метод `_handleEscClose`,
 *   который содержит логику закрытия попапа клавишей Esc.
 * - Содержит публичный метод `setEventListeners`,
 *   который добавляет слушатель клика иконке закрытия попапа.
 * - Содержит приватный метод `_handleOverlayClose`,
 *   который содержит логику закрытия попапа на оверлей
 */

export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._closeButton = this._popup.querySelector('.popup__close');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => this.close());
    this._popup.addEventListener('mousedown', this._handleOverlayClose);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
