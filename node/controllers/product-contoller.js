const db = require("../models");

exports.getProducts = async (req, res, next) => {
    try {
        let prodResponse = await db.Products.findAll();
        if (!prodResponse) throw new Error(404, "Prodcuts Not Found");
        return res.status(200).send({ message: "Success", data: { prodResponse } });
    } catch (error) {
        console.log("error", error);
        next(error);
    }
};