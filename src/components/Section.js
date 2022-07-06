export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item, method) {
    if (method === 'append') {
      this._container.append(item);
    } else if (method === 'prepend') {
      this._container.prepend(item);
    } else return;
  }
}
