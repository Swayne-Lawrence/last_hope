const mongoose = require("mongoose");

const PokemonSch= new mongoose.Schema({
    name:{
        type:String
    },
    type1:{
        type:String
    },
    type2:{
        type:String
    },
    hp:{
        type:Number
    },
    prev:{
        type:String
    },
    attack1:{
        type:String
    },
    attack1Type1:{
        type:String
    },
    attack1Type2:{
        type:String
    },
    attack1Des:{
        type:String
    },
    attack1Damage:{
        type:Number
    },
    attack2:{
        type:String
    },
    attack2Type1:{
        type:String
    },
    attack2Type2:{
        type:String
    },
    attack2Des:{
        type:String
    },
    attack2Damage:{
        type:Number
    },
    attack3:{
        type:String
    },
    attack3Type1:{
        type:String
    },
    attack3Type2:{
        type:String
    },
    attack3Des:{
        type:String
    },
    attack3Damage:{
        type:Number
    },
    weak1:{
        type:String
    },
    weak1Amount:{
        type:Number,
        default:1
    },
    weak2:{
        type: String
    },
    weak2Amount:{
        type:Number,
        default:1
    },
    resist1:{
        type:String
    },
    resist1Amount:{
        type: Number,
        default:0
    },
    resist2:{
        type:String
    },
    resist2Amount:{
        type:Number,
        default:0
    },
    damageT1:{
        type:String,
        default: "p"
    },
    damageT2:{
        type:String,
        default: "p"
    }

},{timestamps:true})

const Pokemon = mongoose.model("Pokemon",PokemonSch);
module.exports=Pokemon;