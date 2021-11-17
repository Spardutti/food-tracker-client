const urlDev = "http://localhost:5000";

/* GET ALL INGREDIENTS ARRAY INFO */
export const getAllIngredients = async () => {
  const response = await fetch(urlDev + "/ingredient/allIngredients");
  const data = await response.json();
  return data;
};
