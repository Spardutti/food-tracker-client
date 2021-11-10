import { useState, useEffect } from "react";
import { getAllRecipes } from "../api/recipe";
import { RecipeCard } from "./RecipeCard";
import { CreateNewRecipe } from "./CreateNewRecipe";

export const Recipes = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [newRecipeState, setNewRecipeState] = useState(false);
  const getAll = async () => {
    const recipes = await getAllRecipes();
    if (recipes) setAllRecipes(recipes);
  };

  /* TOGGLE NEW RECIPE FORM */

  const toggleNewRecipe = () => {
    setNewRecipeState(true);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      {newRecipeState ? (
        <CreateNewRecipe setToggle2={setNewRecipeState} />
      ) : (
        <button className="btn btn-main" onClick={toggleNewRecipe}>
          Nueva Receta
        </button>
      )}
      <div>
        <div>
          {allRecipes.map((recipe, index) => {
            const { _id, name, image, rating } = recipe;
            return (
              <RecipeCard
                id={_id}
                name={name}
                image={image}
                rating={rating}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
