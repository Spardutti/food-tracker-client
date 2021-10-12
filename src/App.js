import { Home } from "./Components/Home";
import { NavBar } from "./Components/NavBar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Recipe } from "./Components/Recipe";
import { Login } from "./Components/Login";
import "./sass/main.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/recipes" component={Recipe} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
