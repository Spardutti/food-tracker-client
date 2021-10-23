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
      <div className="recipe-tittle">
        <h3>{recipeInfo.name}</h3>
        <p>Calificacion {recipeInfo.rating.length}</p>
        <hr />
      </div>
      <div className="recipe-ingredients">
        <h5>Ingredientes</h5>
      </div>
      <div className="recipe-instructions">
        <h5>Preparacion</h5>
        <p>{recipeInfo.instructions}</p>
      </div>
    </div>
  ) : null;
};
