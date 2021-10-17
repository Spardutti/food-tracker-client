import { Link } from "react-router-dom";

export const RecipeCard = ({ name, image, instructions, id, rating }) => {
  return (
    <Link
      className="recipe-card-container"
      id={id}
      to={{ pathname: "/recipes", state: { id } }}
    >
      <h3>{name}</h3>
      <img src={image} className="recipe-card-bg" alt="recipe" />
      <p>{instructions}</p>
      <p>Calificacion {rating.length}</p>
    </Link>
  );
};
