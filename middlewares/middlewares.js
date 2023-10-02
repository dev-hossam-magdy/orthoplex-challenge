const jwt = require("jsonwebtoken");
const constants = require("../util/constants");

function checkInt(paramName = "id") {
  return (request, response, next) => {
    const id = +request.params[paramName];

    if (Number.isFinite(id)) {
      next();
    } else {
      const res = constants.invalidDataResponse("id must be integer");
      response.status(res.code).json(res);
    }
  };
}

function checkAuth() {
  return (request, response, next) => {
    const authorization = request.headers.authorization;
    if (authorization) {
      const token = authorization.split(" ")[1];
      const secret = process.env.TOKEN_KEY;
      jwt.verify(token, secret, {}, (error, decodedToken) => {
        if (error) {
          response
            .status(constants.unauthorized.code)
            .json(constants.unauthorized);
        } else {
          request.decoded = decodedToken;
          next();
        }
      });
    } else {
      response
        .status(constants.tokenRequired.code)
        .json(constants.tokenRequired);
    }
  };
}

module.exports = {
  checkInt,
  checkAuth,
};
