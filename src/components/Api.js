export default class Api {
  constructor(config) {
    this._config = config;
  }

  // getLikes(cardId) {
  //   return fetch(`${this._config.url}/cards/likes/${cardId}`, {
  //     headers: this._config.headers,
  //   }).then(this._getResponce);
  // }

  // возвращающий юзера из апи
  getUserInfo() {
    return fetch(`${this._config.url}/users/me`, {
      headers: this._config.headers,
    }).then(this._getResponce);
  }

  // изменение юзера
  setUserInfo(data) {
    return fetch(`${this._config.url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._config.headers.authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.info,
      }),
    }).then(this._getResponce);
  }

  // получение карточки
  getCards() {
    return fetch(`${this._config.url}/cards`, {
      headers: this._config.headers,
    }).then(this._getResponce);
  }

  // отправка карточки
  setCard(data) {
    return fetch(`${this._config.url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._config.headers.authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getResponce);
  }

  // удаление карточки
  deleteCard(_id) {
    return fetch(`${this._config.url}/cards/${_id}`, {
      method: 'DELETE',
      headers: this._config.headers,
    }).then(this._getResponce);
  }

  // добавить лайк
  like(cardId) {
    return fetch(`${this._config.url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._config.headers.authorization,
        'Content-Type': 'application/json',
      },
    }).then(this._getResponce);
  }

  // удалить лайк
  dislike(cardId) {
    return fetch(`${this._config.url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._config.headers,
    }).then(this._getResponce);
  }

  // изменение аватарки
  setAvatar(link) {
    return fetch(`${this._config.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._config.headers.authorization,
        'Content-Type': 'application/json',
      },
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
