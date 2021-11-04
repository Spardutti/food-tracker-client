import { removeRecipeIngredient, addIngredientRecipe } from "../../api/recipe";
import { IngredientsDropdown } from "../IngredientsDropdown";

export const IngredientsTable = ({
  setAddNewingredient,
  addNewIngredient,
  setRecipeIngredients,
  recipeInfo,
  edit,
  recipeIngredients,
}) => {
  /* NEW INGREDIENT FORM */
  const toggleIngredientForm = () => {
    setAddNewingredient(!addNewIngredient);
    //getAvailableIngredients();
  };

  /* REMOVE RECIPE INGREDIENT */
  const removeIngredient = async (e) => {
    const ingredientId = e.target.id;
    const response = await removeRecipeIngredient(recipeInfo._id, ingredientId);
    if (response) {
      setRecipeIngredients(response.ingredients);
    }
  };

  /* ADD NEW INGREDIENT */
  const addIngredient = async (
    ingredientId,
    ingredientName,
    ingredientQty,
    ingredientUnit
  ) => {
    const response = await addIngredientRecipe(
      recipeInfo._id,
      ingredientId,
      ingredientName,
      ingredientQty,
      ingredientUnit
    );
    return response;
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
      {edit ? (
        <p className="btn add-ingredient" onClick={toggleIngredientForm}>
          {addNewIngredient ? "close" : "add new ingredient"}
        </p>
      ) : null}
      {addNewIngredient ? (
        <IngredientsDropdown
          setToggle={setAddNewingredient}
          recipeInfo={recipeInfo}
          setIngredientsInUse={setRecipeIngredients}
          ingredientsInUse={recipeIngredients}
          submitAction={addIngredient}
        />
      ) : null}
    </div>
  );
};
