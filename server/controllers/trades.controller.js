const Trades = require("../models/trades.model");

module.exports={
    findAllTrades: (req,res)=>{
        Trades.find().then((allTrades)=>{
            console.log(allTrades);
            res.json(allTrades);
        }).catch((err)=>{res.json({message:"error in findAllTrades", error:err})})
        
    },
    createTrades: (req,res)=>{
        Trades.create(req.body).then((newTrades)=>{
            console.log(newTrades);
            res.json(newTrades);
        }).catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })
    },
    findOneTrades: (req,res)=>{
        Trades.findOne({_id: req.params.id}).then((thisTrades)=>{
            console.log(thisTrades);
            res.json(thisTrades)
        }).catch((err)=>{
            res.json({message:"error in findOneTrades",error:err})
        })
    },
    deleteTrades: (req,res)=>{
        Trades.deleteOne({_id: req.params.id}).then((deleted)=>{
            console.log(deleted);
            res.json(deleted);
        }).catch((err)=>{res.json({message:"error in deleteTrades", error:err})})
    },
    updateTrades: (req,res)=>{
        Trades.findOneAndUpdate({_id: req.params.id},req.body,{new:true, runValidators:true})
        .then((updated)=>{
            console.log(updated);
            res.json(updated)
        }).catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        });
    },
}