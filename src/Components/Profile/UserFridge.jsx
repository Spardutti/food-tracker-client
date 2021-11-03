import { useState, useEffect } from "react";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { IngredientsDropdown } from "../IngredientsDropdown";

export const UserFridge = () => {
  const [fridge, setFridge] = useState([]);
  const [ingredientDropdown, setIngredientDropdown] = useState(false);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQty, setIngredientQty] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("");

  const user = useContext(userContext);

  /* TOGGLE INGREDIENT DROPDOWN */
  const toggleDropdown = () => {
    setIngredientDropdown(!ingredientDropdown);
  };

  useEffect(() => {
    user && setFridge(user.fridge);
  }, []);

  return (
    <div>
      <p>fridge</p>
      {fridge
        ? fridge.map((ingredient, index) => {
            return (
              <div>
                <p>{ingredient.quantity}</p>
                <p>{ingredient.unit}</p>
              </div>
            );
          })
        : null}
      <p className="btn" onClick={toggleDropdown}>
        add ingredient
      </p>
      {ingredientDropdown ? <IngredientsDropdown /> : null}
    </div>
  );
};
