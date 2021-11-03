import { useState, useEffect, useContext } from "react";
import { getRecipe, updateRecipeName } from "../../api/recipe";
import { userContext } from "../../context/userContext";
import Spinner from "../styled/Spinner";
import { LikeDislike } from "./LikeDislike";
import { EditDelete } from "./EditDelete";
import { IngredientsTable } from "./IngredientsTable";
import { AddRecipeComment } from "./AddRecipeComment";
import { DisplayRecipeComments } from "./DisplayRecipeComments";

export const SingleRecipe = (props) => {
  /* STATES */
  const [recipeInfo, setRecipeInfo] = useState();
  const [recipeName, setRecipeName] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [addNewIngredient, setAddNewingredient] = useState(false);
  const [render, setRender] = useState(false);
  const [liked, setLiked] = useState();
  const [rating, setRating] = useState();
  const [edit, setEdit] = useState(false);

  const [recipeComments, setRecipeComments] = useState([]);

  /* CONTEXT */
  const { user } = useContext(userContext);

  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);

  const nameHandler = (e) => {
    setRecipeName(e.target.value);
  };

  /* GET RECIPE INFO */
  const getRecipeInfo = async (id) => {
    const recipe = await getRecipe(id);
    setRecipeInfo(recipe);
    setRecipeName(recipe.name);
    setRecipeComments(recipe.comments);
  };

  useEffect(() => {
    /* GET RECIPE ID */
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
        <LikeDislike
          recipeInfo={recipeInfo}
          setLiked={setLiked}
          setRating={setRating}
          rating={rating}
          liked={liked}
        />
        <EditDelete
          recipeInfo={recipeInfo}
          setEdit={setEdit}
          setAddNewingredient={setAddNewingredient}
          edit={edit}
          user={user}
        />
        <hr />
      </div>
      <div className="ingredients">
        <h5>Ingredientes</h5>
        <IngredientsTable
          setAddNewingredient={setAddNewingredient}
          addNewIngredient={addNewIngredient}
          setRecipeIngredients={setRecipeIngredients}
          recipeInfo={recipeInfo}
          edit={edit}
          recipeIngredients={recipeIngredients}
        />
      </div>
      <div className="instructions">
        <h5>Preparacion</h5>
        <p>{recipeInfo.instructions}</p>
      </div>
      <AddRecipeComment
        recipeInfo={recipeInfo}
        setRecipeComments={setRecipeComments}
      />
      <div className="comments-container">
        {recipeComments.map((comment, index) => {
          return (
            <DisplayRecipeComments
              key={index}
              comment={comment}
              recipeInfo={recipeInfo}
              setRecipeComments={setRecipeComments}
              user={user}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <Spinner />
  );
};
