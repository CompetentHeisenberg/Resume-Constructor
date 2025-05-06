export const validatePassword = (password) => {
  return (
    password.length > 7 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password)
  );
};
