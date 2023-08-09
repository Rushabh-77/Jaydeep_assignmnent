const { authenticateAppUserToken } = require("../middleware/userAuth");

module.exports = app => {
	const productController = require("../controllers/product-contoller");
	// const webController = require("../controllers/website-controller");

	var router = require("express").Router();



	router.get("/getProduct", productController.getProducts);
	// router.post("/createProduct", productController.cerateProducts);




	app.use('/api/products', router);
};

