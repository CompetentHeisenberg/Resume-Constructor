import React from "react";

function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const computedClassName = `${className} ${variant} ${size}`.trim();

  return (
    <button className={computedClassName} {...props}>
      {children}
    </button>
  );
}

export default Button;
