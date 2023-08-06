const mongoose = require("mongoose");

const CartData = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userData"
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "productData"
        },
        quantities: {
            type: Number
        },

    }, { timestamps: true });

exports.cartData = mongoose.model('CartData', CartData, 'CartData');