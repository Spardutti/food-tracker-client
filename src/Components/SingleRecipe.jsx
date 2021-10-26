import { useState, useEffect, useContext } from "react";
import { deleteRecipe, dislikeRecipe, getRecipe } from "../api/recipe";
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
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [newIngredients, setNewIngredients] = useState([]);
  const [addNewIngredient, setAddNewingredient] = useState(false);
  const [render, setRender] = useState(false);
  const [liked, setLiked] = useState();
  const [rating, setRating] = useState();
  const [edit, setEdit] = useState(false);
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  const { user } = useContext(userContext);

  /* GET RECIPE INFO */
  const getRecipeInfo = async (id) => {
    setRecipeInfo(await getRecipe(id));
    setNewIngredients(await getAllIngredients());
  };

  useEffect(() => {
    const id = params.get("id");
    getRecipeInfo(id);
  }, []);

  /*   useEffect(() => {
    console.log(recipeInfo);
  }, [recipeInfo]); */

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

  /* LIKE DISLIKE RENDER*/
  const LikeDislike = () => {
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

  /* EDIT/DELETE FOR AUTHOR ONLY */
  const EditRecipe = () => {
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

  /* REMOVE RECIPE INGREDIENT */
  const removeIngredient = async (e) => {
    const ingredientId = e.target.id;
    const response = await removeRecipeIngredient(recipeInfo._id, ingredientId);
    if (response) setRecipeIngredients(response.ingredients);
  };

  /* ADD NEW INGREDIENT */
  const toggleIngredientForm = () => {
    setAddNewingredient(!addNewIngredient);

    let ingredientsNotYetInRecipe = newIngredients.filter((elem) =>
      recipeIngredients.every((elem2) => elem2.ingredient._id !== elem._id)
    );
    setNewIngredients(ingredientsNotYetInRecipe);
  };

  /* INGREDIENTS TABLE */
  const IngredientsTable = () => {
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
          {recipeIngredients.map((ingredient, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>{ingredient.ingredient.name}</td>
                  <td>{ingredient.quantity}</td>
                  <td>{ingredient.unit}</td>
                  {edit && (
                    <td
                      id={ingredient.ingredient._id}
                      onClick={removeIngredient}
                    >
                      x
                    </td>
                  )}
                </tr>
              </tbody>
            );
          })}
        </table>
        {addNewIngredient ? <IngredientsDropdown arr={newIngredients} /> : null}
        {edit && (
          <p className="btn add-ingredient" onClick={toggleIngredientForm}>
            add ingredient
          </p>
        )}
      </div>
    );
  };

  return render ? (
    <div className="recipe-container">
      <div className="tittle">
        <h3>{recipeInfo.name}</h3>
        <p>Creado Por: {recipeInfo.author.username}</p>
        <p>Calificacion {rating}</p>
        <LikeDislike />
        <EditRecipe />
        <hr />
      </div>
      <div className="ingredients">
        <h5>Ingredientes</h5>
        <IngredientsTable />
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
