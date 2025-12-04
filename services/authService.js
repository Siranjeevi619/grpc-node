const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

const toUserDto = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
});

const register = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    return {
      success: false,
      message: "Email already registered",
      token: "",
      user: null,
    };
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  const token = generateToken(user);

  return {
    success: true,
    message: "User registered successfully",
    token,
    user: toUserDto(user),
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
      token: "",
      user: null,
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return {
      success: false,
      message: "Invalid email or password",
      token: "",
      user: null,
    };
  }

  const token = generateToken(user);

  return {
    success: true,
    message: "Login successful",
    token,
    user: toUserDto(user),
  };
};

const verify = async ({ token }) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return {
        valid: false,
        message: "User not found",
        user: null,
      };
    }

    return {
      valid: true,
      message: "Token is valid",
      user: toUserDto(user),
    };
  } catch (err) {
    return {
      valid: false,
      message: "Invalid or expired token",
      user: null,
    };
  }
};

module.exports = {
  register,
  login,
  verify,
};
