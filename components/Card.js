/**
 * Cоздаёт карточку с текстом и ссылкой на изображение
 * - принимает в конструктор её данные и селектор её template-элемента;
 * - содержит приватные методы, которые работают с разметкой,
 *   устанавливают слушателей событий;
 * - содержит приватные методы для каждого обработчика;
 * - содержит один публичный метод,
 *   который возвращает полностью работоспособный
 *   и наполненный данными элемент карточки.
 */

export default class Card {
  constructor(config, cardSelector) {
    this._name = config.name;
    this._link = config.link;
    this._cardSelector = cardSelector;
  }

  _getTemplateEl() {
    this._card = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return this._card;
  }

  _delete() {
    this._card.remove();
  }

  _setLike() {
    const likeBtn = this._card.querySelector('.element__like');
    likeBtn.classList.toggle('element__like-active');
  }

  _setEventListeners() {
    this._card.querySelector('.element__delete').addEventListener('click', () => this._delete());
    this._card.querySelector('.element__like').addEventListener('click', () => this._setLike());
  }

  createCard() {
    this._getTemplateEl();
    this._image = this._card.querySelector('.element__image');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._setEventListeners();
    this._card.querySelector('.element__panel-text').textContent = this._name;

    return this._card;
  }
}
