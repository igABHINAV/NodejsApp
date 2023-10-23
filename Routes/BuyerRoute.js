const express = require("express");
const Authenticate = require("../Middlewares/Authenticate");
const { createOrder, getAllSellers, viewSellerCatalog } = require("../Controllers/Authorized/UserController");
const router = express.Router();
router.route("/create-order/:seller_id").post(Authenticate,createOrder);
router.route("/get-all/list-of-sellers").get(Authenticate,getAllSellers);
router.route("/seller-catalog/:sellerID").get(Authenticate ,viewSellerCatalog);
module.exports= router;