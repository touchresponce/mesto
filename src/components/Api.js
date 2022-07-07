export default class Api {
  constructor(config) {
    this._config = config;
  }

  // возвращающий юзера из апи
  getUserInfo() {
    return fetch(`${this._config.baseUrl}/users/me`, {
      headers: this._config.headers,
    }).then(this._getResponce);
  }

  // изменение юзера
  setUserInfo(data) {
    return fetch(`${this._config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._config.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.info,
      }),
    }).then(this._getResponce);
  }

  // получение карточки
  getCards() {
    return fetch(`${this._config.baseUrl}/cards`, {
      headers: this._config.headers,
    }).then(this._getResponce);
  }

  // отправка карточки
  setCard(data) {
    return fetch(`${this._config.baseUrl}/cards`, {
      method: 'POST',
      headers: this._config.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getResponce);
  }

  // удаление карточки
  deleteCard(_id) {
    return fetch(`${this._config.baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: this._config.headers,
    }).then(this._getResponce);
  }

  // добавить лайк
  like(cardId) {
    return fetch(`${this._config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._config.headers,
    }).then(this._getResponce);
  }

  // удалить лайк
  dislike(cardId) {
    return fetch(`${this._config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._config.headers,
    }).then(this._getResponce);
  }

  // изменение аватарки
  setAvatar(link) {
    return fetch(`${this._config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._config.headers,
      body: JSON.stringify({ avatar: link }),
    }).then(this._getResponce);
  }

  // проверка ответа
  _getResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
