// класс, который отвечает за отрисовку элементов на странице
export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems() {
    this._items.forEach (item => {
      this.addItem(this._renderer(item));
    })
  }

  addItem(element) {
    const container = document.querySelector(this._containerSelector);

    container.prepend(element);
  }
}