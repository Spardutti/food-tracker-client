import { useEffect, useState } from "react/cjs/react.development";
import { Units } from "./styled/Unit";
import { addIngredientRecipe } from "../api/recipe";
import { getAllIngredients } from "../api/ingredient";

export const IngredientsDropdown = (props) => {
  const { setUpdatedArr, updatedArr, recipeInfo, setToggle } = props;

  const [ingredientId, setIngredientId] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQty, setIngredientQty] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("");
  const [ingredientsInUse, setIngredientsInUse] = useState([]);

  /* HANDLERS */
  const ingredientHandler = (e) => {
    let index = e.target.selectedIndex;
    setIngredientId(e.target.childNodes[index].id);
    setIngredientName(e.target.value);
  };

  const qtyHandler = (e) => {
    setIngredientQty(e.target.value);
  };

  const unitHandler = (e) => {
    setIngredientUnit(e.target.value);
  };

  /* GET  INGREDIENTS IN USE */
  const getIngredients = async () => {
    setIngredientsInUse(await getAllIngredients());
  };

  useEffect(() => {
    getIngredients();
  }, []);

  /* ADD NEW INGREDIENT */
  const addIngredient = async () => {
    const response = await addIngredientRecipe(
      recipeInfo._id,
      ingredientId,
      ingredientName,
      ingredientQty,
      ingredientUnit
    );
    if (response) {
      setUpdatedArr(response.ingredients);
      resetIngredients();
      setToggle(false);
    }
  };

  /* RESET INGREDIENT STATE */
  const resetIngredients = () => {
    setIngredientId("");
    setIngredientName("");
    setIngredientQty("");
    setIngredientUnit("");
  };

  /* CONST GET AVAILABLE INGREDIENTS */
  const getAvailableIngredients = () => {
    let ingredientsNotYetInRecipe = ingredientsInUse.filter((elem) =>
      updatedArr.every((elem2) => elem2.ingredientId !== elem._id)
    );
    //TODO ingredients in use is empty, fix
    console.log(ingredientsNotYetInRecipe, ingredientsInUse, updatedArr);
    setIngredientsInUse(ingredientsNotYetInRecipe);
  };

  useEffect(() => {
    ingredientsInUse && getAvailableIngredients();
  }, []);

  return (
    <div className="form">
      <select onChange={ingredientHandler} defaultValue="" required>
        <option disabled value="">
          Escoge un ingrediente
        </option>
        {ingredientsInUse.map((ingredient, index) => {
          return (
            <option value={ingredient.name} id={ingredient._id} key={index}>
              {ingredient.name}
            </option>
          );
        })}
      </select>
      <div className="input-container">
        <input
          type="number"
          required
          autoComplete="off"
          onChange={qtyHandler}
          value={ingredientQty}
        />
        <label>Cantidad</label>
      </div>
      <Units unitHandler={unitHandler} />
      <p className="btn" onClick={addIngredient}>
        Agregar
      </p>
    </div>
  );
};
