const profilePopupOpenButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const profilePopupCloseButton = document.querySelector('.popup__close-icon_type_profile');
const formProfile = document.querySelector('.popup__container_type_profile');
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_about');
const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');
const popupMaximized = document.querySelector('.popup_type_image');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleProfilePopupOpen() {
  nameInput.value = name.textContent;
  aboutInput.value = about.textContent;
  
  openPopup(popupProfile);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInputValue = nameInput.value;
  const aboutInputValue = aboutInput.value;
  
  if (!(nameInputValue && aboutInputValue)){
    alert('Введены некорректные данные!');
    return;
  }
  
  name.textContent = nameInputValue;
  about.textContent = aboutInputValue;

  closePopup(popupProfile);
}

profilePopupOpenButton.addEventListener('click', handleProfilePopupOpen);
profilePopupCloseButton.addEventListener('click', () => closePopup(popupProfile));
formProfile.addEventListener('submit', handleProfileFormSubmit);

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
const cardAddPopup = document.querySelector('.popup_type_element');
const closeElementButton = document.querySelector('.popup__close-icon_type_element');
const cardAddForm = document.querySelector('.popup__container_type_element');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_image-link');
const closeImageButton = document.querySelector('.popup__close-icon_type_image');

function handleAddButtonClick() {
  titleInput.value = ''; 
  linkInput.value = ''; 
  
  openPopup(cardAddPopup);
}

function createCard(item) {
  const elementItem = elementTemplate.cloneNode(true);
  const elementImage = elementItem.querySelector('.element__image');
  const elementTitle = elementItem.querySelector('.element__title');
  const elementDeleteButton = elementItem.querySelector('.element__delete');
  const elementLike = elementItem.querySelector('.element__like');
  
  elementDeleteButton.addEventListener('click', handleElementDelete);
  elementLike.addEventListener('click', handleElementLike);
  elementImage.addEventListener('click', handleElementImageMaximize);
  
  elementImage.src = item.link;
  elementImage.alt = item.name;
  elementTitle.textContent = item.name;
  
  return elementItem;
}

function renderItem(item){
  elementsList.prepend(createCard(item));
}

function render(){
  initialCards.reverse().forEach(renderItem);
}

function handleElementFormSubmit(evt) {
  evt.preventDefault();
  

  const name = titleInput.value;
  const link = linkInput.value;
  
  if (!(name && link)) {
    alert('Введены некорректные данные!');
    return;
  }
  
  renderItem(
    {
      name: name,
      link: link,
    }
  );

  closePopup(cardAddPopup);
}

function handleElementDelete(evt) {
  evt.target.closest('.element').remove();
}

function handleElementLike(evt) {
  const activeClassName = 'element__like_active';
  
  evt.target.classList.toggle(activeClassName);
}

function handleElementImageMaximize(evt) {
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  
  popupImage.setAttribute('src', evt.target.getAttribute('src'));
  popupImage.setAttribute('alt', evt.target.getAttribute('alt'));
  popupCaption.textContent = evt.target.getAttribute('alt');
  
  openPopup(popupMaximized);
}

addButton.addEventListener('click', handleAddButtonClick);
closeElementButton.addEventListener('click', () => closePopup(cardAddPopup));
cardAddForm.addEventListener('submit', handleElementFormSubmit);
closeImageButton.addEventListener('click', () => closePopup(popupMaximized));

render();

