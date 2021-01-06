let openButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-icon');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_type_name');
let aboutInput = document.querySelector('.popup__input_type_about');
let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');

function handleOpenButtonClick() {
  nameInput.value = name.textContent;
  aboutInput.value = about.textContent;
  
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  
  name.textContent = nameInput.value;
  about.textContent = aboutInput.value;
  
  closePopup();
}

openButton.addEventListener('click', handleOpenButtonClick);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);