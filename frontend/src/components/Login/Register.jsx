import { Link } from "react-router-dom";
import { useState } from "react";
import "../../../blocks/register.css";

const Register = ({ onRegister, isLoading }) => {
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
    // Extrae email y password del estado 'data' y pásalos individualmente
    onRegister(data.email, data.password);
  };

  return (
    <div className="register">
      <p className="register__welcome">Regístrate</p>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__form-input"
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          placeholder="correo electronico"
        />
        <input
          className="register__form-input"
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          placeholder="contraseña"
        />

        <button type="submit" className="register__link">
          Regístrate
        </button>
      </form>
      <div className="register__signin">
        <Link to="/signin" className="register__login-link">
          ¿Ya eres miembro? Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
};

export default Register;
