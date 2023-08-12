const { productData } = require("../models/product");
const { commentData } = require("../models/comments");


exports.getProducts = async (req, res, next) => {
    try {
        let prodResponse = await productData.find();
        if (!prodResponse) throw new Error(404, "Prodcuts Not Found");
        return res.status(200).send({ message: "Success", data: { prodResponse } });
    } catch (error) {
        console.log("error", error);
        next(error);
    }
};

exports.getProductDetails = async (req, res, next) => {
    try {
        let id = req.params.id
        let prodResponse = await productData.findById(id);
        const comments = await commentData.find({ product_id: id });

        if (!prodResponse) throw new Error(404, "Prodcuts Not Found");
        return res.status(200).send({ message: "Success", data: { prodResponse, comments } });
    } catch (error) {
        console.log("error", error);
        next(error);
    }
};


//  For temporary use
// exports.cerateProducts = async (req, res, next) => {
//     try {
//         let obj = {
//             title: "test 5",
//             description: "test 5 description",
//             quantity: 1,
//             shipping_cost: 100,
//             image: "https://st.depositphotos.com/23751790/54571/i/600/depositphotos_545717712-stock-photo-sunset-taken-road.jpg",
//             price: 100
//         }
//         let prodResponse = await productData.create(obj);
//         return res.status(200).send({ message: "Success" });

//     } catch (error) {

//     }
// }


