const Requests = require("../models/requests.model");

module.exports={
    findAllRequests: (req,res)=>{
        Requests.find().then((allRequests)=>{
            console.log(allRequests);
            res.json(allRequests);
        }).catch((err)=>{res.json({message:"error in findAllRequests", error:err})})
        
    },
    createRequests: (req,res)=>{
        Requests.create(req.body).then((newRequests)=>{
            console.log(newRequests);
            res.json(newRequests);
        }).catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })
    },
    findOneRequests: (req,res)=>{
        Requests.findOne({_id: req.params.id}).then((thisRequests)=>{
            console.log(thisRequests);
            res.json(thisRequests)
        }).catch((err)=>{
            res.json({message:"error in findOneRequests",error:err})
        })
    },
    deleteRequests: (req,res)=>{
        Requests.deleteOne({_id: req.params.id}).then((deleted)=>{
            console.log(deleted);
            res.json(deleted);
        }).catch((err)=>{res.json({message:"error in deleteRequests", error:err})})
    },
    updateRequests: (req,res)=>{
        Requests.findOneAndUpdate({_id: req.params.id},req.body,{new:true, runValidators:true})
        .then((updated)=>{
            console.log(updated);
            res.json(updated)
        }).catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        });
    },
}