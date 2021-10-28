import { useState, useEffect } from "react";
import { getAllIngredients } from "../api/ingredient";
import { IngredientsDropdown } from "./IngredientsDropdown";
import { createNewRecipe } from "../api/recipe";

export const CreateNewRecipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [ingredientID, setIngredientID] = useState("");
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

  const ingredientNameHandler = (e) => {
    setIngredientID(e.target.id);
    setIngredientName(e.target.value);
    console.log(ingredientName, ingredientID, e.target);
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

    createNewRecipe(recipeName, recipeInstructions, recipeIngredients);
    console.log(allIngredients, ingredientID);
  };

  /* GET ALL INGREDIENTS INFO */
  const getAll = async () => {
    const ingredient = await getAllIngredients();

    if (ingredient) setAllIngredients(ingredient);
  };

  /* ADD INGREDIENT TO RECIPE */
  const addIngredient = async (e) => {
    e.preventDefault();

    let add = recipeIngredients;

    add.push({
      ingredientId: ingredientID,
      name: ingredientName,
      quantity: ingredientQuantity,
      unit: ingredientUnit,
    });
    console.log(add, recipeIngredients, ingredientID);
    setRecipeIngredients(add);
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
            arr={allIngredients}
            ingredientNameHandler={ingredientNameHandler}
            quantity={ingredientQuantity}
            quantityHandler={quantityHandler}
            unitHandler={unitHandler}
            submitAction={addIngredient}
          />
        </div>
        <div className="btn-container">
          <button className="btn btn-main" onClick={(e) => createRecipe(e)}>
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};
