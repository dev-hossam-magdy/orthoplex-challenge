const insertError = {
  status: "error",
  code: 500,
  msg: "cannot inerts data",
};
const insertSuccess = {
  status: "success",
  code: 201,
  msg: "data inserted",
};

const duplicatedData = {
  status: "error",
  code: 409,
  msg: "duplicated data",
};
const invalidDataResponse = (errorDetails) => {
  return {
    code: 400,
    status: "error",
    msg: "invalid data bad request",
    errorDetails,
  };
};

const itemNotFound = {
  code: 404,
  status: "error",
  msg: "item not found",
};

const loginSuccess = {
  status: "success",
  code: 200,
  msg: "login success",
};

const unauthorized = {
  status: "error",
  code: 401,
  msg: "unauthorized",
};
const internalServerError = {
  status: "error",
  code: 500,
  msg: "server error",
};
module.exports = {
  insertError,
  insertSuccess,
  duplicatedData,
  invalidDataResponse,
  itemNotFound,
  loginSuccess,
  unauthorized,
  internalServerError
};
