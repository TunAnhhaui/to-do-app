const User = require("../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const secretKey = process.env.JWT_SECRET;

// APi đăng kí
async function registerUser(req, res) {
  let { firstName, lastName, username, password } = req.body;

  try {
    const duplicate = await User.find({ username });

    if (duplicate && duplicate.length > 0) {
      return res.status(400).send({ message: "Tài khoản đã được sử dụng" });
    }

    let user = new User({ firstName, lastName, username, password });
    await user.save();

    res.status(201).send({ message: "Đăng ký thành công" });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

//API đăng nhập
async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send({ message: "Tài khoản không tồn tại" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(404).send({ message: "Mật khẩu không chính xác" });
    }

    let token = jwt.sign({ userId: user?._id }, secretKey, {
      expiresIn: "7d",
    });

    let finalData = {
      userId: user?._id,
      username: user?.username,
      firstName: user?.firstName,
      lastName: user?.lastName,
      token,
    };

    res.send(finalData);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

const AuthController = { registerUser, loginUser };

module.exports = AuthController;
