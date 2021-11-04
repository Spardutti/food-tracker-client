import { useState, useEffect } from "react";

import { IngredientsDropdown } from "../IngredientsDropdown";
import { addIngredientToFridge } from "../../api/user";

export const UserFridge = ({ user }) => {
  const [fridge, setFridge] = useState([]);
  const [ingredientDropdown, setIngredientDropdown] = useState(false);

  /* TOGGLE INGREDIENT DROPDOWN */
  const toggleDropdown = () => {
    setIngredientDropdown(!ingredientDropdown);
  };

  useEffect(() => {
    user && setFridge(user.fridge);
  }, [user]);

  /* CONST ADD INGREDIENT TO USER FRIDGE */
  const addToFridge = async (
    ingredientId,
    ingredientName,
    ingredientQty,
    ingredientUnit
  ) => {
    const response = await addIngredientToFridge(
      ingredientId,
      ingredientName,
      ingredientQty,
      ingredientUnit
    );
    return response;
  };

  return (
    <div>
      <p>fridge</p>
      {fridge
        ? fridge.map((ingredient, index) => {
            return (
              <div>
                <p>{ingredient.name}</p>
                <p>{ingredient.quantity}</p>
                <p>{ingredient.unit}</p>
              </div>
            );
          })
        : null}
      <p className="btn" onClick={toggleDropdown}>
        add ingredient
      </p>
      {ingredientDropdown ? (
        <IngredientsDropdown
          setIngredientsInUse={setFridge}
          ingredientsInUse={fridge}
          setToggle={toggleDropdown}
          submitAction={addToFridge}
        />
      ) : null}
    </div>
  );
};
