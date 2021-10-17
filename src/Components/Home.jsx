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
      <div className="home-container">
        <h5>Ultimas recetas agregadas</h5>
        <div className="home-card-container">
          {newRecipes.map((recipe, index) => {
            const { _id, name, image, instructions, rating } = recipe;
            return (
              <RecipeCard
                id={_id}
                name={name}
                image={image}
                key={index}
                instructions={instructions}
                rating={rating}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
