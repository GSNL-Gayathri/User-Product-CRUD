const express = require("express");

const router = express.Router();
const { verifyToken } = require("../middlewares/jwtClient")
const productContoller = require("../controllers/product");


router.post("/create", verifyToken, productContoller.createProducts);

router.get("/list", verifyToken, productContoller.getProductList);

router.post("/update", verifyToken, productContoller.updateProduct);
router.post("/delete", verifyToken, productContoller.deleteProduct);


module.exports = router;
