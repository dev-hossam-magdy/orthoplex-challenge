const jwt = require("jsonwebtoken");
exports.getToken = async (tokenPayload) => {
  const secret = process.env.TOKEN_KEY;
  const token = jwt.sign(tokenPayload, secret, {
    // expiresIn: '10h'
  });
  return token;
};
