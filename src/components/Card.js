export default class Card {
  constructor(
    data,
    cardSelector,
    { handleCardClick, handleDeleteConfirm, handleLikeClick, handleDislikeClick },
    userId,
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id; // айди карточки
    this._ownerId = data.owner._id; // айди владельца
    this._userId = userId; // айди пользователя
    this._likes = data.likes; // ключ лайки
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick; //открытие картинки
    this._handleDeleteConfirm = handleDeleteConfirm; // открытие модалки подтверждения
    this._handleLikeClick = handleLikeClick; // лайк
    this._handleDislikeClick = handleDislikeClick; //дизлайк
  }

  _getTemplateEl() {
    this._card = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return this._card;
  }

  delete() {
    this._card.remove();
  }

  _setLike() {
    this._likeButton.classList.contains('element__like-active')
      ? this._handleDislikeClick(this._id)
      : this._handleLikeClick(this._id);
  }

  likeCard(res) {
    if (this._likeButton.classList.contains('element__like-active')) {
      this._likeButton.classList.remove('element__like-active');
      this._likeNum.textContent = res.likes.length;
    } else {
      this._likeButton.classList.add('element__like-active');
      this._likeNum.textContent = res.likes.length;
    }
  }

  // проверка на наличие лайка от юзера
  _checkOwnLike() {
    if (this._likes.find((likes) => this._userId === likes._id)) {
      this._likeButton.classList.add('element__like-active');
    }
  }

  // проверка на наличие прав удаления
  _checkOwnDelete() {
    if (!(this._ownerId === this._userId)) {
      this._deleteButton.style.display = 'none';
    }
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => this._handleDeleteConfirm(this));
    this._likeButton.addEventListener('click', () => this._setLike());
    this._image.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  createCard() {
    this._getTemplateEl();
    this._image = this._card.querySelector('.element__image');
    this._image.src = this._link;
    this._image.alt = this._name;

    this._likeButton = this._card.querySelector('.element__like'); // кнопка лайка
    this._deleteButton = this._card.querySelector('.element__delete'); // кнопка удаления
    this._likeNum = this._card.querySelector('.element__like-num'); // колво лайков

    this._likeNum.textContent = this._likes.length; // деф отрисовка колва лайков
    this._card.querySelector('.element__panel-text').textContent = this._name;

    this._checkOwnLike();
    this._checkOwnDelete();

    this._setEventListeners();
    return this._card;
  }
}
