import { useState, useEffect } from "react";
import { getRecipe } from "../api/recipe";

export const SingleRecipe = (props) => {
  const [recipeId, setRecipeId] = useState();
  const [recipeInfo, setRecipeInfo] = useState();
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);

  const getRecipeInfo = async () => {
    setRecipeInfo(await getRecipe(recipeId));
  };

  useEffect(() => {
    const id = params.get("id");
    setRecipeId(id);
  }, []);

  useEffect(() => {
    recipeId && getRecipeInfo();
  }, [recipeId]);

  useEffect(() => {
    console.log(recipeInfo);
  }, [recipeInfo]);

  return recipeInfo ? (
    <div className="recipe-container">
      <div className="tittle">
        <h3>{recipeInfo.name}</h3>
        <p>Calificacion {recipeInfo.rating.length}</p>
        <hr />
      </div>
      <div className="ingredients">
        <h5>Ingredientes</h5>
        {recipeInfo.ingredients.map((ingredient, index) => {
          return (
            <ul className="list" key={index}>
              <li>{ingredient.ingredient.name}</li>
              <li>{ingredient.quantity}</li>
              <li>{ingredient.unit}</li>
            </ul>
          );
        })}
      </div>
      <div className="instructions">
        <h5>Preparacion</h5>
        <p>{recipeInfo.instructions}</p>
      </div>
    </div>
  ) : null;
};
