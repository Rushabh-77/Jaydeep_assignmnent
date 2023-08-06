const mongoose = require("mongoose");
// const CONFIG = require("../config");

module.exports = () => {
    mongoose.connect("mongodb+srv://rushabh:AYPVugL7bhHhfO6Z@cluster0.man6zh8.mongodb.net/Jaydeep")
        .then(() => console.log("Database Connected Successfully"))
        .catch((error) => console.log("Error while connecting Database ==>", error));
}