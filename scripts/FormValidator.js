// класс валидации полей формы
export class FormValidator {
  constructor(formSelectors, formElement) {
    this._formSelectors = formSelectors;
    this._formElement = formElement;
  }

  // показ ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.add(this._formSelectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formSelectors.errorClass);
  };

  // скрытие ошибки
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._formSelectors.inputErrorClass);
    errorElement.classList.remove(this._formSelectors.errorClass);
    errorElement.textContent = '';
  };

  // проверка валидности
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // активация и деактивация кнопки
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._formSelectors.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._formSelectors.inactiveButtonClass);
    }
  };

  //  проверка полей ввода на валидность
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  // навешивание обработчиков
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._formSelectors.inputSelector));
    const buttonElement = this._formElement.querySelector(this._formSelectors.submitButtonSelector);
    
    if(!inputList || !buttonElement) {
      return;
    }
    
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  // включение валидации
  enableValidation() {
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      
      this._setEventListeners();
  };
}