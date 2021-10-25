import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { getAllRecipes } from "../api/recipe";
import { RecipeCard } from "./RecipeCard";
import { CreateNewRecipe } from "./CreateNewRecipe";

export const Recipes = () => {
    const [allRecipes, setAllRecipes] = useState([]);

    const getAll = async () => {
        const recipes = await getAllRecipes();
        if (recipes) setAllRecipes(recipes);
    }

    useEffect(() => {
       getAll();
    }, []);


    return (
        <div>
            <CreateNewRecipe />
            <div >
            <button className="new-recipe-button">Crear Receta</button>
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
    )
}