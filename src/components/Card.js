// класс, который возвращает разметку карточки
export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const elementImage = this._element.querySelector('.element__image');

    this._element.querySelector('.element__title').textContent = this._name;
    elementImage.src = this._link;
    elementImage.alt = this._name;
  
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
