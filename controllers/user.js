const userValidation = require("../validations/user");
const userService = require("../services/user");
const constants = require("../util/constants");

exports.login = async (request, response) => {
  const { email, password } = request.body;

  const user = {
    email,
    password,
  };

  const validationError = userValidation.validateLoginData(user).error;
  if (validationError) {
    const res = constants.invalidDataResponse(validationError);
    return response.status(res.code).json(res);
  }
  const results = await userService.login(user);

  return response.status(results.code).json(results);
};

exports.add = async (request, response) => {
  const { name, email, password } = request.body;
  const user = {
    name,
    email,
    password,
  };

  const validationError = userValidation.validate(user).error;

  if (validationError) {
    const res = constants.invalidDataResponse(validationError);
    return response.status(res.code).json(res);
  }

  const insertResult = await userService.add(user);

  return response.status(insertResult.code).json(insertResult);
};
