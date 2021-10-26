import { useState, useEffect } from "react";

export const IngredientsDropdown = (props) => {
  const { ingredients, valueKey, onChangeKey } = props;

  return (
    <select onChange={onChangeKey} value={valueKey}>
      {ingredients.map((ingredient, index) => {
        return (
          <option value={ingredient._id} key={index}>
            {ingredient.name}
          </option>
        );
      })}
    </select>
  );
};
