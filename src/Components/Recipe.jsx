import { useState, useEffect } from "react";
import { getRecipe } from "../api/recipe";

export const Recipe = (props) => {
  const [recipeId, setRecipeId] = useState();

  const getRecipeInfo = async () => {
    getRecipe(recipeId);
  };

  useEffect(() => {
    setRecipeId(props.location.state.id);
  }, []);

  useEffect(() => {
    getRecipeInfo();
  }, [recipeId]);

  return <div>recipe</div>;
};
