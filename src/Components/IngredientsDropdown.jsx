import { useEffect, useState } from "react/cjs/react.development";
import { Units } from "./styled/Unit";
import { getAllIngredients } from "../api/ingredient";

export const IngredientsDropdown = (props) => {
  const { setIngredientsInUse, ingredientsInUse, setToggle, submitAction } =
    props;

  const [ingredientId, setIngredientId] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQty, setIngredientQty] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("");
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);

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
    setAllIngredients(await getAllIngredients());
  };

  useEffect(() => {
    getIngredients();
  }, []);

  const submitFunc = async () => {
    const response = await submitAction(
      ingredientId,
      ingredientName,
      ingredientQty,
      ingredientUnit
    );
    if (response) {
      setIngredientsInUse(response);
      resetIngredients();
      console.log(response);
      // setToggle(false);
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
    if (!ingredientsInUse) {
      setAvailableIngredients(allIngredients);
      return;
    }

    let ingredientsNotYetInRecipe = allIngredients.filter((elem) =>
      ingredientsInUse.every((elem2) => elem2.ingredientId !== elem._id)
    );
    console.log(ingredientsInUse);
    setAvailableIngredients(ingredientsNotYetInRecipe);
  };

  useEffect(() => {
    getAvailableIngredients();
  }, [allIngredients]);

  return availableIngredients ? (
    <div className="form">
      <select onChange={ingredientHandler} defaultValue="" required>
        <option disabled value="">
          Escoge un ingrediente
        </option>
        {availableIngredients.map((ingredient, index) => {
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
      <p className="btn" onClick={submitFunc}>
        Agregar
      </p>
    </div>
  ) : null;
};
