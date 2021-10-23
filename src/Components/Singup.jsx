import { useState, useEffect } from "react";
import { newLocalUser } from "../api/user";
import Spinner from "./styled/Spinner";
import { useHistory } from "react-router-dom";

export const Signup = ({ toggleSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState();
  const [accCreated, setAccCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  /* HANDLERS */
  const usernameHandler = (e) => {
    setUsername(e.target.value);
    setErrors();
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    setErrors();
  };

  const confirmHandler = (e) => {
    setConfirmPassword(e.target.value);
    setErrors();
  };

  /* CREATE ACC */
  const createAcc = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await newLocalUser(username, password, confirmPassword);

    if (response.status === 500) {
      setLoading(false);
      return setErrors(response.data.validationErrors);
    }

    setLoading(false);
    setAccCreated(true);

    setTimeout(() => {
      toggleSignup();
      history.push("/login");
    }, 1000);
  };

  /* SHOW ERRORS  */
  const ShowErrors = () => {
    return (
      errors && (
        <div className="errors">
          {errors.map((error, index) => {
            return <p key={index}>{error.msg}</p>;
          })}
        </div>
      )
    );
  };

  return (
    <div className="overlay" onClick={toggleSignup}>
      <div onClick={(e) => e.stopPropagation()}>
        <form action="#" className="form">
          <div className="input-container">
            <input
              type="text"
              name="username"
              value={username}
              required
              autoComplete="off"
              onChange={usernameHandler}
            />
            <label htmlFor="">Usuario</label>
          </div>
          <div className="input-container">
            <input
              type="text"
              name="password"
              value={password}
              required
              autoComplete="off"
              onChange={passwordHandler}
            />
            <label htmlFor="">Contraseña</label>
          </div>
          <div className="input-container">
            <input
              type="text"
              name="confirm"
              value={confirmPassword}
              required
              autoComplete="off"
              onChange={confirmHandler}
            />
            <label htmlFor="">Confirmar contraseña</label>
          </div>
          {errors ? (
            <ShowErrors />
          ) : loading ? (
            <Spinner />
          ) : (
            <div className="btn-container">
              {accCreated ? (
                <p>Cuenta creada!</p>
              ) : (
                <button className="btn btn-main" onClick={(e) => createAcc(e)}>
                  Crear
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
