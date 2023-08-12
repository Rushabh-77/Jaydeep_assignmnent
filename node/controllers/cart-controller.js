const { cartData } = require("../models/cart");
const { orderData } = require("../models/order");

exports.addToCart = async (req, res, next) => {
    try {
        let { _id } = req.userData
        let { quantity, productId } = req.body
        let getUserCart = await cartData.findOne({
            user_id: _id,
            product_id: productId,

        })

        let cartObj = {
            user_id: _id,
            product_id: productId,
            quantities: quantity
        }

        if (getUserCart) {
            cartObj.quantities = getUserCart.quantities + quantity
            let cartResponse = await cartData.update(cartObj,
                {
                    user_id: _id,
                    product_id: productId,
                });
        }
        else {
            let cartResponse = await cartData.create(cartObj);
        }

        // if (!prodResponse) throw new Error(404, "Not Found");
        return res.status(200).send({ message: "Success" });
    } catch (error) {
        console.log("error", error);
        next(error);
    }
};


exports.getCart = async (req, res, next) => {
    let { _id } = req.userData
    try {
        const cartResponse = await cartData.find({ user_id: _id })
            .populate({
                path: 'product_id',
                select: 'title price image',
                as: 'product'
            }).exec();

        return res.status(200).send({ message: "Success", data: { cartResponse } });
    } catch (error) {
        console.log("error", error);
        next(error);
    }
};


exports.createOrder = async (req, res, next) => {
    try {
        let { _id } = req.userData
        for (const item of req.body.cartItems) {
            await orderData.create({
                user_id: id,
                product_id: item.product_id,
                quantity: item.quantities,
                price: item.price,
                order_created_at: item.createdAt,
                order_updated_at: item.updatedAt,
            });
        }
        let deleterCart = await orderData.destroy({
            user_id: _id
        })
        return res.status(200).send({ message: "Cart data has been stored" });
    } catch (error) {
        console.error('Error storing cart data in the Order table:', error);
        next(error)
    }
};

