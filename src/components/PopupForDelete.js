import { Popup } from './Popup.js';

export class PopupForDelete extends Popup {
  constructor(popupSelector, handleButtonClick) {
    super(popupSelector);
    this._handleButtonClick = handleButtonClick;
    this._confirmButton = this._popup.querySelector('.popup__save-button_type_delete');
    this._handleConfirmButtonClick =  this._handleConfirmButtonClick.bind(this);
    
  }

  open(card) {
    this._card = card;
    this._confirmButton.addEventListener('click', this._handleConfirmButtonClick);

    super.open();
  }

  close() {
    this._confirmButton.removeEventListener('click', this._handleConfirmButtonClick);
    super.close()
  }

  setButtonText(text){
    this._confirmButton.textContent = text;
  }

  _handleConfirmButtonClick() {
    this._handleButtonClick(this._card);
  }
}