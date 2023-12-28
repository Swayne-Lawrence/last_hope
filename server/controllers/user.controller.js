const User = require("../models/user.model");
const bycrpt = require("bcrypt");
const jwt= require("jsonwebtoken");

module.exports={
    register: (req,res)=>{
        const user = new User(req.body);

        user.save()
        .then((newUser)=>{
            console.log(newUser);
            res.json({
                successMessage: "Thank you for registering",
                user:newUser
            })
        }).catch((err)=>{
            console.log("register not successful")
            res.status(400).json(err)
        })
    },
    login: async(req,res)=>{
        const user = await User.findOne({email: req.body.email})

        if(user=== null){
            return res.sendStatus(400);
        }

        const correctPassword = await bycrpt.compare(req.body.password,user.password)
        if(!correctPassword){
            return res.sendStatus(400);
        }

        res.cookie("usertoken", jwt.sign({
            id:user._id,
            email:user.email,
            username:user.username
        },process.env.JWT_SECRET),{
            httpOnly:true,
            expires: new Date(Date.now()+900000000000)
        }).json({
            message:"Success",
            userLoggedIn: user.username
        })
    },
    logout: (req,res)=>{
        res.clearCookie("usertoken");
        res.json(
            {
                message:"You have successfully logged out"
            }
        );
    },
    getLoggedUser: (req,res)=>{
        const decodeJWT= jwt.decode(req.cookies.usertoken,{complete:true})

        User.findOne({_id: decodeJWT.payload.id})
        .then((user)=>{
            console.log(user);
            res.json(user)
        }).catch((err)=>{console.log(err)})
    },
    findAllUsers: (req,res)=>{
        User.find().then((allUsers)=>{
            console.log(allUsers);
            res.json(allUsers);
        }).catch((err)=>{
            res.json({message:"error in findall",err})
        })
    },

    findOneUser:(req,res)=>{
        User.findOne({_id: req.params.id}).then((thisUser)=>{
            console.log(thisUser);
            res.json(thisUser)
        }).catch((err)=>{res.json({message:"error in findOneUser"})})
    },
    updateUser:(req,res)=>{
        User.findOneAndUpdate({_id: req.params.id},req.body,{new:true, runValidators:true})
        .then((updated)=>{
            console.log(updated);
            res.json(updated)
        }).catch((err)=>{
            console.log("errors in updateUser");
            res.status(400).json(err);
        })
    },
    deleteUser: (req,res)=>{
        User.deleteOne({_id: req.params.id}).then((deleted)=>{
            console.log(deleted);
            res.json(deleted);
        }).catch((err)=>{res.json({message:"error in delete User", error:err})})
    },
    findAllUsersRatio: (req,res)=>{
        User.find().sort({ratio:-1}).then((allUsers)=>{
            console.log(allUsers);
            res.json(allUsers);
        }).catch((err)=>{res.json({message:"error in findAllUsers", error:err})})
        
    },
}