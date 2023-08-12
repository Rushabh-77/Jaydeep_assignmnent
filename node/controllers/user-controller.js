const userAuth = require("../middleware/userAuth");
const { RESPONSE_CODES, RESPONSE_MESSAGES, RESPONSES } = require("../helpers/errors/ResponseCodes");
const CustomError = require("../helpers/errors/CustomError");
const { userData } = require("../models/users");

exports.getUserProfile = async (req, res, next) => {
    try {
        let { _id } = req.userData
        let userResponse = await userData.findById({
            _id: _id
        });
        if (!userResponse) throw new CustomError(RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.NOT_FOUND);
        return res.status(RESPONSE_CODES.SUCCESS).send({ ...RESPONSES.SUCCESS, data: { token: userResponse } });
    } catch (error) {
        console.log("Login error", error);
        next(error);
    }
};


exports.updateUserProfile = async (req, res, next) => {
    try {
        const { _id } = req.userData; 
        const { first_name, shipping_address, email } = req.body; 

        const user = await userData.findById(_id);

        if (!user) {
            return res.status(RESPONSE_CODES.NOT_FOUND).json({ ...RESPONSES.NOT_FOUND });
        }

        user.first_name = first_name;
        user.shipping_address = shipping_address;
        user.email = email;

        await user.save();
        
        res.status(RESPONSE_CODES.ACCEPTED).json({ ...RESPONSES.UPDATED });
    } catch (error) {
        next(error);
    }
}
