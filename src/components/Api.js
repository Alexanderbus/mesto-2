const handleResponse = res => {
    if (res.ok) {
        return res.json();
    }
    throw new Error('Произошла ошибка:(')
}

export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(handleResponse)
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(handleResponse)
    }

    updateUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(handleResponse)
    }

    addCard(card) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            body: JSON.stringify(card),
            headers: this._headers
        })
            .then(handleResponse)
    }

    getUserID() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(handleResponse)
            .then(userInfo => {
                return userInfo._id})
    }

    delete(data) {
        return fetch(`${this._url}/cards/${data}`, {
          method: 'DELETE',
          headers: this._headers
        })
            .then(handleResponse)
    }

    addLike(data) {
        return fetch(`${this._url}/cards/${data}/likes`, {
            method: 'PUT',
            headers: this._headers
          })
              .then(handleResponse)
      }

      deleteLike(data) {
        return fetch(`${this._url}/cards/${data}/likes`, {
            method: 'DELETE',
            headers: this._headers
          })
              .then(handleResponse)
      }

      updateAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(handleResponse)
    }
    }