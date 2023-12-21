const Banned = require("../models/banned.model")

module.exports={
    findAllBanned: (req,res)=>{
        Banned.find().sort({createdAt:-1}).then((allBanned)=>{
            console.log(allBanned);
            res.json(allBanned);
        }).catch((err)=>{res.json({message:"error in findAllBannd", error:err})})
        
    },
    createBanned: (req,res)=>{
        Banned.create(req.body).then((newBanned)=>{
            console.log(newBanned);
            res.json(newBanned);
        }).catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })
    },
    deleteBanned: (req,res)=>{
        Banned.deleteOne({_id: req.params.id}).then((deleted)=>{
            console.log(deleted);
            res.json(deleted);
        }).catch((err)=>{res.json({message:"error in deleteBanned", error:err})})
    },
}