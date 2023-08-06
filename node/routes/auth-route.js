module.exports = app => {
	const authController = require("../controllers/auth-controller");

	var router = require("express").Router();

	
	// Login API Routes
	router.post("/login", authController.userLogin);
	router.post("/register", authController.userRegister);



	// Forgot Password Routes
	// router.post("/forgotPassword", checkDomain, authController.forgetPassword);
	// router.get("/resetPassword", checkDomain, authController.resetPassword);
	// router.post("/updatePassword", checkDomain, authController.updatePassword);


	app.use('/', router);
};

