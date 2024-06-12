export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //-----CARD ROUTE: Get all cards (GET)----//
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  //----USER ROUTE: Get the current user’s info (GET)-----//
  getUser() {
    // ...
  }
  //------CARD ROUTE: Create a card (POST)-----//
  addCard() {
    // ...
  }
  //------------USER ROUTE: Update profile information (PATCH)----///
  editProfile() {
    // ...
  }
  //--------------CARD ROUTE: Delete a card (DELETE)-----//
  removeCard() {
    // ...
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
