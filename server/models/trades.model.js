const mongoose =require("mongoose");
const TradesSchema = new mongoose.Schema({
   requester:{
        type:String
    },
    reciever:{
        type:String
    },
    pokereq:{
        type: String,
    },
    pokegive:{
        type:String
    },
    requser:{
        type:String
    }



},{timestamps:true})

const Trades = mongoose.model("Trades",TradesSchema)
module.exports=Trades;
