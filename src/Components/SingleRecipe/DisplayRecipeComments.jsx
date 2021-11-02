import { useState } from "react/cjs/react.development";
import { deleteComment, editCommentText } from "../../api/recipe";
import Moment from "moment";

export const DisplayRecipeComments = ({
  comment,
  setRecipeComments,
  recipeInfo,
  user,
}) => {
  const [editComment, setEditComment] = useState(false);
  const [newComment, setNewComment] = useState(comment.text);

  const commentTextHandler = (e) => {
    setNewComment(e.target.value);
  };

  /* TOGGLE COMMENT EDIT */
  const toggleComment = (e) => {
    setEditComment(!editComment);
  };

  /* DELETE COMMENT FROM RECIPE */
  const deleteRecipeComment = async (e) => {
    const commentId = e.target.id;
    const response = await deleteComment(recipeInfo._id, commentId);
    if (response.status === 500) alert("Error");
    setRecipeComments(response.comments);
  };

  /* EDIT COMMENT TEXT */
  const editRecipeComment = async (e) => {
    const commentId = e.target.id;
    const response = await editCommentText(
      recipeInfo._id,
      commentId,
      newComment
    );

    if (response.status === 500) alert("Error");
    setRecipeComments(response.comments);
    setEditComment(false);
  };

  return (
    <div className="comment-container">
      <div className="text">
        <p>{comment.text}</p>
      </div>
      <div className="info">
        <div>
          <p>{comment.username}</p>
          <p>{comment.dateCreated}</p>
        </div>

        {comment.author === user._id ? (
          <div>
            <p id={comment._id} onClick={deleteRecipeComment}>
              borrar
            </p>
            {editComment ? (
              <div>
                <input
                  type="text"
                  value={newComment}
                  onChange={commentTextHandler}
                />
                <p id={comment._id} className="btn" onClick={editRecipeComment}>
                  edit
                </p>
                <p className="btn" onClick={toggleComment}>
                  cancel
                </p>
              </div>
            ) : (
              <p onClick={toggleComment}>editar</p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
