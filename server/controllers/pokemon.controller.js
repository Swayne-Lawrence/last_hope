const Pokemon=require("../models/pokemon.model");

module.exports={
    findAllPokemons: (req,res)=>{
        Pokemon.find().then((allPokemon)=>{
            console.log(allPokemon);
            res.json(allPokemon);
        }).catch((err)=>{res.json({message:"error in findAllPokemon", error:err})})
        
    },
    createPokemon: (req,res)=>{
        Pokemon.create(req.body).then((newPokemon)=>{
            console.log(newPokemon);
            res.json(newPokemon);
        }).catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })
    },
    findPokemonByName: (req,res)=>{
        Pokemon.find({name: req.params.name}).then((pokemon)=>{
            console.log(pokemon);
            res.json(pokemon);
        }).catch((err)=>{res.json({message:"error in findPokemonByName", error:err})})
        
    },
    deletePokemon: (req,res)=>{
        Pokemon.deleteOne({name: req.params.name}).then((deleted)=>{
            console.log(deleted);
            res.json(deleted);
        }).catch((err)=>{res.json({message:"error in deletePokemon", error:err})})
    },
    updatePokemon: (req,res)=>{
        Pokemon.findOneAndUpdate({name: req.params.name},req.body,{new:true, runValidators:true})
        .then((updated)=>{
            console.log(updated);
            res.json(updated)
        }).catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        });
    },
}