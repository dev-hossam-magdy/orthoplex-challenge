const jwt = require("jsonwebtoken");
const constants = require("../util/constants");

module.exports = (request, response, next) => {
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
    response.status(constants.tokenRequired.code).json(constants.tokenRequired);
  }
};
