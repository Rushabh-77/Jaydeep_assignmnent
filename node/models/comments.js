const mongoose = require("mongoose");

const CommentData = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userData"
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "productData"
        },
        rating: {
            type: String
        },
        text: {
            type: String
        },

    }, { timestamps: true });

exports.commentData = mongoose.model('CommentData', CommentData, 'CommentData');