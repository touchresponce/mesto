/**
 * Управление отображением информации о пользователе на странице.
 * - Принимает в конструктор объект с селекторами двух элементов:
 *   элемента имени пользователя и элемента информации о себе.
 * - Содержит публичный метод `getUserInfo`, который возвращает
 *   объект с данными пользователя.
 * - Содержит публичный метод `setUserInfo,` который принимает новые
 *   данные пользователя и добавляет их на страницу.
 */

export default class UserInfo {
  constructor(user) {
    this._name = user.name;
    this._info = user.info;
    this._avatar = user.avatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
    };
  }

  // setUserInfo(data) {
  //   this._name.textContent = data.name;
  //   this._info.textContent = data.info;
  //   this._avatar.src = data.avatar;
  // }
  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._info.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }
}
