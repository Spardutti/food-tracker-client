import { useState, useEffect } from "react";
import { IngredientsDropdown } from "./IngredientsDropdown";
import { createNewRecipe } from "../api/recipe";

export const CreateNewRecipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [ingredientsToAdd, setIngredientsToAdd] = useState([]);

  /* HANDLERS */
  const nameHandler = (e) => {
    setRecipeName(e.target.value);
  };

  const instrucrionsHandler = (e) => {
    setRecipeInstructions(e.target.value);
  };

  /* CREATE FUNCTION */
  const createRecipe = async (e) => {
    e.preventDefault();

    createNewRecipe(recipeName, recipeInstructions, recipeIngredients);
  };

  /* ADD INGREDIENT TO RECIPE */
  const addIngredient = async (
    ingredientId,
    ingredientName,
    ingredientQty,
    ingredientUnit
  ) => {
    let arr = ingredientsToAdd;
    let preRecipeIngredients = {
      ingredientId: ingredientId,
      name: ingredientName,
      quantity: ingredientQty,
      unit: ingredientUnit,
    };
    setIngredientsToAdd((prev) => [...prev, preRecipeIngredients]);
    arr.push(preRecipeIngredients);
    return arr;
  };

  return (
    <div>
      <form className="form">
        <div className="input-container">
          <input
            type="text"
            required
            autoComplete="off"
            onChange={nameHandler}
            value={recipeName}
          />
          <label htmlFor="">Nombre</label>
        </div>
        <div className="input-container">
          <input
            type="text"
            required
            autoComplete="off"
            onChange={instrucrionsHandler}
            value={recipeInstructions}
          />
          <label htmlFor="">Instrucciones</label>
        </div>
        <div>
          {recipeIngredients ? (
            <ul className="ingredient-list">
              {recipeIngredients.map((ingredient, index) => {
                return (
                  <li value={ingredient.name} key={index}>
                    {ingredient.name}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
        <div className="input-container">
          <IngredientsDropdown
            setIngredientsInUse={setRecipeIngredients}
            ingredientsInUse={recipeIngredients}
            submitAction={addIngredient}
          />
        </div>
        <div className="btn-container">
          <button className="btn btn-main" onClick={createRecipe}>
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};
