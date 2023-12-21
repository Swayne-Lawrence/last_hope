const TempPoke=require("../models/tempPoke.model");

module.exports={
    findAllTempPoke: (req,res)=>{
        TempPoke.find().then((allTempPoke)=>{
            console.log(allTempPoke);
            res.json(allTempPoke);
        }).catch((err)=>{res.json({message:"error in findAllTempPoke", error:err})})
        
    },
    createTempPoke: (req,res)=>{
        TempPoke.create(req.body).then((newTempPoke)=>{
            console.log(newTempPoke);
            res.json(newTempPoke);
        }).catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })
    },
    findOneTempPoke: (req,res)=>{
        TempPoke.findOne({_id: req.params.id}).then((thisTempPoke)=>{
            console.log(thisTempPoke);
            res.json(thisTempPoke)
        }).catch((err)=>{
            res.json({message:"error in findOneTempPoke",error:err})
        })
    },
    deleteTempPoke: (req,res)=>{
        TempPoke.deleteOne({_id: req.params.id}).then((deleted)=>{
            console.log(deleted);
            res.json(deleted);
        }).catch((err)=>{res.json({message:"error in deleteTempPoke", error:err})})
    },
    updateTempPoke: (req,res)=>{
        TempPoke.findOneAndUpdate({_id: req.params.id},req.body,{new:true, runValidators:true})
        .then((updated)=>{
            console.log(updated);
            res.json(updated)
        }).catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        });
    },
}