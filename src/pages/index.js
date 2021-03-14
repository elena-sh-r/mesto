// импорты
import './index.css';
import { initialCards, formSelectors } from '../scripts/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

// переменные для работы с попапом профиля
const profilePopupOpenButton = document.querySelector('.profile__edit-button');
const formProfile = document.querySelector('.popup__container_type_profile');
// переменные для работы с попапом добавления карточки
const addButton = document.querySelector('.profile__add-button');
const cardAddForm = document.querySelector('.popup__container_type_element');


const handleElementImageMaximize = ({name, link}) => {
  imagePopup.open(name, link);
}

// функция создания и добавления карточки в грид
const renderCard = (item) => {
  const card = new Card(item.name, item.link, handleElementImageMaximize);
  const cardElement = card.generateCard();

  return cardElement;
}

// объект класса, отрисовка элементов на странице
const section = new Section({
  items: initialCards, 
  renderer: renderCard
}, 
'.elements'
);
section.renderItems();

// функция открытия попапа редактирования профиля
const  handleProfilePopupOpen = () => {
  profilePopup.setInputValues(userInfo.getUserInfo());
  profilePopup.open();
}

// отправка данных формы редактирования профиля
const handleProfileFormSubmit = ({name, about}) => {
  userInfo.setUserInfo({name, about});
}

// функция добавления карточки из формы
const handleElementFormSubmit = ({name, link}) => {
  section.addItem(renderCard({name, link}));
}

const cardAddPopup = new PopupWithForm('.popup_type_element', handleElementFormSubmit);
cardAddPopup.setEventListeners();

const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
profilePopup.setEventListeners();

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

// открытие попапа добавления карточки
const handleAddButtonClick = () => {
  cardAddPopup.open();
}

// функция создания экземпляров валидатора для каждой формы
const profileFormValidator = new FormValidator(formSelectors, formProfile);
profileFormValidator.enableValidation();

const cardAddFormValidator = new FormValidator(formSelectors, cardAddForm);
cardAddFormValidator.enableValidation();

const userInfo = new UserInfo('.profile__name', '.profile__about');

// добавление обработчиков событий
// для попапа редактирования профиля
profilePopupOpenButton.addEventListener('click', handleProfilePopupOpen);

//для попапа добавления картинки
addButton.addEventListener('click', handleAddButtonClick);
