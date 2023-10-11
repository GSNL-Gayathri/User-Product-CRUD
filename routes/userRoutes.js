const express = require("express");

const router = express.Router();
const { verifyToken } = require("../middlewares/jwtClient")
const userController = require("../controllers/user");


router.post("/register", userController.registerUser);

router.post("/login", userController.login);

router.get("/list", verifyToken, userController.getUserList);

module.exports = router;
