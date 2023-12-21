const mongoose =require("mongoose");
const QueSchema = new mongoose.Schema({
    p1:{
        type:String
    },
    p2:{
        type:String
    },
    players:{
        type: String,
        default:"0"
    }


},{timestamps:true})

const Que = mongoose.model("Que",QueSchema)
module.exports=Que;
