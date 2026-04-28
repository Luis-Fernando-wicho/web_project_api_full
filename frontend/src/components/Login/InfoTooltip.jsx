import React from "react";
import successIcon from "../../assets/success.png";
import errorIcon from "../../assets/error.png";
import "../../../blocks/infoTooltip.css";

function InfoTooltip({ isOpen, onClose, status }) {
  return (
    <div className={`popupLogin ${isOpen ? "popupLogin_opened" : ""}`}>
      <div className="popupLogin__content popupLogin__content_content_tooltip">
        <button
          aria-label="Close modal"
          className="popupLogin__close"
          type="button"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </button>

        <div className="popupLogin__icon">
          {status === "success" ? (
            <img
              src={successIcon}
              alt="Success"
              className="popupLogin__status-image"
            />
          ) : (
            <img
              src={errorIcon}
              alt="Error"
              className="popupLogin__status-image"
            />
          )}
        </div>

        <h3 className="popupLogin__title popupLogin__title_tooltip">
          {status === "success"
            ? "¡Te has registrado con éxito!"
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
