// Services
const logsService = require("../services/logs");

exports.log = async (request, response, next) => {
  const { url, body, method } = request;
  const token = request.headers.Authorization || "";

  logsService.log({
    endPoint: url,
    body,
    method,
    token,
  });

  next();
};
