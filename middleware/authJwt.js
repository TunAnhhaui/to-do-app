const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .send({ message: "Token không có hoặc không hợp lệ!" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res
        .status(403)
        .send({ message: " Token hết hạn hoặc không hợp lệ" });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
