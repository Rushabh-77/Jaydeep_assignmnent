module.exports = app => {
	const userController = require("../controllers/user-controller");
	// const webController = require("../controllers/website-controller");

	var router = require("express").Router();



	router.get("/getUserProfile", userController.getUserProfile);
	router.put("/updateUserProfile", userController.updateUserProfile);





	app.use('/api/user', router);
};

