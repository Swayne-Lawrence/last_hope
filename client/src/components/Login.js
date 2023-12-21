import React, {useEffect,useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Login=props=>{
    const [password, setPassword]= useState("");
    const [email, setEmail]= useState("");
    const [error,setError]= useState("");
    const navi = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/logged",{withCredentials:true}).then((res)=>{
            navi("/home")
        }).catch((err)=>{console.log(err)})
    },[])

    const loginHandler=(e)=>{
        e.preventDefault()

        axios.post("http://localhost:8000/api/user/login",{email:email, password:password},{withCredentials:true}).then((res)=>{
            console.log(res.data)
            navi("/home")
        }).catch((err)=>{
            console.log(err);
            setError("Password and/or email is incorrect")
        })
    }

    return(
        <div>
            <div className="contain" style={{backgroundColor:"white", width:900}}>
                <h1>Swiz</h1>
                <img src={require(`../photos/symbols/button.jpg`)}/>
                <h1>Card-Game</h1>
            </div>
            <div className="contain" style={{backgroundColor:"black", width:900,height:300}}>
                <form style={{position:"relative", top:40}} onSubmit={(e)=>{loginHandler(e)}}>
                    {
                        error?
                        <p className="errort">{error}</p>:
                        <p></p>
                    }
                    <div className="contain" style={{position:"relative", left:15}}>
                        <label className="text" style={{marginRight:20}}>Email:</label>
                        <input type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div className="contain" style={{marginTop:10, postion:"relative", left:200}}>
                        <label className="text" style={{marginRight:20}}>Password:</label>
                        <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <button style={{marginTop:10}} className="btn btn-outline-light" type="submit">Submit</button>
                </form>
                <button onClick={(e)=>{
                e.preventDefault()
                navi("/")
                }} type="button" style={{color: "white", position:"relative", top:60}} className="btn btn-link">Click to Create Account</button>
            </div>

        </div>
    )
}
export default Login;