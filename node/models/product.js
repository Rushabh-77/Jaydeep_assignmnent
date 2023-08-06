const mongoose = require("mongoose");

const ProductData = new mongoose.Schema(
    {
        title: {
            type: String
        },
        description: {
            type: String
        },
        quantity: {
            type: Number
        },
        shipping_cost: {
            type: Number
        },
        image: {
            type: String
        },
        price: {
            type: Number
        }
    }, { timestamps: true });

exports.productData = mongoose.model('productData', ProductData, 'productData');