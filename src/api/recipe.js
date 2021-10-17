const urlDev = "http://localhost:5000";

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
  console.log(data);
};
