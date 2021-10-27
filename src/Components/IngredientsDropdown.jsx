export const IngredientsDropdown = (props) => {
  const {
    arr,
    ingredientHandler,
    quantity,
    quantityHandler,
    unitHandler,
    submitAction,
  } = props;

  return (
    <div className="form">
      <select onChange={ingredientHandler} defaultValue="" required>
        <option disabled value="">
          Escoge un ingrediente
        </option>
        {arr.map((ingredient, index) => {
          return (
            <option value={ingredient._id} key={index}>
              {ingredient.name}
            </option>
          );
        })}
      </select>
      <div className="input-container">
        <input
          type="number"
          required
          autoComplete="off"
          onChange={quantityHandler}
          value={quantity}
        />
        <label htmlFor="">Cantidad</label>
      </div>
      <div className="input-container">
        <select onChange={unitHandler} defaultValue="" required>
          <option value="" disabled>
            Escoge tipo de unidad
          </option>
          <option value="Grs">Grs.</option>
          <option value="Ml">Ml.</option>
        </select>
      </div>
      <p className="btn" onClick={submitAction}>
        Add
      </p>
    </div>
  );
};
