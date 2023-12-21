const mongoose =require("mongoose");
const RequestsSchema = new mongoose.Schema({
    p1:{
        type:String
    },
    p2:{
        type:String
    },
    players:{
        type: String,
        default:"0"
    },
    name:{
        type:String
    },
    temp:{
        type:String
    }


},{timestamps:true})

const  Requests = mongoose.model("Requests", RequestsSchema)
module.exports= Requests;
