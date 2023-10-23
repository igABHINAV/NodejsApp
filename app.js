const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./Middlewares/Authenticate");

if (process.env.NODE_ENV !== 'production')
    require("dotenv").config({ path: "./Config/.env" });
const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());
app.use(cookieParser());


const user = require("./Routes/AuthenticationRoutes");
const buyer = require("./Routes/BuyerRoute");
const seller = require("./Routes/SellerRoute");

app.use("/api/auth" , user);
app.use("/api/buyer" , buyer);
app.use("/api/seller" , seller);


module.exports = app;