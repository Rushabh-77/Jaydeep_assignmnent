const db = require("../models");

exports.addToCart = async (req, res, next) => {
    try {
        let { id } = req.userData
        let productId = req.body.id
        let quantity = req.body.quantity
        let getUserCart = await db.Cart.findOne({
            where: {
                user_id: id,
                product_id: productId,
            }
        })
        let cartObj = {
            user_id: id,
            product_id: productId,
            quantities: quantity
        }

        if (getUserCart) {
            cartObj.quantities = getUserCart.quantities + quantity
            let cartResponse = await db.Cart.update(cartObj,
                {
                    where: {
                        user_id: id,
                        product_id: productId,
                    }
                });
        }
        else {
            let cartResponse = await db.Cart.create(cartObj);
        }

        // if (!prodResponse) throw new Error(404, "Not Found");
        return res.status(200).send({ message: "Success" });
    } catch (error) {
        console.log("error", error);
        next(error);
    }
};


exports.getCart = async (req, res, next) => {
    let { id } = req.userData
    try {
        let cartResponse = await db.Cart.findAll({
            where: {
                user_id: id
            },
            include: [
                {
                    model: db.Products,
                    attributes: ["title", "price", "image"],
                }
            ]
        });

        if (!cartResponse) throw new Error(404, "Cart Not Found");
        const processedCartResponse = cartResponse.map((cartItem) => {
            const product = cartItem.products[0]; // Assuming there is only one product in the array

            return {
                ...cartItem.dataValues,
                title: product.title,
                price: product.price,
                image: product.image,

            };
        });

        return res.status(200).send({ message: "Success", data: { processedCartResponse } });
    } catch (error) {
        console.log("error", error);
        next(error);
    }
};


exports.createOrder = async (req, res, next) => {
    try {
        let { id } = req.userData
        for (const item of req.body.cartItems) {
            await db.Orders.create({
                user_id: id,
                product_id: item.product_id,
                quantity: item.quantities,
                price: item.price,
                order_created_at: item.createdAt,
                order_updated_at: item.updatedAt,
            });
        }
        let deleterCart = await db.Cart.destroy({
            where: { user_id: id, }
        })
        return res.status(200).send({ message: "Cart data has been stored" });
    } catch (error) {
        console.error('Error storing cart data in the Order table:', error);
    }
};

