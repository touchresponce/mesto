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
  constructor(config, cardSelector, handleCardClick) {
    this._name = config.name;
    this._link = config.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._likeButton.classList.toggle('element__like-active');
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => this._delete());
    this._likeButton.addEventListener('click', () => this._setLike());
    this._image.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  createCard() {
    this._getTemplateEl();
    this._image = this._card.querySelector('.element__image');
    this._image.src = this._link;
    this._image.alt = this._name;

    this._likeButton = this._card.querySelector('.element__like');
    this._deleteButton = this._card.querySelector('.element__delete');

    this._card.querySelector('.element__panel-text').textContent = this._name;
    this._setEventListeners();

    return this._card;
  }
}
