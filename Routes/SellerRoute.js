const express = require("express");
const { AddItem, getSellerOrders } = require("../Controllers/Authorized/UserController");
const router = express.Router();
const Authenticate = require("../Middlewares/Authenticate")

router.route("/create-catalog").post(Authenticate, AddItem);
router.route("/orders").get(Authenticate, getSellerOrders);
module.exports = router; 