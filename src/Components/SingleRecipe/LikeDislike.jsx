import { likeRecipe, dislikeRecipe } from "../../api/recipe";

export const LikeDislike = ({
  recipeInfo,
  setLiked,
  setRating,
  rating,
  liked,
}) => {
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
