// импорты
import './index.css';
import { processingLabel, formSelectors } from '../scripts/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupForDelete } from '../components/PopupForDelete.js';
import { Api } from '../components/Api.js';

// переменные для работы с попапом профиля
const profilePopupOpenButton = document.querySelector('.profile__edit-button');
const formProfile = document.querySelector('.popup__container_type_profile');

// переменные для работы с попапом добавления карточки
const addButton = document.querySelector('.profile__add-button');
const cardAddForm = document.querySelector('.popup__container_type_element');
const avatarContainer = document.querySelector('.profile__avatar-container');
const avatarForm = document.querySelector('.popup__container_type_avatar');

// создание объекта для работы с api
const api = new Api ('https://mesto.nomoreparties.co', 'dc0ca2fb-4ae3-45bf-a776-2cc27f547133', 'cohort-21');

const handleElementImageMaximize = ({name, link}) => {
  imagePopup.open(name, link);
}

const handleElementDelete = ({id}) => {
  deletePopup.open(id);
}

// функция создания и добавления карточки в грид
const renderCard = (item) => {
  const card = new Card(item, '.element-template', handleElementImageMaximize, handleElementDelete, handleElementLike);
  const userId = userInfo.getUserInfo().id;
  const cardElement = card.generateCard(userId == item.owner._id, item.likes.some(like => like._id == userId));

  return cardElement;
}

// объект класса, отрисовка элементов на странице
const section = new Section({
    renderer: renderCard
  }, 
  '.elements'
);

// функция открытия попапа редактирования профиля
const  handleProfilePopupOpen = () => {
  profileFormValidator.resetValidation();
  profilePopup.setInputValues(userInfo.getUserInfo());
  profilePopup.open();
}

// отправка данных формы редактирования профиля
const handleProfileFormSubmit = ({name, about}) => {
  profilePopup.setButtonText(processingLabel);
  api.setOwnerInfo(name, about)
    .then((owner) => {
      userInfo.setUserInfo(owner);
      profilePopup.close();
    })
    .catch((err) => {
      profilePopup.resetButtonText();
      console.log(err);
    });
}

// функция открытия попапа обновления аватара
const  handleAvatarPopupOpen = () => {
  avatarFormValidator.resetValidation();
  avatarPopup.setInputValues(userInfo.getAvatar());
  avatarPopup.open();
}

// функция добавления карточки из формы
const handleElementFormSubmit = ({name, link}) => {
  cardAddPopup.setButtonText(processingLabel);
  api.setCard(name, link)
    .then((card) => {
      section.addItem(renderCard(card));
      cardAddPopup.close();
    })
    .catch((err) => {
      cardAddPopup.resetButtonText();
      console.log(err);
    });
}

// функция удаления карточки после подтверждения
const handleDeleteConfirmButtonClick = (id) => {
  deletePopup.setButtonText(processingLabel);
  api.deleteCard(id)
    .then(() => {
      section.removeItem(id);
      deletePopup.close();
    })
    .catch((err) => {
      deletePopup.resetButtonText();
      console.log(err);
    });
}

// функция обновления лайка
const handleElementLike = (id, isLiked) => {
  if (isLiked){
    api.deleteCardLike(id)
      .then((card) => {
        section.changeItem(id, renderCard(card));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    api.setCardLike(id)
      .then((card) => {
        section.changeItem(id, renderCard(card));
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// функция обновления аватара
const handleAvatarFormSubmit = ({avatar}) => {
  avatarPopup.setButtonText(processingLabel);
  api.setAvatar(avatar)
    .then(() => {
      userInfo.setAvatar(avatar);
      avatarPopup.close();
    })
    .catch((err) => {
      avatarPopup.resetButtonText();
      console.log(err);
    });
}

const cardAddPopup = new PopupWithForm('.popup_type_element', handleElementFormSubmit);
cardAddPopup.setEventListeners();

const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
profilePopup.setEventListeners();

const avatarPopup = new PopupWithForm('.popup_type_avatar', handleAvatarFormSubmit);
avatarPopup.setEventListeners();

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const deletePopup = new PopupForDelete('.popup_type_delete', handleDeleteConfirmButtonClick);
deletePopup.setEventListeners();

// открытие попапа добавления карточки
const handleAddButtonClick = () => {
  cardAddFormValidator.resetValidation();
  cardAddPopup.open();
}

// функция создания экземпляров валидатора для каждой формы
const profileFormValidator = new FormValidator(formSelectors, formProfile);
profileFormValidator.enableValidation();

const cardAddFormValidator = new FormValidator(formSelectors, cardAddForm);
cardAddFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(formSelectors, avatarForm);
avatarFormValidator.enableValidation();

const userInfo = new UserInfo('.profile__name', '.profile__about', '.profile__avatar');

// добавление обработчиков событий
// для попапа редактирования профиля
profilePopupOpenButton.addEventListener('click', handleProfilePopupOpen);

//для попапа добавления картинки
addButton.addEventListener('click', handleAddButtonClick);

//для попапа обновления аватара
avatarContainer.addEventListener('click', handleAvatarPopupOpen);

// получение информации о профиле, аватара и списка карточек 
window.onload = () => {
  api.getOwnerInfo()
    .then((owner) => {
      userInfo.setUserInfo(owner);
      userInfo.setAvatar(owner.avatar);
    })
    .catch((err) => {
      console.log(err);
    });

  api.getCards()
    .then((cards) => {
      cards.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); 
      section.renderItems(cards);
    })
    .catch((err) => {
      console.log(err);
    });
};