const Game = require("../models/game.model");

module.exports={
    findAllGames: (req,res)=>{
        Game.find().then((allGames)=>{
            console.log(allGames);
            res.json(allGames);
        }).catch((err)=>{res.json({message:"error in findAAllGames", error:err})})
        
    },
    createGame: (req,res)=>{
        Game.create(req.body).then((newGame)=>{
            console.log(newGame);
            res.json(newGame);
        }).catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })
    },
    findOneGame: (req,res)=>{
        Game.findOne({_id: req.params.id}).then((thisGame)=>{
            console.log(thisGame);
            res.json(thisGame)
        }).catch((err)=>{
            res.json({message:"error in findOneGame",error:err})
        })
    },
    deleteGame: (req,res)=>{
        Game.deleteOne({_id: req.params.id}).then((deleted)=>{
            console.log(deleted);
            res.json(deleted);
        }).catch((err)=>{res.json({message:"error in deleteGame", error:err})})
    },
    updateGame: (req,res)=>{
        Game.findOneAndUpdate({_id: req.params.id},req.body,{new:true, runValidators:true})
        .then((updated)=>{
            console.log(updated);
            res.json(updated)
        }).catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        });
    },
}