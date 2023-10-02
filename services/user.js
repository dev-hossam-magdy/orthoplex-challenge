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
  const selectOneResult = await userQueries.selectOne(
    ["id", "password_salt", "password"],
    whereCluse
  );
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
  const checkEmailDuplication = await userQueries.selectOne(["is_deleted"], {
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

  const isAdded = await userQueries.insert(user);
  if (isAdded) {
    return constants.insertSuccess;
  }
  return constants.insertError;
};

exports.delete = async (userId) => {
  const selectOneResult = await userQueries.selectOne(["is_deleted"], {
    id: userId,
  });
  if (selectOneResult[0] == null) {
    return constants.itemNotFound;
  } else {
    console.log(selectOneResult[0].is_deleted);
    if (selectOneResult[0].is_deleted) {
      return constants.itemIsDeletedBefore;
    }

    const isItemDeleted = await userQueries.delete(userId);
    if (isItemDeleted) return constants.deleteSuccess;
    else return constants.deleteError;
  }
};

exports.update = async (user) => {
  const itemIsFound = await userQueries.selectOne(["is_deleted"], {
    id: user.id,
  });

  if (itemIsFound[0] == null) {
    return constants.itemNotFound;
  } else {
    if (itemIsFound[0].is_deleted) {
      return constants.itemIsDeletedBefore;
    }
  }

  const checkEmailDuplication = await userQueries.checkDuplication(user);

  if (checkEmailDuplication[0] != null) {
    return constants.duplicatedData;
  } else {
    const isUpdated = await userQueries.update(user);
    if (isUpdated) {
      return constants.updateSuccess;
    }
    return constants.updateError;
  }
};

exports.getOne = async (userId) => {
  const users = await userQueries.selectOne(["name", "email", "is_deleted"], {
    id: userId,
  });

  if (users[0] == null) {
    return constants.itemNotFound;
  } else if (users[0].is_deleted) {
    return constants.itemIsDeletedBefore;
  } else {
    users[0].code = constants.successCode;
    return users[0];
  }
};

exports.getAll = async (pageNumber, numberOfUsersPerPage) => {
  const offset = (pageNumber - 1) * numberOfUsersPerPage;

  const [users, selectCount] = await Promise.all([
    userQueries.selectAll(offset, numberOfUsersPerPage),
    userQueries.selectCountOfRecords(offset, numberOfUsersPerPage),
  ]);
  const numberOfPages = Math.ceil(
    selectCount[0].number_of_records / numberOfUsersPerPage
  );

  if (numberOfPages < pageNumber) {
    const res = constants.invalidDataResponse(
      `Invalid page number. The page number shouldn't be greater than ${numberOfPages}`
    );
    return res;
  }

  return {
    users,
    numberOfPages,
    code: constants.successCode,
  };
};
