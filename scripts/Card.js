// импорты
import { openPopup, closePopupOnOverlay, closePopup, closeByEscape } from './utils.js'

// класс карточки
export class Card {
  constructor(name, link, popupMaximized) {
    this._name = name;
    this._link = link;
    this._popupMaximized = popupMaximized;
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
      this._handleElementImageMaximize();
    });
  }  

  _handleElementLike() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleElementDelete() {
    this._element.remove();
  }

  _handleElementImageMaximize() {

    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption');

    popupImage.setAttribute('src', this._link);
    popupImage.setAttribute('alt', this._name);
    popupCaption.textContent = this._name;
    openPopup(this._popupMaximized);
  }
}
