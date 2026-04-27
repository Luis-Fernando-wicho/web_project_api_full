class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // Método para peticiones con autenticación
  _request(url, options = {}) {
    const token = localStorage.getItem("token");
    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers, // Permite sobrescribir si fuera necesario
      },
    };

    return fetch(`${this._baseUrl}${url}`, config).then(this._checkResponse);
  }

  // MÉTODO NUEVO: Obtiene los headers dinámicamente cada vez
  _getHeaders() {
    return {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
  }

  // Obtener información del usuario
  getUserInfo() {
    return this._request(`/users/me`); // Ya no pases headers aquí
  }

  // Obtener tarjetas iniciales
  getCardList() {
    return this._request(`/cards`, {});
  }

  // Actualizar información del perfil
  setUserInfo(newName, newAbout) {
    return this._request(`/users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      }),
    });
  }

  // Actualizar avatar del usuario
  setUserAvatar(url) {
    return this._request(`/users/me/avatar`, {
      method: "PATCH",

      body: JSON.stringify({
        avatar: url, // LA CLAVE DEBE SER "avatar"
      }),
    });
  }

  // Agregar nueva tarjeta
  addCard({ name, link }) {
    return this._request(`/cards`, {
      method: "POST",

      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  // Eliminar tarjeta
  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  // Cambiar estado de like en una tarjeta
  changeLikeCardStatus(cardId, likestate) {
    return this._request(`/cards/${cardId}/likes`, {
      method: !likestate ? "DELETE" : "PUT",
    });
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
