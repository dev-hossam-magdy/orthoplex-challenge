const userQueries = require("../db/queries/user");
const constants = require("../util/constants");
const trans = require("../helpers/transform");
const checkPassword = require("../helpers/check-password");
const hashing = require("../helpers/hashing");
const token = require("../helpers/token");
var randomstring = require("randomstring");
exports.login = async (user) => {
  const whereCluse = trans.addCondations({
    email: user.email,
  });
  const selectOneResult = await userQueries.selectOne(whereCluse);
  if (selectOneResult[0] == null) {
    return constants.itemNotFound;
  }
  user.storedPassword = selectOneResult[0].password;
  user.userId = selectOneResult[0].id;

  let isCorrectPassword = await checkPassword(
    `${user.password}${selectOneResult[0].password_salt}`,
    user.storedPassword
  );

  console.log(isCorrectPassword);
  if (!isCorrectPassword) {
    return constants.unauthorized;
  }
  const results = await token.getToken({
    email: user.email,
    userId: user.userId,
  });
  if (results) {
    return { ...constants.loginSuccess, token: results };
  } else {
    return constants.internalServerError;
  }
};

exports.add = async (user) => {
  const checkEmailDuplication = await userQueries.selectOne({
    email: user.email,
  });

  if (checkEmailDuplication[0] != null) {
    return constants.duplicatedData;
  }

  const passwordSalt = randomstring.generate(10);

  user.passwordSalt = passwordSalt;

  const hashedPassword = hashing.getHashedText(
    `${user.password}${user.passwordSalt}`
  );

  user.hashedPassword = hashedPassword;
  user.id = trans.transform();

  const queryResults = await userQueries.insert(user);
  if (queryResults === false) {
    return constants.insertError;
  }
  return constants.insertSuccess;
};
