// отвечает за управление отображением информации о пользователе на странице

export class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent, 
      about: this._aboutElement.textContent,
      id: this._id,
    };
  }

  setUserInfo(owner) {
    if (owner){
      this._nameElement.textContent = owner.name;
      this._aboutElement.textContent = owner.about;
      this._id = owner._id;
    }
  }

  getAvatar() {
    return {
      avatar: this._avatarElement.src,
    };
  }

  setAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}