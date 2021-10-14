export const RecipeCard = ({ name, image }) => {
  return (
    <div className="recipe-card-container">
      <img src={image} className="recipe-card-bg" alt="recipe" />
      <h1>{name}</h1>
    </div>
  );
};
