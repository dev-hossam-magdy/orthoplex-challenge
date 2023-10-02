const sqlFun = require("../config/sql-fun");
const userTableName = require("../../util/database-tables-name").userTableName;

exports.selectOne = async (whereCluse) => {
  try {
    const queryResults = await sqlFun.limitedSelect(
      userTableName,
      ["name", "password_salt", "password", "is_deleted"],
      whereCluse,
      1
    );

    return queryResults;
  } catch (error) {
    console.log(error);
    return false;
  }
};
exports.checkDuplication = async (user) => {
  try {
    const queryResults = await sqlFun.checkDuplicatedDataByUpdate(
      userTableName,
      "id",
      user.id,
      { email: user.email }
    );

    return queryResults;
  } catch (error) {
    console.log(error);
    return false;
  }
};

exports.insert = async (user) => {
  try {
    await sqlFun.insert(userTableName, {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.hashedPassword,
      password_salt: user.passwordSalt,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

exports.delete = async (userId) => {
  try {
    await sqlFun.delete(userTableName, {
      id: userId,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
exports.update = async (user) => {
  try {
    await sqlFun.update(
      userTableName,
      {
        name: user.name,
        email: user.email,
      },
      {
        id: user.id,
      }
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
