let openButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-icon');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_type_name');
let aboutInput = document.querySelector('.popup__input_type_about');
let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');

function handleOpenButtonClick() {
  let nameText = name.textContent;
  let aboutText = about.textContent;
  
  nameInput.value = nameText;
  aboutInput.value = aboutText;
  
  popup.classList.add('popup_opened');
}

function handleCloseButtonClick() {
  closePopup();
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  
  let nameText = nameInput.value;
  let aboutText = aboutInput.value;
  
  name.textContent = nameText;
  about.textContent = aboutText;
  
  closePopup();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

openButton.addEventListener('click', handleOpenButtonClick)
closeButton.addEventListener('click', handleCloseButtonClick)
formElement.addEventListener('submit', handleFormSubmit);