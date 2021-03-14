// отвечает за управление отображением информации о пользователе на странице

export class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
  }

  getUserInfo() {
    return {
      name: this._getNameElement().textContent, 
      about: this._getAboutElement().textContent
    };
  }

  setUserInfo({name, about}) {
    this._getNameElement().textContent = name;
    this._getAboutElement().textContent = about;
  }

  _getNameElement() {
    return document.querySelector(this._nameSelector);
  }
  
  _getAboutElement() {
    return document.querySelector(this._aboutSelector);
  }
}