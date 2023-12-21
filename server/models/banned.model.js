const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const BannedSchema = new mongoose.Schema({
    name:{
        type:String
    },
    ip:{
        type: String
    }
},{timestamps:true})

const Banned = mongoose.model("Banned", BannedSchema)
module.exports=Banned;