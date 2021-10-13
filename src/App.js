import { Home } from "./Components/Home";
import { NavBar } from "./Components/NavBar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Recipe } from "./Components/Recipe";
import { Login } from "./Components/Login";
import "./sass/main.css";
import { userContext } from "./context/userContext";
import { useState } from "react";
import { Profile } from "./Components/Profile";
import { WelcomeScreen } from "./Components/WelcomeScreen";

function App() {
  const [user, setUser] = useState();

  return (
    <BrowserRouter>
      <userContext.Provider value={{ user, setUser }}>
        <NavBar />
        <Switch>
          <Route path="/recipes" component={Recipe} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/home" component={Home} />
          <Route exact path="/" component={WelcomeScreen} />
        </Switch>
      </userContext.Provider>
    </BrowserRouter>
  );
}

export default App;
