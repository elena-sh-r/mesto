// класс, который отвечает за отрисовку элементов на странице
export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach (item => {
      this.addItem(this._renderer(item));
    })
  }

  addItem(element) {
    this._container.prepend(element);
  }

  removeItem(id){
    document.getElementById(id).remove();
  }

  changeItem(id, element){
    this._container.replaceChild(element, document.getElementById(id));
  }
}