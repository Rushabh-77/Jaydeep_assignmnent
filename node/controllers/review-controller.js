const db = require("../models");

exports.getReviews = async (req, res, next) => {
    let { id } = req.userData
    try {
        let reviewResponse = await db.Comment.findAll({
            where: {
                user_id: id
            },
            include: [
                {
                    model: db.Products,
                    attributes: ["title"],
                },
                {
                    model: db.Users,
                    attributes: ["first_name"],
                }
            ]
        });

        if (!reviewResponse) throw new Error(404, "Review Not Found");

        const processedReviewResponse = reviewResponse.map((productItem) => {
            const product = productItem.products[0];
            const user = productItem.users[0];

            return {
                ...productItem.dataValues,
                title: product.title,
                user: user.first_name
            };
        });
        return res.status(200).send({ message: "Success", data: { processedReviewResponse } });
    } catch (error) {
        console.log("error", error);
        next(error);
    }
};



exports.createReviews = async (req, res, next) => {
    let { id } = req.userData
    try {
        let reviewObj = {
            product_id: req.body.product,
            text: req.body.text,
            rating: req.body.rating,
            user_id: id
        }
        let reviewResponse = await db.Comment.create(reviewObj)
        return res.status(200).send({ message: "Success" });
    }
    catch (error) {
        console.log("error", error);
        next(error);
    }
}