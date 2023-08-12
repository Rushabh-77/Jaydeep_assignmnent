const userAuth = require("../middleware/userAuth");
const { RESPONSE_CODES, RESPONSE_MESSAGES, RESPONSES } = require("../helpers/errors/ResponseCodes");
const CustomError = require("../helpers/errors/CustomError");
const { userData } = require("../models/users");

exports.userLogin = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let jwtToken;
    let userResponse = await userData.findOne({
      email: email
    });
    if (!userResponse) throw new CustomError(RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.NOT_FOUND);
    if (userResponse.password !== password) throw new CustomError(RESPONSE_CODES.UNPROCESSABLE_ENTITY, RESPONSE_MESSAGES.PASSWORD.INCORRECT)
    jwtToken = userAuth.generateAccessToken(userResponse.email);
    if (jwtToken) res.status(RESPONSE_CODES.SUCCESS).send({ ...RESPONSES.SUCCESS, data: { token: jwtToken } });
  } catch (error) {
    console.log("Login error", error);
    next(error);
  }
};


exports.userRegister = async (req, res, next) => {

  console.log("->>>>>>>>.", req.body);
  const {
    first_name,
    email,
    password,
    shipping_address,
    user_image
  } = req.body;

  try {
    if (!first_name || !shipping_address || !email || !password) {
      throw new CustomError(RESPONSE_CODES.UNPROCESSABLE_ENTITY, RESPONSE_MESSAGES.MISSING_BODY)
    }

    const userResposne = await userData.findOne({
      email: email
    })
    if (userResposne) {
      throw new CustomError(RESPONSE_CODES.UNPROCESSABLE_ENTITY, RESPONSE_MESSAGES.ALREADY_EXIST);
    }
    else {
      let userObj = {
        first_name: first_name,
        shipping_address: shipping_address,
        email: email,
        password: password
      }
      const createUserResp = await userData.create(userObj)
      res.status(RESPONSE_CODES.ACCEPTED).json({ ...RESPONSES.CREATED });
    }
  } catch (error) {
    next(error)
  }
}