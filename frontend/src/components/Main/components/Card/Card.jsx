import React, { useContext } from "react";
import { ImgContext } from "../../../../contexts/imgContext";
import ImagePopup from "../form/ImagePopup";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function Card(props) {
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDelateClick() {
    props.onCardDelete(props.card);
  }

  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = ` ${
    isOwn ? "element__trash" : "element__trash_hidden"
  }`;

  const { name, link, isLiked } = props.card;

  const cardLikeButtonClassName = `element__white_button ${
    isLiked ? "element__white_button-active" : ""
  }`;

  const { setContextLinkImg, setContextNamekImg } = useContext(ImgContext);

  const openImgConfig = { title: "", children: <ImagePopup /> };

  const handleImageClick = () => {
    setContextLinkImg(link);
    setContextNamekImg(name);
    props.onCardClick(openImgConfig);
  };

  return (
    <>
      <li className="element">
        <img className="element__image" src={link} onClick={handleImageClick} />
        <button
          className={cardDeleteButtonClassName}
          onClick={handleDelateClick}
        ></button>
        <div className="element__white">
          <h2 className="element__white element__white_title">{name}</h2>
          <button
            onClick={handleLikeClick}
            className={`element__white ${cardLikeButtonClassName}`}
          ></button>
        </div>
      </li>
    </>
  );
}
