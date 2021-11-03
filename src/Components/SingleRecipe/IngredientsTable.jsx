import { removeRecipeIngredient, addIngredientRecipe } from "../../api/recipe";
import { getAllIngredients } from "../../api/ingredient";
import { IngredientsDropdown } from "../IngredientsDropdown";
import { useState, useEffect } from "react";

export const IngredientsTable = ({
  setAddNewingredient,
  addNewIngredient,
  setRecipeIngredients,
  recipeInfo,
  edit,
  recipeIngredients,
}) => {
  const [ingredient, setIngredient] = useState("");
  const [qty, setQty] = useState("");
  const [unit, setUnit] = useState("");
  const [ingredientId, setIngredientId] = useState("");
  const [newIngredients, setNewIngredients] = useState([]);

  /* HANDLERS */
  const ingredientHandler = (e) => {
    let index = e.target.selectedIndex;
    setIngredientId(e.target.childNodes[index].id);
    setIngredient(e.target.value);
  };

  const qtyHandler = (e) => {
    setQty(e.target.value);
  };

  const unitHandler = (e) => {
    setUnit(e.target.value);
  };

  /* GET RECIPE INGREDIENTS */
  const getIngredients = async () => {
    setNewIngredients(await getAllIngredients());
  };

  useEffect(() => {
    getIngredients();
  }, []);

  /* CONST GET AVAILABLE INGREDIENTS */
  const getAvailableIngredients = () => {
    let ingredientsNotYetInRecipe = newIngredients.filter((elem) =>
      recipeIngredients.every((elem2) => elem2.ingredientId !== elem._id)
    );
    setNewIngredients(ingredientsNotYetInRecipe);
  };

  /* NEW INGREDIENT FORM */
  const toggleIngredientForm = () => {
    setAddNewingredient(!addNewIngredient);
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

  /* ADD NEW INGREDIENT */
  const addIngredient = async () => {
    const response = await addIngredientRecipe(
      recipeInfo._id,
      ingredientId,
      ingredient,
      qty,
      unit
    );
    if (response) {
      setRecipeIngredients(response.ingredients);
      getAvailableIngredients();
      setAddNewingredient(false);
      resetIngredients();
    }
  };

  /* RESET INGREDIENT STATE */
  const resetIngredients = () => {
    setIngredientId("");
    setIngredient("");
    setQty("");
    setUnit("");
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
          arr={newIngredients}
          ingredientNameHandler={ingredientHandler}
          quantity={qty}
          quantityHandler={qtyHandler}
          unitHandler={unitHandler}
          submitAction={addIngredient}
        />
      ) : null}
    </div>
  );
};
