import ImagePopup from "../form/ImagePopup";
export default function Popup(props) {
  const { onClose, title, children } = props;
  const isImagePopup = children.type === ImagePopup;

  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <div className="popup">
        <div className="popup__close" onClick={onClose}>
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
        </div>
        <div
          className={isImagePopup ? "popup__content" : "popup__contentwhite"}
        >
          {title && <h2 className="popup__title">{title}</h2>}
          {children}
        </div>
      </div>
    </>
  );
}
