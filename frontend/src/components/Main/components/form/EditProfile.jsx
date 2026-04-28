import { useState, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditProfile({ onClose }) {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateUser({
      name: name,
      about: description,
    });

    if (onClose) {
      onClose();
    }
  };

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          id="card-name"
          maxLength="30"
          minLength="1"
          name="card-name"
          placeholder="Name"
          required
          type="text"
          value={name} // Vincula name con la entrada
          onChange={handleNameChange} // Agrega el controlador onChange
        />
        <span className="popup__error" id="card-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_description"
          id="card-description"
          maxLength="200"
          minLength="2"
          name="userDescription"
          placeholder="Acerca de mí"
          required
          type="text"
          value={description} // Vincula description con la entrada
          onChange={handleDescriptionChange} // Agrega el controlador onChange
        />
        <span className="popup__error" id="card-link-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
