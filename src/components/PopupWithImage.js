import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  open(name, link) {
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption');

    popupImage.setAttribute('src', link);
    popupImage.setAttribute('alt', name);
    popupCaption.textContent = name;

    super.open();
  }
}