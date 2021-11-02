import { useState } from "react/cjs/react.development";
import { addNewComment } from "../../api/recipe";

export const AddRecipeComment = ({ recipeInfo, setRecipeComments }) => {
  const [addCommentForm, setAddCommentForm] = useState(false);
  const [commentText, setCommentText] = useState("");

  /* TEXT HANDLER */
  const commentTextHandler = (e) => {
    setCommentText(e.target.value);
  };

  /* ADD COMMENT TO RECIPE */
  const addComment = async () => {
    const response = await addNewComment(recipeInfo._id, commentText);
    if (response.status === 500) alert("Something went wrong");
    setRecipeComments(response.comments);
    setAddCommentForm(false);
    setCommentText("");
  };

  /* TOGGLE COMMENT FORM */
  const toggleForm = () => {
    setAddCommentForm(!addCommentForm);
  };

  return (
    <div className="comment-container">
      <p className="btn" onClick={toggleForm}>
        Add Comment
      </p>
      {addCommentForm ? (
        <div className="form">
          <div className="input-container">
            <input
              type="text"
              onChange={commentTextHandler}
              value={commentText}
            />
            <label htmlFor="">Escribe un comentario</label>
          </div>
          <div>
            <p className="btn" onClick={addComment}>
              Agregar
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
