module.exports = app => {
	const cartController = require("../controllers/cart-controller");
	// const webController = require("../controllers/website-controller");

	var router = require("express").Router();



	router.post("/addToCart", cartController.addToCart);
	router.get("/getCart", cartController.getCart);
	router.put("/updateCart", cartController.updateCart);
	router.post("/createOrder", cartController.createOrder);





	app.use('/api/cart', router);
};

