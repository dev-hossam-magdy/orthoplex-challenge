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

module.exports = checkInt
