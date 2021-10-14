const urlDev = "http://localhost:5000";

/* LAST 3 RECIPEs */
export const latestRecipes = async () => {
  const response = await fetch(urlDev + "/recipe/latestRecipes");

  const data = await response.json();

  return data;
};
