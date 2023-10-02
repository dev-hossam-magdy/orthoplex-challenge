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

exports.getOne = async (request, response) => {
  const userId = request.params.userId;

  const user = await userService.getOne(userId);
  return response.status(user.code).json(user);
};
exports.getAll = async (request, response) => {
  const pageNumber = request.query.pageNumber || 1;
  const numberOfUsers = request.query.numberOfUsers || 5;

  if (+pageNumber < 1) {
    const res = constants.invalidDataResponse(
      "invalid page number. The page Number should be greater than 0"
    );
    return response.status(res.code).json(res);
  }
  if (+numberOfUsers < 1) {
    const res = constants.invalidDataResponse(
      "invalid number of users. The number of users should be greater than 0"
    );
    return response.status(res.code).json(res);
  }

  const users = await userService.getAll(pageNumber, numberOfUsers);
  return response.status(users.code).json(users);
};
