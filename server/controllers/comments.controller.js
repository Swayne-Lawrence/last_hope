const Comments = require("../models/comments.model");

module.exports={
    findAllComments: (req,res)=>{
        Comments.find().sort({createdAt:-1}).then((allComments)=>{
            console.log(allComments);
            res.json(allComments);
        }).catch((err)=>{res.json({message:"error in findAllComments", error:err})})
        
    },
    createComments: (req,res)=>{
        Comments.create(req.body).then((newComments)=>{
            console.log(newComments);
            res.json(newComments);
        }).catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })
    },
    findOneComments: (req,res)=>{
        Comments.findOne({_id: req.params.id}).then((thisComments)=>{
            console.log(thisComments);
            res.json(thisComments)
        }).catch((err)=>{
            res.json({message:"error in findOneComments",error:err})
        })
    },
    deleteComments: (req,res)=>{
        Comments.deleteOne({_id: req.params.id}).then((deleted)=>{
            console.log(deleted);
            res.json(deleted);
        }).catch((err)=>{res.json({message:"error in deleteComments", error:err})})
    },
    updateComments: (req,res)=>{
        Comments.findOneAndUpdate({_id: req.params.id},req.body,{new:true, runValidators:true})
        .then((updated)=>{
            console.log(updated);
            res.json(updated)
        }).catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        });
    },
    findAllCommentsPro:(req,res)=>{
        Comments.find({profile: req.params.pro}).sort({createdAt:-1})
        .then((allComments)=>{
            console.log(allComments);
            res.json(allComments);
        }).catch((err)=>{res.json({message:"errors in findAllCommentd",errors:err})})
    },
}