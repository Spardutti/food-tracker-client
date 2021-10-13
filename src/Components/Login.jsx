import { useContext, useState } from "react";
import { localLogin } from "../api/user";
import Spinner from "./styled/Spinner";
import { userContext } from "../context/userContext";
import { useHistory } from "react-router";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { setUser } = useContext(userContext);

  /* HANDLERS */
  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordhandler = (e) => {
    setPassword(e.target.value);
  };

  /* LOGIN */
  const login = async () => {
    setLoading(true);
    const response = await localLogin(username, password);

    if (response.status === 500) {
      setLoading(false);
      setErrors(response.data.errors);
      return;
    }

    setUser(response.data.user);
    setLoading(false);
    history.push("/home");
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
    <div className="login-container">
      <form className="form">
        <div className="input-container">
          <input
            type="text"
            value={username}
            onChange={usernameHandler}
            required
            autoComplete="off"
          />
          <label htmlFor="">Usuario</label>
        </div>
        <div className="input-container">
          <input
            type="password"
            value={password}
            onChange={passwordhandler}
            required
          />
          <label htmlFor="">Contraseña</label>
        </div>
        {errors ? (
          <ShowErrors />
        ) : loading ? (
          <Spinner />
        ) : (
          <div className="btn-container">
            <button className="btn btn-main" onClick={login}>
              Entrar
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
