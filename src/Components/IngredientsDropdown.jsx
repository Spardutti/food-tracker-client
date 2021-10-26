export const IngredientsDropdown = (props) => {
  const { ingredients } = props;

  return (
    <select>
      {ingredients.map((ingredient, index) => {
        return (
          <option value="" key={index}>
            {ingredient.ingredient.name}
          </option>
        );
      })}
    </select>
  );
};
