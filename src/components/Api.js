export class Api {
  constructor(url, token, cohortId) {
    this._apiUrl = `${url}/v1/${cohortId}`;
    this._token = token;
  }

  getOwnerInfo() {
    return fetch(`${this._apiUrl}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => {
      if (this._isValidResult(res)) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setOwnerInfo(name, about) {
    return fetch(`${this._apiUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })  
    })
    .then((res) => {
      if (this._isValidResult(res)) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getCards() {
    return fetch(`${this._apiUrl}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then((res) => {
      if (this._isValidResult(res)) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setCard(name, link) {
    return fetch(`${this._apiUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res) => {
      if (this._isValidResult(res)) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(id) {
    return fetch(`${this._apiUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then((res) => {
      if (this._isValidResult(res)) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setCardLike(id) {
    return fetch(`${this._apiUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then((res) => {
      if (this._isValidResult(res)) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCardLike(id) {
    return fetch(`${this._apiUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then((res) => {
      if (this._isValidResult(res)) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setAvatar(avatar) {
    return fetch(`${this._apiUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then((res) => {
      if (this._isValidResult(res)) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  _isValidResult(res) {
    return res.ok;
  }
}