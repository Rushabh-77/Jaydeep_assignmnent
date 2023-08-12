module.exports = app => {
    const commentController = require("../controllers/comment-controller");
    // const webController = require("../controllers/website-controller");

    var router = require("express").Router();



    router.post("/createComments", commentController.createComments);

    app.use('/api/comment', router);
};

