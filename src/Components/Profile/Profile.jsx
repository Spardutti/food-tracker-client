import { recipesByAuthor } from "../../api/recipe";
import { useState, useEffect, useContext } from "react";
import { RecipeCard } from "../RecipeCard";
import { UserFridge } from "./UserFridge";
import { userContext } from "../../context/userContext";

export const Profile = () => {
  const [userRecipes, setUserRecipes] = useState([]);

  const { user } = useContext(userContext);

  /* GET RECIPES CREATED BY USER */
  const getUserRecipes = async () => {
    const recipes = await recipesByAuthor();
    setUserRecipes(recipes);
  };

  useEffect(() => {
    getUserRecipes();
  }, []);

  return (
    <div className="profile-container">
      <div className="user-recipes-container">
        {userRecipes &&
          userRecipes.map((recipe, index) => {
            return (
              <RecipeCard
                key={index}
                name={recipe.name}
                instructions={recipe.instructions}
                id={recipe._id}
                rating={recipe.rating}
              />
            );
          })}
        <UserFridge user={user} />
      </div>
    </div>
  );
};
