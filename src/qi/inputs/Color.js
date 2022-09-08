import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Color = ({ label, selector, name, update }) => {
  const value = useSelector(selector);
  const dispatch = useDispatch();

  const type = "color";
  const onChange = (event) =>
    dispatch(update({ name, value: event.target.value }));

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input {...{ id: name, type, value, onChange }} />
    </div>
  );
};

export default Color;
