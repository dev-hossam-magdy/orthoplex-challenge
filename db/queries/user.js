const sqlFun = require("../config/sql-fun");
const userTableName = require("../../util/database-tables-name").userTableName;

exports.selectOne = async (whereCluse) => {
  try {
    const queryResults = await sqlFun.limitedSelect(
      userTableName,
      ["name", "password_salt", "password"],
      whereCluse,
      1
    );

    return queryResults;
  } catch (error) {
    console.log(error);
    return false;
  }
};

exports.insert = async (user) => {
  try {
    const queryResults = await sqlFun.insert(userTableName, {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.hashedPassword,
      password_salt: user.passwordSalt,
    });
    return queryResults;
  } catch (error) {
    console.log(error);
    return false;
  }
};
