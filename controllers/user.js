const userValidation = require("../validations/user");
const userService = require("../services/user");
const constants = require("../util/constants");

exports.login = async (request, response) => {
  const user = { ...request.body };

  const validationError = userValidation.validateLoginData(user).error;
  if (validationError) {
    const res = constants.invalidDataResponse(validationError);
    return response.status(res.code).json(res);
  }
  const results = await userService.login(user);

  return response.status(results.code).json(results);
};

exports.add = async (request, response) => {
  const user = { ...request.body };

  const validationError = userValidation.validate(user).error;

  if (validationError) {
    const res = constants.invalidDataResponse(validationError);
    return response.status(res.code).json(res);
  }

  const insertResult = await userService.add(user);

  return response.status(insertResult.code).json(insertResult);
};

exports.delete = async (request, response) => {
  const userId = request.params.userId;

  const deleteResult = await userService.delete(userId);

  return response.status(deleteResult.code).json(deleteResult);
};

exports.update = async (request, response) => {
  const user = { ...request.body };
  user.id = request.params.userId;

  const validationError = userValidation.validateUpdatePayload(user).error;
  if (validationError) {
    const res = constants.invalidDataResponse(validationError);
    return response.status(res.code).json(res);
  }

  const updateResult = await userService.update(user);

  return response.status(updateResult.code).json(updateResult);
};
