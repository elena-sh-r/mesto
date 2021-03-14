export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._getPopup().classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  close() {
    this._getPopup().classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  setEventListeners() {
    const popup = this._getPopup();
    const closeButton = popup.querySelector('.popup__close-icon');
    popup.addEventListener('click', (evt) => this._handleOverlayClose(popup, evt));
    closeButton.addEventListener('click', () => this.close());
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(popup, evt) {
    if(evt.target != popup) {
      return;
    }

    this.close();
  }

  _getPopup() {
    return document.querySelector(this._popupSelector);
  }
}