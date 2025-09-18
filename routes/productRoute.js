const productController = require("../controllers/productController.js");
const express = require("express");
const router = express.Router();    

router.post("/insert", productController.insertProducts);
router.get("/get", productController.getProducts);

module.exports = router;