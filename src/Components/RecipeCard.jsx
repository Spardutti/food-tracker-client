import { Link, useHistory } from "react-router-dom";

export const RecipeCard = ({ name, image, instructions, id, rating }) => {
  const history = useHistory();

  const redirect = () => {
    history.push("/recipe?id=" + id);
  };

  return (
    <div className="recipe-card-container" onClick={redirect}>
      <h3>{name}</h3>
      <img src={image} className="recipe-card-bg" alt="recipe" />
      <p>{instructions}</p>
      <p>Calificacion {rating.length}</p>
    </div>
  );
};
