import { createContext, useState } from "react";

export const CurrentUserContext = createContext();

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // <--- Aquí nace isLoggedIn

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
