import React from "react";
import { useSelector, useDispatch } from "react-redux";

const onlyAllowDigits = (event) => {
  const { data } = event;

  debugger;

  if (!/\d/.test(data)) event.preventDefault();
};

const Amount = (props) => {
  const { label, selector, name, update, min, max } = props;

  if (!selector) debugger;

  const value = useSelector(selector);
  const dispatch = useDispatch();

  return (
    <div>
      <label htmlFor={name}>
        {label} {value}
      </label>
      <input
        id={name}
        type="number"
        onBeforeInput={onlyAllowDigits}
        onChange={(event) => {
          dispatch(update({ name, value: Number(event.target.value) }));
        }}
        {...{ value, min, max }}
      />
    </div>
  );
};

export default Amount;
