import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
  }

  setEventListeners() {
    super.setEventListeners();

    const form = this._getPopup().querySelector('.form');
    form.addEventListener('submit', (evt) => this._handleFormSubmit(evt));
  }

  close() {
    super.close();

    this._getInputs().forEach(input => input.value = '');
  }

  setInputValues(inputValues) {
    this._getInputs().forEach(input => {
      input.value = inputValues[input.name];
    });
  }

  _getInputValues() {
    this._inputValues = {};

    this._getInputs().forEach(input => this._inputValues[input.name] = input.value);

    return this._inputValues;
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();

    this._submitCallback(this._getInputValues());

    this.close();
  }

  _getPopup() {
    return document.querySelector(this._popupSelector);
  }

  _getInputs() {
    return this._getPopup().querySelectorAll('.popup__input');
  }  
}