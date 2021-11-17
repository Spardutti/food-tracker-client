import { deleteRecipe } from "../../api/recipe";
import { useHistory } from "react-router";

export const EditDelete = ({
  recipeInfo,
  setEdit,
  setAddNewingredient,
  edit,
  user,
}) => {
  const history = useHistory();
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
