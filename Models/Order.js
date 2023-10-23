const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    buyer : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User"
    },
    seller :{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User"
    }
    ,
    items :[
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref : "Item"
        }
    ],
    
});
module.exports = mongoose.model("Order" , orderSchema);