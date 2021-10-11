import { useState, useEffect } from "react";
import { newLocalUser } from "../api/user";

export const Signup = ({ toggleSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState();

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
    e.preventDefault();
    const response = await newLocalUser(username, password, confirmPassword);
    console.log(response);
    if (response.status === 500) setErrors(response.data.errors);
    /* TODO ELSE CREATE ACC AND PROCEED */
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
          ) : (
            <div className="btn-container">
              <button className="btn btn-main" onClick={(e) => createAcc(e)}>
                Crear
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
