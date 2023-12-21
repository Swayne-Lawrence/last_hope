const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"must have a username"],
        maxlength:[12,"username cannot be more then 12 char"]
    },
    email:{
        type: String,
        required: [true, "must have a email"]
    }, 
    password:{
        type:String,
        required: [true, "must have a password"],
        minlength: [8, "Password must have atleast 8 characters"]
    },
    profilePic:{
        type:String,
        default:"male/male1.jpg"
    },
    deck1:{
        type:Array
    },
    deck2:{
        type:Array
    },
    deck3:{
        type:Array
    },
    deck1n:{
        type:String,
        default:"Deck 1",
        maxlength:[20,"Deck name too long"]
    },
    deck2n:{
        type:String,
        default:"Deck 2",
        maxlength:[20,"Deck name too long"]
    },
    deck3n:{
        type:String,
        default:"Deck 3",
        maxlength:[20,"Deck name too long"]
    },
    mainDeck:{
        type:Array
    },
    hand:{
        type:Array
    },
    turn:{
        type:String
    },
    lifePoints:{
        type:Number
    },
    reserve:{
        type:Array
    },
    stage1s:{
        type:Number,
        default:0
    },
    field:{
        type:Number,
        default:0
    },
    game:{
        type:String
    },
    status:{
        type:String,
        default:"idle"

    },
    wins:{
        type:Array
    },
    loses:{
        type:Array
    },
    tokens:{
        type:Number,
        default:0
    },
    draws:{
        type:Number,
        default:0

    },
    emergency:{
        type:Number,
        default:0

    },
    tempDeck:{
        type: Array
    },
    rounds:{
        type:Number,
        default:0
    },
    link:{
        type:String,
        default:""
    },
    legends:{
        type:Number,
        default:0
    },
    que:{
        type:String
    },
    summons:{
        type: Number,
        default:1
    },
    attacks:{
        type:Number,
        default: 0
    },
    discards:{
        type:Number,
        default:0
    },
    holder:{
        type:String,
        default:""
    },
    winner:{
        type:String
    },
    loser:{
        type:String
    },
    reason:{
        type:String
    },
    ratio:{
        type:Number
    },
    rank:{
        type: Number
    },
    comments:{
        type: Number,
        default:0
    },
    replies:{
        type:Array
    },
    battles:{
        type:Array
    },
    trades:{
        type:Array
    },
    view:{
        type:String,
        default:""
    },
    blocked:{
        type:Array
    },
    mod:{
        type:String,
        default:"No"
    },
    ip:{
        type:String
    },
    getTokens:{
        type:String
    },
    lastUsed:{
        type:String,
        default:"None"
    }

 
},{timestamps:true})

UserSchema.virtual("confirmPassword")
.get(()=>this._confirmPassword)
.set((value)=> this._confirmPassword= value);

UserSchema.pre("validate", function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword","Passwords must match")
    }
    next();
})

UserSchema.pre("save", function(next){
    bcrypt.hash(this.password,10)
    .then((hashed)=>{
        this.password=hashed;
        next();
    })
})

const User= mongoose.model("User", UserSchema);
module.exports= User;

