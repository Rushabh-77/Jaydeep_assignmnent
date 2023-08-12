const { cartData } = require("../models/cart");
const { orderData } = require("../models/order");

exports.addToCart = async (req, res, next) => {
    try {
        const { _id } = req.userData;
        const { quantity, productId } = req.body;

        if (!productId || !quantity || quantity <= 0) {
            return res.status(400).send({ message: 'Invalid input data' });
        }

        let existingCartEntry = await cartData.findOne({
            user_id: _id,
            product_id: productId,
        });

        if (existingCartEntry) {
            existingCartEntry.quantities += quantity;
            await existingCartEntry.save();
        } else {
            await cartData.create({
                user_id: _id,
                product_id: productId,
                quantities: quantity,
            });
        }

        return res.status(200).send({ message: 'Product added to cart' });
    } catch (error) {
        console.error('Error adding product to cart:', error);
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

        return res.status(200).send({ message: "Success", cartResponse });
    } catch (error) {
        console.log("error", error);
        next(error);
    }
};


exports.updateCart = async (req, res, next) => {
    try {
        const { _id } = req.userData;
        const { quantity, productId } = req.body;

        // Validate quantity
        if (!quantity || quantity <= 0) {
            return res.status(400).send({ message: 'Invalid quantity' });
        }

        // Find existing cart entry
        let existingCartEntry = await cartData.findOne({
            user_id: _id,
            product_id: productId,
        });

        if (existingCartEntry) {
            existingCartEntry.quantities = quantity;
            await existingCartEntry.save();
        } else {
            console.log('No existing cart entry found');
        }

        return res.status(200).send({ message: 'Cart updated' });
    } catch (error) {
        console.error('Error updating cart:', error);
        next(error);
    }
};


exports.createOrder = async (req, res, next) => {
    try {
        let { _id } = req.userData
        for (const item of req.body.cartItems) {
            await orderData.create({
                user_id: _id,
                product_id: item.product_id,
                quantity: item.quantities,
                price: item.price,
                order_created_at: item.createdAt,
                order_updated_at: item.updatedAt,
            });
        }
        let deleterCart = await cartData.deleteOne({
            user_id: _id
        })
        return res.status(200).send({ message: "Cart data has been stored" });
    } catch (error) {
        console.error('Error storing cart data in the Order table:', error);
        next(error)
    }
};

