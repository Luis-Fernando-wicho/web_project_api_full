import { Link } from "react-router-dom";
import { useState } from "react";

import "../../../blocks/login.css";

const Login = ({ onLogin, isLoading }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(data.email, data.password);
  };

  return (
    <div className="login">
      <p className="login__welcome">Inicia sesión</p>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__form-input"
          id="email"
          name="email"
          type="email"
          value={data.email || ""} // El || "" evita el undefined
          onChange={handleChange}
          placeholder="correo electronico"
          required
        />
        <input
          className="login__form-input"
          id="password"
          name="password"
          type="password"
          value={data.password || ""} // El || "" evita el undefined
          onChange={handleChange}
          placeholder="contraseña"
          required
        />

        <button type="submit" className="login__link">
          Iniciar sesión
        </button>
      </form>

      <div className="login__signup">
        <Link to="/signup" className="signup__link">
          ¿Aún no eres miembro? Regístrate aquí
        </Link>
      </div>
    </div>
  );
};

export default Login;
