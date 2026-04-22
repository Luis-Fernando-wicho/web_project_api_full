class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  // Obtener información del usuario
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  // Obtener tarjetas iniciales
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  // Actualizar información del perfil
  setUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  // Actualizar avatar del usuario
  setUserAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  // Agregar nueva tarjeta
  addCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  // Eliminar tarjeta
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  // Cambiar estado de like en una tarjeta
  changeLikeCardStatus(cardId, isLiked) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    });
  }
}

// Crear instancia de la API
const api = new Api({
  baseUrl: "https://api.tu-dominio.com/v1", // Reemplaza con tu URL de API
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export default api;
