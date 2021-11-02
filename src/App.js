import { Home } from "./Components/Home";
import { NavBar } from "./Components/NavBar";
import { Switch, Route } from "react-router-dom";
import { SingleRecipe } from "./Components/SingleRecipe/SingleRecipe";
import { Login } from "./Components/Login";
import "./sass/main.css";
import { userContext } from "./context/userContext";
import { useState, useEffect } from "react";
import { Profile } from "./Components/Profile";
import { WelcomeScreen } from "./Components/WelcomeScreen";
import { checkLocalToken, getUser } from "./api/user";
import { useHistory } from "react-router";
import { Recipes } from "./Components/Recipes";

function App() {
  const [user, setUser] = useState();
  const history = useHistory();

  /* SEARCH FOR TOKEN AND FIND USER IF TOKEN */
  const searchToken = async () => {
    const isToken = await checkLocalToken();
    if (isToken) {
      setUser(await getUser());
    } else history.push("/");
  };

  useEffect(() => {
    searchToken();
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      <NavBar />
      <Switch>
        <Route path="/recipe" component={SingleRecipe} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/home" component={Home} />
        <Route path="/recipes" component={Recipes} />
        <Route exact path="/" component={WelcomeScreen} />
      </Switch>
    </userContext.Provider>
  );
}

export default App;
