const Que = require("../models/que.model");

module.exports={
    createQue: (req,res)=>{
        Que.create(req.body).then((newQue)=>{
            console.log(newQue);
            res.json(newQue);
        }).catch((err)=>{
            console.log("error in create que")
            res.status(400).json(err);
        })
    },
    findAllQues:(req,res)=>{
        Que.find().then((allQues)=>{
            console.log(allQues);
            res.json(allQues)
        }).catch((err)=>{
            res.json({message: "error in  findAllQues", err:err})
        })
    },
    findOneQue: (req,res)=>{
        Que.findOne({_id: req.params.id}).then((thisQue)=>{
            console.log(thisQue);
            res.json(thisQue)
        }).catch((err)=>{
            res.json({message:"error in findOneQue",err:err})
        })
    },
    deleteQue: (req,res)=>{
        Que.deleteOne({_id:req.params.id}).then((deleted)=>{
            console.log(deleted);
            res.json(deleted);
        }).catch((err)=>{
            res.json({message:"error in deleteOne",err,err})
        })
    },
    updateQue: (req,res)=>{
        Que.findOneAndUpdate({_id: req.params.id},req.body,{new:true,runValidators:true})
        .then((updated)=>{
            console.log(updated);
            res.json(updated);
        }).catch((err)=>{
            console.log("error in updateQue");
            res.status(400).json(err);
        })
    }
}