import { useState } from "react";
import { localLogin } from "../api/user";

export const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  /* HANDLERS */
  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordhandler = (e) => {
    setPassword(e.target.value);
  };

  /* LOGIN */
  const login = async () => {
    const response = await localLogin(username, password);
    console.log(response);
  };

  return (
    <div className="login-container">
      <form className="form">
        <div className="input-container">
          <input
            type="text"
            value={username}
            onChange={usernameHandler}
            required
          />
          <label htmlFor="">Usuario</label>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={password}
            onChange={passwordhandler}
            required
          />
          <label htmlFor="">Contraseña</label>
        </div>
        <div className="btn-container">
          <button className="btn btn-main" onClick={login}>
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};
