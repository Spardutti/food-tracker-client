import { useState, useEffect, useContext } from "react";
import {
  addIngredientRecipe,
  deleteRecipe,
  dislikeRecipe,
  getRecipe,
  updateRecipeName,
} from "../api/recipe";
import { userContext } from "../context/userContext";
import { likeRecipe } from "../api/recipe";
import { useHistory } from "react-router";
import Spinner from "../Components/styled/Spinner";
import { removeRecipeIngredient } from "../api/recipe";
import { IngredientsDropdown } from "./IngredientsDropdown";
import { getAllIngredients } from "../api/ingredient";

export const SingleRecipe = (props) => {
  const history = useHistory();
  const [recipeInfo, setRecipeInfo] = useState();
  const [recipeName, setRecipeName] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [newIngredients, setNewIngredients] = useState([]);
  const [addNewIngredient, setAddNewingredient] = useState(false);
  const [ingredientId, setIngredientId] = useState("");
  const [render, setRender] = useState(false);
  const [liked, setLiked] = useState();
  const [rating, setRating] = useState();
  const [edit, setEdit] = useState(false);
  const [ingredient, setIngredient] = useState("");
  const [qty, setQty] = useState("");
  const [unit, setUnit] = useState("");
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  const { user } = useContext(userContext);

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

  const nameHandler = (e) => {
    setRecipeName(e.target.value);
  };

  /* GET RECIPE INFO */
  const getRecipeInfo = async (id) => {
    const recipe = await getRecipe(id);
    setRecipeInfo(recipe);
    setNewIngredients(await getAllIngredients());
    setRecipeName(recipe.name);
  };

  useEffect(() => {
    const id = params.get("id");
    getRecipeInfo(id);
  }, []);

  /* WAIT FOR STATES BEFORE RENDERING */
  useEffect(() => {
    if (recipeInfo && user) {
      if (recipeInfo.rating.indexOf(user._id) > -1) setLiked(true);
      else setLiked(false);
      setRating(recipeInfo.rating.length);
      setRecipeIngredients(recipeInfo.ingredients);
      setRender(true);
    }
  }, [recipeInfo, user]);

  /* LIKE DISLIKE RENDER*/
  const LikeDislike = () => {
    /* LIKE RECIPE */
    const submitLike = async () => {
      await likeRecipe(recipeInfo._id);
      setLiked(true);
      setRating(rating + 1);
    };

    /* DISLIKE RECIPE */
    const dislike = async () => {
      await dislikeRecipe(recipeInfo._id);
      setLiked(false);
      setRating(rating - 1);
    };

    if (liked) {
      return (
        <div className="btn btn-like" onClick={dislike}>
          dislike
        </div>
      );
    } else {
      return (
        <div className="btn btn-like" onClick={submitLike}>
          like
        </div>
      );
    }
  };

  /* EDIT/DELETE FOR AUTHOR ONLY */
  const EditRecipe = () => {
    /* DELETE RECIPE */
    const removeRecipe = async () => {
      const response = await deleteRecipe(recipeInfo._id);
      if (response) {
        history.push("/home");
      }
    };

    /* EDIT RECIPE */
    const editRecipe = async () => {
      setEdit(!edit);
      setAddNewingredient(false);
    };

    if (recipeInfo.author._id === user._id) {
      return (
        <div className="edit-container">
          <p className="btn" onClick={editRecipe}>
            {edit ? "close" : "editar"}
          </p>
          <p className="btn" onClick={removeRecipe}>
            Borrar
          </p>
        </div>
      );
    } else return null;
  };

  /* CONST GET AVAILABLE INGREDIENTS */
  const getAvailableIngredients = () => {
    let ingredientsNotYetInRecipe = newIngredients.filter((elem) =>
      recipeIngredients.every((elem2) => elem2.ingredientId !== elem._id)
    );
    setNewIngredients(ingredientsNotYetInRecipe);
  };

  /* INGREDIENTS TABLE */
  const IngredientsTable = () => {
    /* NEW INGREDIENT FORM */
    const toggleIngredientForm = () => {
      setAddNewingredient(!addNewIngredient);
      //if (addNewIngredient && edit) setEdit(false);
      getAvailableIngredients();
    };

    /* REMOVE RECIPE INGREDIENT */
    const removeIngredient = async (e) => {
      const ingredientId = e.target.id;
      const response = await removeRecipeIngredient(
        recipeInfo._id,
        ingredientId
      );
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

  /* RESET INGREDIENT STATE */
  const resetIngredients = () => {
    setIngredientId("");
    setIngredient("");
    setQty("");
    setUnit("");
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

  /* UPDATE RECIPE NAME */
  const updateName = async () => {
    const response = await updateRecipeName(recipeInfo._id, recipeName);
    if (response.status !== 500) {
      setRecipeName(response.name);
      setEdit(false);
    } else {
      alert("Name already in use");
    }
  };

  return render ? (
    <div className="recipe-container">
      <div className="tittle">
        {edit ? (
          <div>
            <input type="text" value={recipeName} onChange={nameHandler} />
            <p className="btn" onClick={updateName}>
              cambiar
            </p>
          </div>
        ) : (
          <h3>{recipeName}</h3>
        )}
        <p>Creado Por: {recipeInfo.author.username}</p>
        <p>Calificacion {rating}</p>
        <LikeDislike />
        <EditRecipe />
        <hr />
      </div>
      <div className="ingredients">
        <h5>Ingredientes</h5>
        <IngredientsTable />
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
      <div className="instructions">
        <h5>Preparacion</h5>
        <p>{recipeInfo.instructions}</p>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};
