import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Range = ({ label, selector, name, update, min, max, step }) => {
  const value = useSelector(selector);
  const dispatch = useDispatch();

  return (
    <div>
      <label htmlFor={name}>
        {label} - {value}
      </label>
      <input
        id={name}
        type="range"
        onChange={(event) =>
          dispatch(update({ name, value: event.target.value }))
        }
        {...{ value, min, max, step }}
      />
    </div>
  );
};

export default Range;
