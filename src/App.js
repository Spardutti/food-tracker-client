import { Home } from "./Components/Home";
import { NavBar } from "./Components/NavBar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Recipe } from "./Components/Recipe";
import { Login } from "./Components/Login";
import "./sass/main.css";
import { userContext } from "./context/userContext";
import { useState, useEffect } from "react";
import { Profile } from "./Components/Profile";
import { WelcomeScreen } from "./Components/WelcomeScreen";
import { checkLocalToken, getUser } from "./api/user";
import { useHistory } from "react-router";

function App() {
  const [user, setUser] = useState();
  const history = useHistory();

  /* SEARCH FOR TOKEN AND FIND USER IF TOKEN */
  const searchToken = async () => {
    const isToken = await checkLocalToken();
    if (isToken) {
      setUser(await getUser());
      history.push("/home");
    } else history.push("/");
  };

  useEffect(() => {
    searchToken();
  }, []);

  return (
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
  );
}

export default App;
