const { commentData } = require("../models/comments");

exports.createComments = async (req, res, next) => {
    let { _id } = req.userData
    try {
        let reviewObj = {
            product_id: req.body.product_id,
            text: req.body.text,
            rating: req.body.rating,
            user_id: _id
        }
        let commentResponse = await commentData.create(reviewObj)
        return res.status(200).send({ message: "Success" });
    }
    catch (error) {
        console.log("error", error);
        next(error);
    }
}