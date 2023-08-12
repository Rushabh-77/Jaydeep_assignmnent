const jwt = require("jsonwebtoken");
const db = require("../models");
const { userData } = require("../models/users");
// const CONFIG = require("../config");
// const CustomError = require("../helpers/errors/CustomError");
// const { RESPONSE_CODES, RESPONSE_MESSAGES } = require("../helpers/errors/ResponseCodes");

exports.generateAccessToken = (email, expiresIn = "6h") => {
  return jwt.sign({ email }, "ecommerce", { expiresIn });
};

exports.authenticateAppUserToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new Error(422, "Token not found");
    }
    let user = jwt.verify(token, "ecommerce");
    if (!user.email) throw new Error(422, "Unauthorized");
    let appUser = await userData.findOne({
      email: user.email
    });
    if (!appUser) throw new Error(422, "Not Found");
    req.userData = appUser;
    next();
  } catch (error) {
    console.log("Errorrr", error);
    next(error);
  }
};


