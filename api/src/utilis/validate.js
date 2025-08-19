import * as yup from "yup";

export const validate = (schema) => async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      ...req.params,
      ...req.query,
    };

    await schema.validate(data, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({
      message: "Validation error",
      errors: err.errors,
    });
  }
};
