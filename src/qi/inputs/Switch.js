import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Switch = ({ label, selector, name, update }) => {
  const checked = useSelector(selector);
  const dispatch = useDispatch();

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="checkbox"
        onChange={(event) => {
          dispatch(update({ name, value: event.target.checked }));
        }}
        {...{ checked }}
      />
    </div>
  );
};

export default Switch;
