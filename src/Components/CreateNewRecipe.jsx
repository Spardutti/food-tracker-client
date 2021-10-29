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
    let index = e.target.selectedIndex;
    setIngredientID(e.target.childNodes[index].id);
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
    let preRecipeIngredients = {
      ingredientId: ingredientID,
      name: ingredientName,
      quantity: ingredientQuantity,
      unit: ingredientUnit,
    };
    console.log(preRecipeIngredients, recipeIngredients, ingredientID);
    setRecipeIngredients((prev) => [...prev, preRecipeIngredients]);
    let newDropDownArray = allIngredients;
    for (let i = 0; i < newDropDownArray.length; i++) {
      if (newDropDownArray[i].name === preRecipeIngredients.name) {
        newDropDownArray.splice([i], 1);
      }
    }
    setAllIngredients(newDropDownArray);
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
