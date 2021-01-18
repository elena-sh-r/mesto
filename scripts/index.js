const openButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const closeButton = document.querySelector('.popup_type_profile__close-icon');
const formProfile = document.querySelector('.popup_type_profile__container');
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_about');
const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');
const popupMaximized = document.querySelector('.popup_type_image');

function handleOpenButtonClick() {
  nameInput.value = name.textContent;
  aboutInput.value = about.textContent;
  
  popupProfile.classList.add('popup_opened');
}

function closePopup() {
  popupProfile.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameInputValue = nameInput.value;
  const aboutInputValue = aboutInput.value;
  
  if (!(nameInputValue && aboutInputValue)){
    alert('Введены некорректные данные!');
    return;
  }
  
  name.textContent = nameInputValue;
  about.textContent = aboutInputValue;

  closePopup();
}

openButton.addEventListener('click', handleOpenButtonClick);
closeButton.addEventListener('click', closePopup);
formProfile.addEventListener('submit', handleFormSubmit);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elementTemplate = document.querySelector('.element-template').content;
const elementsList = document.querySelector('.elements');
const addButton = document.querySelector('.profile__add-button');
const popupElement = document.querySelector('.popup_type_element');
const closeElementButton = document.querySelector('.popup_type_element__close-icon');
const formElement = document.querySelector('.popup_type_element__container');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_image-link');
const closeImageButton = document.querySelector('.popup_type_image__close-icon');

function handleAddButtonClick() {
  titleInput.value = linkInput.value = '';
  popupElement.classList.add('popup_opened');
}

function closeElementPopup() {
  popupElement.classList.remove('popup_opened');
}

function renderItem(item){
  const elementItem = elementTemplate.cloneNode(true);
  const elementImage = elementItem.querySelector('.element__image');
  const elementTitle = elementItem.querySelector('.element__title');
  const elementDeleteButton = elementItem.querySelector('.element__delete');
  const elementLike = elementItem.querySelector('.element__like');
  
  elementDeleteButton.addEventListener('click', handleElementDelete);
  elementLike.addEventListener('click', handleElementLike);
  elementImage.addEventListener('click', handleElementImageMaximize);
  
  elementImage.setAttribute('src', item.link);
  elementImage.setAttribute('alt', item.name);
  elementTitle.textContent = item.name;

  elementsList.prepend(elementItem);
}

function render(){
  initialCards.reverse().forEach(renderItem);
}

function handleElementFormSubmit(evt) {
  evt.preventDefault();
  

  const name = titleInput.value;
  const link = linkInput.value;
  
  if (!(name && link && link.startsWith('http'))) {
    alert('Введены некорректные данные!');
    return;
  }
  
  renderItem(
    {
      name: name,
      link: link,
    }
  );

  closeElementPopup();
}

function handleElementDelete(evt) {
  evt.target.parentElement.remove();
}

function handleElementLike(evt) {
  const activeClassName = 'element__like_active';
  
  if (evt.target.classList.contains(activeClassName)) {
    evt.target.classList.remove(activeClassName);
  }
  else {
    evt.target.classList.add(activeClassName);
  }
}

function handleElementImageMaximize(evt) {
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  
  popupImage.setAttribute('src', evt.target.getAttribute('src'));
  popupImage.setAttribute('alt', evt.target.getAttribute('alt'));
  popupCaption.textContent = evt.target.getAttribute('alt');
  
  popupMaximized.classList.add('popup_opened');
}

function closeImagePopup() {
  popupMaximized.classList.remove('popup_opened');
}

addButton.addEventListener('click', handleAddButtonClick);
closeElementButton.addEventListener('click', closeElementPopup);
formElement.addEventListener('submit', handleElementFormSubmit);
closeImageButton.addEventListener('click', closeImagePopup);

render();

