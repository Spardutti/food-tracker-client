import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const [user, setUser] = useState(false);

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
      <div className="nav">
        <Link to="/">Inicio</Link>
        <Link to="/recipes">Recetas</Link>
        <Link to="/signin">Registrarse</Link>
        <Link to="/login">Ingresar</Link>
      </div>
    );
  };
  return user ? <User /> : <NotUser />;
};
