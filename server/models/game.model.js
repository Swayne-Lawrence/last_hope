const mongoose = require("mongoose");

const GameSch= new mongoose.Schema({
    round:{
        type:Number,
        default: 1
    },
    player1:{
        type:String
    },
    player2:{
        type: String
    },
    spot1:{
        type: String,
        default:""
    },
    spot2:{
        type:String,
        default:""
    },
    spot3:{
        type:String,
        default:""
    },
    spot4:{
        type:String,
        default:""
    },
    hideOpp:{
        type:String
    },
    hideHealth:{
        type:String
    },
    shows1:{
        type:String,
        default:"hide"
    },
    shows2:{
        type:String,
        default:"hide"
    },
    shows3:{
        type:String,
        default:"hide"
    },
    shows4:{
        type:String,
        default:"hide"
    },
    select:{
        type:String,
        default:""
    },
    selectDmg:{
        type:Number,
        default:0
    },
    selectT1:{
        type:String,
        default:"p"
    },
    selectT2:{
        type:String,
        default:"p"
    },
    p1Summon:{
        type:String,
        default:""
    },
    p2Summon:{
        type:String,
        default:""
    },
    link:{
        type:String
    },
    player1pf:{
        type:String,
        default:""
    },
    player2pf:{
        type:String,
        default:""
    },
    turnd:{
        type: String,
        default:""
    },
    logMoves:{
        type:Number,
        default:0
    },
    log1Attacker:{
        type:String,
        default:""
    },
    log1Attacked:{
        type:String,
        default:""
    },
    log2Attacker:{
        type:String,
        default:""
    },
    log2Attacked:{
        type:String,
        default:""
    },
    log1Dmg:{
        type: Number,
        default:0
    },
    log1T1:{
        type:String,
        default:""
    },
    log1T2:{
        type:String,
        default:""
    },
    log2Dmg:{
        type: Number,
        default:0
    },
    log2T1:{
        type:String,
        default:"p"
    },
    log2T2:{
        type:String,
        default:"p"
    },
    showo13:{
        type:String,
        default:"hide"
    },
    showo24:{
        type:String,
        default:"hide"
    },
    showBig:{
        type:String,
        default:"hide"
    },
    timer:{
        type:Number,
        default: 80
    }





    


},{timestamps: true})

const Game = mongoose.model("Game", GameSch);
module.exports=Game;