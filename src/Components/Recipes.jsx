import { useState, useEffect } from "react";
import { getAllRecipes } from "../api/recipe";
import { RecipeCard } from "./RecipeCard";


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
            <div >
            <h5></h5>
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