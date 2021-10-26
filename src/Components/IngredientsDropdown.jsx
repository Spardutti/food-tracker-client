export const IngredientsDropdown = (props) => {
  const {
    arr,
    ingredientValue,
    ingredientHandler,
    quantity,
    quantityHandler,
    unit,
    unitHandler,
  } = props;

  return (
    <div>
      <select onChange={ingredientHandler} value={ingredientValue}>
        <option defaultValue="">Escoge un ingrediente</option>
        {arr.map((ingredient, index) => {
          return (
            <option value="" key={index}>
              {ingredient.name}
            </option>
          );
        })}
      </select>
      <div className="input-container">
        <input
          type="text"
          required
          autoComplete="off"
          onChange={quantityHandler}
          value={quantity}
        />
        <label htmlFor="">Cantidad</label>
      </div>
      <div className="input-container">
        <select name="" id="" onChange={unitHandler} value={unit}>
          <option value=""></option>
          <option value="Grs">Grs.</option>
          <option value="Ml">Ml.</option>
        </select>
      </div>
    </div>
  );
};
