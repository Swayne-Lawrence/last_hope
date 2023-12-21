
import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Register= props =>{
    const [user,setUser]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const navi = useNavigate();

    const [errors,setErrors]= useState({})

    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/logged",{withCredentials:true}).then((res)=>{
            navi("/home")
        }).catch((err)=>{console.log(err)})
    },[])

    const noRepeats=(word)=>{
        var arr = word.split("")
        var str=arr[0];

        for(var i=1; i<=arr.length; i++ ){
            if(i+1>arr.length)
                break;
            if(arr[i]== arr[i+1])
                continue;
            str+=arr[i]
        }
        return str
    }

    const submitHandler=(e)=>{
        e.preventDefault()

        axios.get("http://localhost:8000/api/users").then((res)=>{
            var arr=["fuck","shit","penis","dick","cunt","niger","niga","pusy","vagin","fag","nig@","v@gin","n!ger","f@g"]
            var arr1=res.data.filter((u)=>{return u.username==user.username})
            var arr2=res.data.filter((u)=>{return u.email==user.email})
            for(var i=0; i<arr.length; i++){
                if(noRepeats(user.username).includes(arr[i])){
                    alert("username cannot contain offensive language")
                    window.location.reload(false);
                    return
                }
            }

            if(arr1.length>0){
                alert("username already exist")
                window.location.reload(false);
                return
            }
            if(arr2.length>0){
                alert("email already exist")
                window.location.reload(false);
                return
            }
            axios.post("http://localhost:8000/api/user/register",user).then((res)=>{
                console.log(res.data)
                axios.post("http://localhost:8000/api/user/login",user,{withCredentials:true}).then((res)=>{
                    console.log(res.data)
                    navi("/starter")
    
                }).catch((err)=>{
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err.response.data.errors)
                setErrors(err.response.data.errors)
            })
        }).catch((err)=>{console.log(err)})


    }

    return(
        <div>
            <div className="contain" style={{backgroundColor:"white", width:900}}>
                <h1>Swiz</h1>
                <img src={require(`../photos/symbols/button.jpg`)}/>
                <h1>Card-Game</h1>
            </div>
            <h5> *DISCLAIMER: This is a fan made game and has nothing to do with</h5>
            <h5>  the pokemon trading card game. All the art used in this game</h5>
            <h5>was taken from Pinterest/DeviantArt*</h5>

            <div className="contain" style={{backgroundColor:"black", width:900,height:400}}>
                <form style={{position:"relative", top:20}}  onSubmit={(e)=>{submitHandler(e)}}>
                <div  className="contain" style={{marginTop:20,position:"relative", left:20}}>
                    {errors.email?
                        <p className="errort"> {errors.email.message}</p>   
                        :
                        <p></p> 
                }
                    <label className="text" style={{marginRight:15}}>Email: </label>
                    <input className="contain" type="email" name="email" value={user.email} onChange={(e)=>{setUser({...user,email:e.target.value})}}/>
                </div>
                <div  className="contain">
                {errors.username?
                        <p className="errort"> {errors.username.message}</p>   
                        :
                        <p></p> 
                }
                    <label className="text" style={{marginRight:20}}>Username: </label>
                    <input className="contain" type="text" name="username" value={user.username} onChange={(e)=>{setUser({...user,username:e.target.value})}}/>
                </div>
                <div  className="contain">
                {errors.password?
                        <p className="errort"> {errors.password.message}</p>   
                        :
                        <p></p> 
                }
                    <label className="text" style={{marginRight:20}}>Password: </label>
                    <input className="contain" className="contain" type="password" name="password" value={user.password} onChange={(e)=>{setUser({...user,password:e.target.value})}}/>
                </div>
                <div  className="contain" style={{position:"relative", right:30}}>
                {errors.confirmPassword?
                        <p className="errort"> {errors.confirmPassword.message}</p>   
                        :
                        <p></p> 
                }
                    <label className="text" style={{marginRight:20}}>Confirm Password: </label>
                    <input className="contain" type="password" name="confirmPassword" value={user.confirmPassword} onChange={(e)=>{setUser({...user,confirmPassword:e.target.value})}}/>
                </div>

                <button style={{marginTop:10}} type="submit" className="btn btn-outline-light">Submit</button>
            </form>
            <button onClick={(e)=>{
                e.preventDefault()
                navi("/login")
                }} type="button" style={{color: "white", position:"relative", top:30}} className="btn btn-link">Click to Login</button>
            </div>

            
        </div>
    )
}
export default Register;