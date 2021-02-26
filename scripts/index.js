// импорты
import { openPopup, closePopupOnOverlay, closePopup, closeByEscape } from './utils.js'
import { initialCards, formSelectors } from './constants.js'
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

// переменные для работы с попапом профиля
const profilePopupOpenButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const profilePopupCloseButton = document.querySelector('.popup__close-icon_type_profile');
const formProfile = document.querySelector('.popup__container_type_profile');
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_about');
const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');

// переменные для работы с попапом добавления карточки
const addButton = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.popup_type_element');
const closeElementButton = document.querySelector('.popup__close-icon_type_element');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_image-link');
const cardAddForm = document.querySelector('.popup__container_type_element');
const cardList = document.querySelector('.elements');

// переменные для работы с попапом развернутой картинки
const popupMaximized = document.querySelector('.popup_type_image');
const closeImageButton = document.querySelector('.popup__close-icon_type_image');

// функции-обработчики событий
// функция открытия попапа редактирования профиля
const  handleProfilePopupOpen = () => {
  nameInput.value = name.textContent;
  aboutInput.value = about.textContent;
  
  openPopup(popupProfile);
}

// отправка данных формы редактирования профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  
  const nameInputValue = nameInput.value;
  const aboutInputValue = aboutInput.value;
  
  name.textContent = nameInputValue;
  about.textContent = aboutInputValue;

  closePopup(popupProfile);
}

// открытие попапа добавления карточки
const handleAddButtonClick = () => {
  titleInput.value = ''; 
  linkInput.value = ''; 
  
  openPopup(cardAddPopup);
}

// функция создания и добавления карточки в грид
const addCardToList = (name, link) => {
  const card = new Card(name, link, popupMaximized);
  const cardElement = card.generateCard();

  cardList.prepend(cardElement);
}

// добавление в грид карточек из массива
initialCards.forEach((item) => {
  addCardToList(item.name, item.link);
});

// функция добавления карточки из формы
const handleElementFormSubmit = (evt) => {
  evt.preventDefault();

  addCardToList(titleInput.value, linkInput.value);

  closePopup(cardAddPopup);
}

// функция создания экземпляров валидатора для каждой формы
const profileFormValidator = new FormValidator(formSelectors, formProfile);
profileFormValidator.enableValidation();

const cardAddFormValidator = new FormValidator(formSelectors, cardAddForm);
cardAddFormValidator.enableValidation();

// добавление обработчиков событий
// для попапа редактирования профиля
profilePopupOpenButton.addEventListener('click', handleProfilePopupOpen);
profilePopupCloseButton.addEventListener('click', () => closePopup(popupProfile));
popupProfile.addEventListener('click', (evt) => closePopupOnOverlay(popupProfile, evt));
formProfile.addEventListener('submit', handleProfileFormSubmit);

//для попапа добавления картинки
addButton.addEventListener('click', handleAddButtonClick);
closeElementButton.addEventListener('click', () => closePopup(cardAddPopup));
cardAddPopup.addEventListener('click', (evt) => closePopupOnOverlay(cardAddPopup, evt));
cardAddForm.addEventListener('submit', handleElementFormSubmit);

// для попапа открытия картинки
closeImageButton.addEventListener('click', () => closePopup(popupMaximized));
popupMaximized.addEventListener('click', (evt) => closePopupOnOverlay(popupMaximized, evt));