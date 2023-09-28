const bcrypt = require("bcrypt");

checkPassword = async (password, storedPassword) => {
  console.log(password);
  console.log(storedPassword);
  const results = bcrypt.compareSync(password, storedPassword);
  return results;
};

module.exports = checkPassword;
