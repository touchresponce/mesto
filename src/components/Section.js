/**
 * отвечает за отрисовку элементов на странице.
 * - Первым параметром конструктора принимает объект с двумя свойствами:
 *  `items` и `renderer`. Свойство `items` — это массив данных,
 *   которые нужно добавить на страницу при инициализации класса.
 *   Свойство `renderer` — это функция, которая отвечает за создание
 *   и отрисовку данных на странице.
 * - Второй параметр конструктора — селектор контейнера.
 * - Содержит публичный метод `renderItems`, который отвечает за отрисовку всех элементов.
 *   Отрисовка каждого отдельного элемента должна осуществляться функцией `renderer`.
 * - Содержит публичный метод `addItem`, который принимает DOM-элемент и добавляет
 *   его в контейнер.
 */

export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // addItem(item) {
  //   this._container.append(item);
  // }

  addItem(item, method) {
    if (method === 'append') {
      this._container.append(item);
    } else if (method === 'prepend') {
      this._container.prepend(item);
    } else return;
  }
}
