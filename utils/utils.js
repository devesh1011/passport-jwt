const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const validPassword = async (password, hash) => {
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
};

const genPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

const issueToken = (user) => {
  const _id = user._id;
  const expiresIn = "1d";

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};

module.exports = {
  validPassword,
  genPassword,
  issueToken,
};
