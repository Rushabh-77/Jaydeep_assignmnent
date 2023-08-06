const mongoose = require("mongoose");

const UserData = new mongoose.Schema(
  {
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    shipping_address: {
      type: String
    },
    user_image: {
      type: String
    }
  },  { timestamps: true });

exports.userData = mongoose.model('userData', UserData, 'userData');