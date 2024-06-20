export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfoAndCards() {
    return Promise.all([this.getInitialCards(), this.getUser()]);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  //-----CARD ROUTE: Get all cards (GET)----//
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then(this._checkResponse)
      .catch((err) => {
        console.error(err);
      });
  }

  //----USER ROUTE: Get the current user’s info (GET)-----//
  getUser() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
      .then(this._checkResponse)
      .catch((err) => {
        console.error(err);
      });
  }

  //------CARD ROUTE: Create a card (POST)-----//
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.error(err);
      });
  }

  //------------USER ROUTE: Update profile information (PATCH)----///
  editProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: "Aleksandr",
        about: "Developer",
      }),
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.error(err);
      });
  }
  //--------------CARD ROUTE: Delete a card (DELETE)-----//
  removeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.error(err);
      });
  }
  //-----------CARD ROUTE: Like a card (PUT)----//
  addLike() {
    // ...
  }
  //-----------CARD ROUTE: Dislike a card (DELETE)----//
  removeLike() {
    // ...
  }
  //-------------USER ROUTE: Update avatar (PATCH)----//
  updateAvatar() {}
}