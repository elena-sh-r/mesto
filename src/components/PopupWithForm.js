import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.form');
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => this._handleFormSubmit(evt));
  }

  close() {
    super.close();

    this._form.reset();
  }

  setInputValues(inputValues) {
    this._inputs.forEach(input => {
      input.value = inputValues[input.name];
    });
  }

  _getInputValues() {
    this._inputValues = {};

    this._inputs.forEach(input => this._inputValues[input.name] = input.value);

    return this._inputValues;
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();

    this._submitCallback(this._getInputValues());

    this.close();
  }
}