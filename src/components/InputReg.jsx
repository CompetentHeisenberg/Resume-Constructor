import React from "react";

export default function InputReg({
  help,
  style,
  type = "text",
  name,
  value,
  onChange,
}) {
  return (
    <input
      className={style}
      type={type}
      placeholder={help}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}
