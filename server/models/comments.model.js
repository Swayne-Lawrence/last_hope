const mongoose =require("mongoose");
const CommentsSchema = new mongoose.Schema({
    message:{
        type:String,
        maxlength:[90,"max char length is 90"]
    },
    commenterId:{
        type:String
    },
    profile:{
        type: String,
    },
    commenterName:{
        type:String
    }


},{timestamps:true})

const Comments = mongoose.model("Comments",CommentsSchema)
module.exports=Comments;
