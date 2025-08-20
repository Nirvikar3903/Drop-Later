export const validateRegister = (username, email, password) => {
  if (!username || !email || !password) return "All fields are required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
};

export const validateLogin = (email, password) => {
  if (!email || !password) return "All fields are required";
  return null;
};


export const validateNote = ({ title, content }) => {
  if (!title || !content) {
    return { error: { details: [{ message: "Title and content are required" }] } };
  }
  if (title.length < 3) {
    return { error: { details: [{ message: "Title must be at least 3 characters" }] } };
  }
  return { error: null };
};
