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
<<<<<<< HEAD
  const [allIngredients, setAllIngredients] = useState([]);
=======
>>>>>>> 7d24436026f026ac7d61e54c0b8ec43fc1728bf9

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
<<<<<<< HEAD
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

=======
  const createRecipe = async (e) => {};

  const [allIngredients, setAllIngredients] = useState([]);

>>>>>>> 7d24436026f026ac7d61e54c0b8ec43fc1728bf9
  const getAll = async () => {
    const ingredient = await getAllIngredients();
    if (ingredient) setAllIngredients(ingredient);
  };
<<<<<<< HEAD
=======

>>>>>>> 7d24436026f026ac7d61e54c0b8ec43fc1728bf9
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
<<<<<<< HEAD
<<<<<<< HEAD
            ingredients={allIngredients}
=======
            ingredients=""
>>>>>>> 7d24436026f026ac7d61e54c0b8ec43fc1728bf9
            valueKey={ingredientName}
            onChangeKey={ingredientHandler}
=======
            arr={allIngredients}
            ingredientHandler={ingredientHandler}
            quantity={ingredientQuantity}
            quantityHandler={quantityHandler}
            unitHandler={unitHandler}
            //submitAction={addIngredient}
>>>>>>> 12a81aa4c561c8d0ad6affb63b2743ee65d09642
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
<<<<<<< HEAD
          <button className="btn btn-main" onClick={addIngredient}>
            Add Ingredient
          </button>
        </div>
        <div className="btn-container">
          <button className="btn btn-main" onClick={createRecipe}>
            Create Recipe
=======
          <button className="btn btn-main" onClick={(e) => createRecipe(e)}>
            Create
>>>>>>> 7d24436026f026ac7d61e54c0b8ec43fc1728bf9
          </button>
        </div>
      </form>
    </div>
  );
};
