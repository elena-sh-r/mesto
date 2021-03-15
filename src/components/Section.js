// класс, который отвечает за отрисовку элементов на странице
export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._items = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach (item => {
      this.addItem(this._renderer(item));
    })
  }

  addItem(element) {
    this._container.prepend(element);
  }
}