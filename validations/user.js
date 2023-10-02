const joi = require("joi");
const validations = require("../helpers/validations");

exports.validateLoginData = (user) => {
  const userSchema = joi.object({
    email: validations.joiEmail,
    password: validations.joiText(3, 90),
  });
  const validate = userSchema.validate(user);

  return {
    error: validate.error,
  };
};
exports.validate = (user) => {
  const userSchema = joi.object({
    name: validations.joiName,
    email: validations.joiEmail,
    password: validations.joiText(8, 20),
  });
  const validate = userSchema.validate(user);

  return {
    error: validate.error,
  };
};
exports.validateUpdatePayload = (user) => {
  const userSchema = joi.object({
    id: validations.joiId,
    name: validations.joiName,
    email: validations.joiEmail,
  });
  const validate = userSchema.validate(user);

  return {
    error: validate.error,
  };
};
