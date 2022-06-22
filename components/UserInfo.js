/**
 * Управление отображением информации о пользователе на странице.
 * - Принимает в конструктор объект с селекторами двух элементов:
 *   элемента имени пользователя и элемента информации о себе.
 * - Содержит публичный метод `getUserInfo`, который возвращает
 *   объект с данными пользователя. Этот метод пригодится когда
 *   данные пользователя нужно будет подставить в форму при открытии.
 * - Содержит публичный метод `setUserInfo,` который принимает новые
 *   данные пользователя и добавляет их на страницу.
 */

export default class UserInfo {
  constructor(user) {
    this._name = user.name;
    this._info = user.info;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.info;
  }
}
