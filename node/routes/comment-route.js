module.exports = app => {
    const commentController = require("../controllers/comment-controller");
    // const webController = require("../controllers/website-controller");

    var router = require("express").Router();



    router.get("/getCommnents", commentController.getComments);
    router.post("/createComments", commentController.createComments);





    app.use('/api/comment', router);
};

