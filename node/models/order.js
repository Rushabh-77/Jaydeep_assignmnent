const mongoose = require("mongoose");

const OrderData = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userData"
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "productData"
        },
        quantity: {
            type: Number
        },
        price: {
            type: Number
        },
        order_created_at: {
            type: Date
        },
        order_updated_at: {
            type: Date
        }
    }, { timestamps: true });

exports.orderData = mongoose.model('OrderData', OrderData, 'OrderData');