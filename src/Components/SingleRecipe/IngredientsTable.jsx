import { removeRecipeIngredient } from "../../api/recipe";

export const IngredientsTable = ({
  setAddNewingredient,
  addNewIngredient,
  setRecipeIngredients,
  recipeInfo,
  edit,
  recipeIngredients,
  getAvailableIngredients,
}) => {
  /* CONST GET AVAILABLE INGREDIENTS */

  /* NEW INGREDIENT FORM */
  const toggleIngredientForm = () => {
    setAddNewingredient(!addNewIngredient);
    //if (addNewIngredient && edit) setEdit(false);
    getAvailableIngredients();
  };

  /* REMOVE RECIPE INGREDIENT */
  const removeIngredient = async (e) => {
    const ingredientId = e.target.id;
    const response = await removeRecipeIngredient(recipeInfo._id, ingredientId);
    if (response) {
      setRecipeIngredients(response.ingredients);
    }
  };

  return (
    <div>
      <table className="ingredients-table">
        <thead>
          <tr>
            <th>Ingrediente</th>
            <th>Cantidad</th>
            <th>Unidad</th>
            {edit && <th></th>}
          </tr>
        </thead>
        <tbody>
          {recipeIngredients.map((ingredient, index) => {
            return (
              <tr key={index}>
                <td>{ingredient.name}</td>
                <td>{ingredient.quantity}</td>
                <td>{ingredient.unit}</td>
                {edit && (
                  <td id={ingredient.ingredientId} onClick={removeIngredient}>
                    x
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {edit && (
        <p className="btn add-ingredient" onClick={toggleIngredientForm}>
          {addNewIngredient ? "close" : "add new ingredient"}
        </p>
      )}
    </div>
  );
};
