const bcrypt = require("bcrypt");

const getHashedText = (planText) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedText = bcrypt.hashSync(planText, salt);
  return hashedText;
};

module.exports = {
  getHashedText,
};
