import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

import Login from "./Login/Login";
import Register from "./Login/Register.jsx";
import ProtectedRoute from "./Login/ProtectedRoute.jsx";
import InfoTooltip from "./Login/InfoTooltip.jsx";

import api from "../utils/api";
import * as auth from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  /* const [popup, setPopup] = useState(null); */
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState("");
  const navigate = useNavigate();

  // Verificar si hay token guardado al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res.data || res);
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        });
    }
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          // Verifica si userData tiene .data o es el objeto directo
          // Basado en tu consola anterior de api.js, es el objeto directo.
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => console.error(err));
    }
  }, [isLoggedIn]);

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setTooltipStatus("error");
        setIsInfoTooltipOpen(true);
      });
  };

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then(() => {
        setTooltipStatus("success");
        setIsInfoTooltipOpen(true);
        navigate("/signin");
      })
      .catch((err) => {
        console.error(err);
        setTooltipStatus("error");
        setIsInfoTooltipOpen(true);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser({});
    setCards([]);
    navigate("/signin");
  };

  const handleCloseTooltip = () => {
    setIsInfoTooltipOpen(false);
  };

  const handleUpdateUser = (data) => {
    (async () => {
      await api.setUserInfo(data).then((newData) => {
        setCurrentUser(newData);
      });
    })();
  };

  const handleUpdateAvatar = (data) => {
    (async () => {
      await api.setUserAvatar(data).then((newUserData) => {
        setCurrentUser(newUserData);
      });
    })();
  };

  const handleAddPlaceSubmit = (newCardData) => {
    (async () => {
      await api.addCard(newCardData).then((newCard) => {
        setCards([newCard, ...cards]);
      });
    })();
  };

  return (
    <>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          isLoggedIn,
          handleUpdateUser,
          handleUpdateAvatar,
          handleAddPlaceSubmit,
        }}
      >
        <div className="page">
          <Header
            userEmail={currentUser?.email || ""}
            onSignOut={handleLogout}
          />
          <Routes>
            <Route
              path="/signup"
              element={
                <Register onRegister={handleRegister} isLoading={isLoggedIn} />
              }
            />

            <Route
              path="/signin"
              element={<Login onLogin={handleLogin} isLoading={isLoggedIn} />}
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Main cards={cards} setCards={setCards} />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={handleCloseTooltip}
          status={tooltipStatus}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
