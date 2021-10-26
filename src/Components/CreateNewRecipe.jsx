import { useState, useEffect } from "react";
import { getAllIngredients } from "../api/ingredient";
import { IngredientsDropdown } from "./IngredientsDropdown";
import { createNewRecipe } from "../api/recipe";

export const CreateNewRecipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("");
  const [allIngredients, setAllIngredients] = useState([]);

  /* HANDLERS */
  const nameHandler = (e) => {
    setRecipeName(e.target.value);
  };

  const instrucrionsHandler = (e) => {
    setRecipeInstructions(e.target.value);
  };

  const ingredientHandler = (e) => {
    setIngredientName(e.target.value);
  };

  const quantityHandler = (e) => {
    setIngredientQuantity(e.target.value);
  };

  const unitHandler = (e) => {
    setIngredientUnit(e.target.value);
  };

  /* CREATE FUNCTION */
  const createRecipe = async (e) => {
    e.preventDefault();

    createNewRecipe(
      recipeName,
      recipeInstructions,
      recipeIngredients,
      ingredientQuantity,
      ingredientUnit
    );
  };

  /* ADD INGREDIENT TO RECIPE */
  const addIngredient = async (e) => {
    e.preventDefault();

    let add = recipeIngredients;

    add.push({
      ingredient: ingredientName,
      quantity: ingredientQuantity,
      unit: ingredientUnit,
    });
    console.log(add, recipeIngredients);
    setRecipeIngredients(add);
  };

  const getAll = async () => {
    const ingredient = await getAllIngredients();
    if (ingredient) setAllIngredients(ingredient);
  };
  useEffect(() => {
    getAll();
  }, []);

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
        <div className="input-container">
          <IngredientsDropdown
            ingredients={allIngredients}
            valueKey={ingredientName}
            onChangeKey={ingredientHandler}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            required
            autoComplete="off"
            onChange={quantityHandler}
            value={ingredientQuantity}
          />
          <label htmlFor="">Cantidad</label>
        </div>
        <div className="input-container">
          <select name="" id="" onChange={unitHandler} value={ingredientUnit}>
            <option value=""></option>
            <option value="Grs">Grs.</option>
            <option value="Ml">Ml.</option>
          </select>
        </div>
        <div className="btn-container">
          <button className="btn btn-main" onClick={addIngredient}>
            Add Ingredient
          </button>
        </div>
        <div className="btn-container">
          <button className="btn btn-main" onClick={createRecipe}>
            Create Recipe
          </button>
        </div>
      </form>
    </div>
  );
};
