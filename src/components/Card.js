// класс, который возвращает разметку карточки
export class Card {
  constructor(data, cardSelector, handleCardClick, handleCardDelete, handleCardLike) {
    this.id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }

  generateCard(showDeleteIcon, isLiked) {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.id = this.id;

    const elementImage = this._element.querySelector('.element__image');

    this._element.querySelector('.element__title').textContent = this._name;
    elementImage.src = this._link;
    elementImage.alt = this._name;

    if (showDeleteIcon){
      this._element.querySelector('.element__delete').classList.add('element__delete_visible');
    }

    this._setLikes(isLiked);

    return this._element;
  }

  changeLikes(likes, isLiked){
    this._likes = likes;
    this._setLikes(isLiked);
  }

  likesContainId(userId){
    return this._likes.some(like => like._id == userId);
  }

  remove(){
    this._element.remove();
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  _getLikesCount() {
    return this._likes ? this._likes.length : 0;
  }

  _setLikes(isLiked){
    this._element.querySelector('.element__like-count').textContent = this._getLikesCount();

    if (isLiked)
    {
      this._element.querySelector('.element__like').classList.add('element__like_active');
    }
    else {
      this._element.querySelector('.element__like').classList.remove('element__like_active');
    }
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleElementLike();
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleCardDelete(this);
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick({name: this._name, link: this._link});
    });
  }  

  _handleElementLike() {
    this._handleCardLike(this);
  }
}
