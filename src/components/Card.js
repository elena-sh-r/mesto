// класс, который возвращает разметку карточки
export class Card {
  constructor(data, cardSelector, handleCardClick, handleCardDelete, handleCardLike) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard(showDeleteIcon, isLiked) {
    this._element = this._getTemplate();
    this._isLiked = isLiked;
    this._setEventListeners();

    this._element.id = this._id;

    const elementImage = this._element.querySelector('.element__image');

    this._element.querySelector('.element__title').textContent = this._name;
    elementImage.src = this._link;
    elementImage.alt = this._name;

    if (showDeleteIcon){
      this._element.querySelector('.element__delete').classList.add('element__delete_visible');
    }

    if (this._likes) {
      this._element.querySelector('.element__like-count').textContent = this._likes.length.toString();
    }

    if (isLiked)
    {
      this._element.querySelector('.element__like').classList.add('element__like_active');
    }

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleElementLike();
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleCardDelete({id: this._id});
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick({name: this._name, link: this._link});
    });
  }  

  _handleElementLike() {
    this._handleCardLike(this._id, this._isLiked);
  }
}
