import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Signup } from "./Singup";

export const NavBar = () => {
  const [user, setUser] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  const toggleSignup = () => setSignupModal(!signupModal);

  const User = () => {
    return (
      <div className="nav">
        <Link to="/profile">Mi Perfil</Link>
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
          <Link to="/recipes">Recetas</Link>
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
