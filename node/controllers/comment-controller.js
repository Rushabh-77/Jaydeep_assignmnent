const { commentData } = require("../models/comments");


exports.getComments = async (req, res) => {
    try {
        let { _id } = req.userData
        if(_id){
            const { productId } = req.params;
            const comments = await commentData.find({ product_id: productId });
    
            return res.status(200).send({ message: "Success", data: { comments } });
        }
        else{
            return res.status(422).send({ message: "User Not logged in" });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments.' });
    }
};


exports.createComments = async (req, res, next) => {
    let { _id } = req.userData
    try {
        let reviewObj = {
            product_id: req.body.product,
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