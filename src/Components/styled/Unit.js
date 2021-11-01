import styled from "styled-components";

const units = ["gr", "ml", "kg", "unidad"];

export const Units = (props) => {
  return (
    <select onChange={props.unitHandler} defaultValue="" required>
      <option value="" disabled>
        Escoge tipo de unidad
      </option>
      {units.map((unit, index) => {
        return (
          <option key={index} value={unit}>
            {unit}
          </option>
        );
      })}
    </select>
  );
};
