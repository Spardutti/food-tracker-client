import { checkLocalToken } from "./user";

const urlDev = "http://localhost:5000";

const params = {
  Authorization: "",
  "Content-Type": "application/json",
};

/* GET TOKEN FROM LOCALSTORAGE */
(() => {
  const token = localStorage.getItem("food-token");
  if (token) {
    params.Authorization = "Bearer " + token;
  }
})();

/* LAST 3 RECIPEs */
export const latestRecipes = async () => {
  const response = await fetch(urlDev + "/recipe/latestRecipes");

  const data = await response.json();

  return data;
};

/* GET RECIPE */
export const getRecipe = async (id) => {
  const response = await fetch(urlDev + "/recipe/" + id);
  const data = await response.json();
  return data;
};

/* GET ALL RECIPES ARRAY INFO */
export const getAllRecipes = async () => {
  const response = await fetch(urlDev + "/recipe/allRecipes");
  const data = await response.json();
  return data;
};

/* LIKE RECIPE */
export const likeRecipe = async (id) => {
  const response = await fetch(urlDev + "/recipe/like/" + id, {
    method: "PATCH",
    headers: params,
  });
  const data = await response.json();
  return data;
};

/* DISLIKE RECIPE */
export const dislikeRecipe = async (id) => {
  const response = await fetch(urlDev + "/recipe/dislike/" + id, {
    method: "PATCH",
    headers: params,
  });
  const data = await response.json();
  return data;
};

/* DELETE RECIPE */
export const deleteRecipe = async (id) => {
  const response = await fetch(urlDev + "/recipe/" + id, {
    method: "DELETE",
    headers: params,
  });
  const data = await response.json();
  return data;
};

/* REMOVE RECIPE INGREDIENT */
export const removeRecipeIngredient = async (recipeId, ingredientId) => {
  const response = await fetch(urlDev + "/recipe/ingredients/" + recipeId, {
    method: "DELETE",
    headers: params,
    body: JSON.stringify({
      ingredientId,
    }),
  });
  const data = await response.json();
  return data;
};

/* CREATE NEW RECIPE */
export const createNewRecipe = async (
  name,
  instructions,
  ingredientId,
  qty,
  unit
) => {
  const response = await fetch(urlDev + "/recipe/new", {
    method: "POST",
    headers: params,
    body: JSON.stringify({
      name,
      instructions,
      ingredientId,
      qty,
      unit,
    }),
  });
  const data = await response.json();
  console.log(data);
  return data;
};
