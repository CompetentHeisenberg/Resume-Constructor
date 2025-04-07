import React from "react";

const InputReg = ({
  style,
  type = "text",
  name,
  value = "",
  onChange,
  help,
  required = false,
  ...props
}) => {
  return (
    <input
      className={style}
      placeholder={help}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      {...props}
    />
  );
};

export default InputReg;
