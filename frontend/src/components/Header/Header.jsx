import { Link, useLocation } from "react-router-dom"; // Importamos useLocation
import logo from "../../assets/Vector.svg";
/* import "../../../blocks/header.css"; */

function Header({ userEmail, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="around" />

        <nav className="header__nav">
          {location.pathname === "/signin" && (
            <Link to="/signup" className="header__link">
              Regístrate
            </Link>
          )}

          {location.pathname === "/signup" && (
            <Link to="/signin" className="header__link">
              Iniciar sesión
            </Link>
          )}
          {location.pathname === "/" && (
            <div className="header__user-info">
              <span className="header__email">{userEmail}</span>
              <button onClick={onSignOut} className="header__logout-button">
                Cerrar sesión
              </button>
            </div>
          )}
        </nav>
      </div>
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
