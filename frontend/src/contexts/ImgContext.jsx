import { createContext, useState } from "react";

export const ImgContext = createContext();

export function ImgContextProvider(props) {
  const [contextLinkImg, setContextLinkImg] = useState(null);
  const [contextNameImg, setContextNamekImg] = useState(null);

  const valorGlobal = {
    contextLinkImg,
    setContextLinkImg,
    contextNameImg,
    setContextNamekImg,
  };

  return (
    <ImgContext.Provider value={valorGlobal}>
      {props.children}
    </ImgContext.Provider>
  );
}
