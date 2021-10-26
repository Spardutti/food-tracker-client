import { useState, useEffect } from "react";



export const IngredientsDropdown = (props) => {
  const { ingredients, valueKey, onChangeKey } = props;

  

  return (
    <select onChange={onChangeKey} value={ valueKey }>
      {ingredients.map((ingredient, index) => {
        return (
          <option value= "" key={index}>
            {ingredient.ingredient.name}
          </option>
        );
      })}
    </select>
  );
};
