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

/* ADD INGREDIENT TO RECIPE */
export const addIngredientRecipe = async (
  recipeId,
  ingredientId,
  ingredientName,
  ingredientQty,
  ingredientUnit
) => {
  const response = await fetch(urlDev + "/recipe/ingredients/" + recipeId, {
    method: "POST",
    headers: params,
    body: JSON.stringify({
      ingredientId,
      name: ingredientName,
      quantity: ingredientQty,
      unit: ingredientUnit,
    }),
  });
  const data = await response.json();
  return data;
};

/* CREATE NEW RECIPE */
export const createNewRecipe = async (name, instructions, ingredients) => {
  const response = await fetch(urlDev + "/recipe/new", {
    method: "POST",
    headers: params,
    body: JSON.stringify({
      name,
      instructions,
      ingredients,
    }),
  });
  const data = await response.json();
  return data;
};

/* UPDATE RECIPE NAME */
export const updateRecipeName = async (recipeId, recipeName) => {
  const response = await fetch(`${urlDev}/recipe/name/${recipeId}`, {
    method: "PATCH",
    headers: params,
    body: JSON.stringify({
      name: recipeName,
    }),
  });
  if (response.status === 500) return response;
  const data = await response.json();
  return data;
};

/* ADD NEW COMMENT TO RECIPE */
export const addNewComment = async (recipeId, commentText) => {
  const response = await fetch(`${urlDev}/recipe/newComment`, {
    method: "POST",
    headers: params,
    body: JSON.stringify({
      text: commentText,
      recipeId,
    }),
  });
  if (response.status === 500) return response;
  const data = await response.json();
  return data;
};

/* DELETE RECIPE COMMENT */
export const deleteComment = async (recipeId, commentId) => {
  const response = await fetch(`${urlDev}/recipe/comment/${recipeId}`, {
    method: "DELETE",
    headers: params,
    body: JSON.stringify({
      commentId,
    }),
  });
  if (response.status === 500) return response;
  const data = await response.json();
  return data;
};

/* EDIT COMMENT TEXT */
export const editCommentText = async (recipeId, commentId, text) => {
  const response = await fetch(`${urlDev}/recipe/comment/${recipeId}`, {
    method: "PATCH",
    headers: params,
    body: JSON.stringify({
      commentId,
      text,
    }),
  });
  if (response.status === 500) return response;

  const data = await response.json();
  return data;
};
