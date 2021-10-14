import { useState, useEffect } from "react";
import { latestRecipes } from "../api/recipe";
import { RecipeCard } from "./RecipeCard";

export const Home = () => {
  const [newRecipes, setNewRecipes] = useState([]);

  /* GET LATEST RECIPES */
  const getLatest = async () => {
    const recipes = await latestRecipes();
    if (recipes) setNewRecipes(recipes);
  };

  useEffect(() => {
    getLatest();
  }, []);

  return (
    <div>
      {newRecipes.map((recipe, index) => {
        return (
          <RecipeCard name={recipe.name} image={recipe.image} key={index} />
        );
      })}
      <p>Home</p>
    </div>
  );
};
