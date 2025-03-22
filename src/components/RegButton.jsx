import React from "react";

export default function Button({ style, type = "button", onClick, children }) {
  return (
    <button className={style} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
