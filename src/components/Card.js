// класс карточки
export class Card {
  constructor(name, link, handleCardClick) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector('.element-template')
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
  
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleElementLike();
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleElementDelete();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick({name: this._name, link: this._link});
    });
  }  

  _handleElementLike() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleElementDelete() {
    this._element.remove();
  }
}
