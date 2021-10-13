import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Signup } from "./Singup";
import { userContext } from "../context/userContext";

export const NavBar = () => {
  const { user } = useContext(userContext);
  const [signupModal, setSignupModal] = useState(false);

  const toggleSignup = () => setSignupModal(!signupModal);

  const User = () => {
    return (
      <div className="nav">
        <Link to="/home">Inicio </Link>
        <Link to="/profile">Perfil</Link>
        <Link to="/recipes">Recetas</Link>
        <Link to="#">Salir</Link>
      </div>
    );
  };

  const NotUser = () => {
    return (
      <div>
        <div className="nav">
          <Link to="/">Inicio</Link>
          <Link to="#" onClick={toggleSignup}>
            Registrarse
          </Link>
          <Link to="/login">Ingresar</Link>
        </div>
        {signupModal ? (
          <Signup
            signupModal={signupModal}
            setSignupModal={setSignupModal}
            toggleSignup={toggleSignup}
          />
        ) : null}
      </div>
    );
  };
  return user ? <User /> : <NotUser />;
};
