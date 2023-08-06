module.exports = app => {
    const reviewController = require("../controllers/review-controller");
    // const webController = require("../controllers/website-controller");

    var router = require("express").Router();



    // router.post("/addToCart", reviewController.addToCart);
    router.get("/getReviews", reviewController.getReviews);
    router.post("/createReview", reviewController.createReviews);





    app.use('/api/review', router);
};

