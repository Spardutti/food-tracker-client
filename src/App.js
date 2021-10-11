import { Home } from "./Components/Home";
import { NavBar } from "./Components/NavBar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Recipe } from "./Components/Recipe";
import "./sass/main.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/recipes" component={Recipe} />
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
