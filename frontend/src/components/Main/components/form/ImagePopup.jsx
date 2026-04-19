import React, { useContext } from "react";
import { ImgContext } from "../../../../contexts/imgContext";
export default function ImagePopup() {
  const { contextLinkImg, contextNameImg } = useContext(ImgContext);
  return (
    <>
      <div method="dialog" className="formImg_open">
        <img src={contextLinkImg} alt="" className="img_open__img" />
        <p className="img_open__text">{contextNameImg}</p>
      </div>
    </>
  );
}
