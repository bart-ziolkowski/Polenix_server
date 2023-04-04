const { User } = require("../../database/models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { AuthenticationError } = require("apollo-server-express");

const verifyToken = async (token) => {
  try {
    if (!token) return null;
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    throw new AuthenticationError(error.message);
  }
};

module.exports = async ({ req }) => {
  const token = (req.headers && req.headers.authorization) || "";
  const user = await verifyToken(token);
  return { user };
};