import React, {useEffect, useState} from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import { useNavigate } from "react-router"
import { useParams } from "react-router";

const GetCards= (props)=>{
    const [user,setUser]= useState({})
    const navi = useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/logged",{withCredentials:true}).then((res)=>{
            setUser(res.data)
        }).catch((err)=>{console.log(err)})
    },[])

    const chestHandeler=(e)=>{
        if(user.tokens<=0){
            alert("Not enough tokens")
            return
        }
        navi("/chest")

        
    }

    return(
        <div>
            <div className="flexy contain" style={{backgroundColor:"white", width:1500}}>
                <h2 className="contain">Swiz</h2> <img className="slogo contain" src={require(`../photos/symbols/button.jpg`)}/> <h2 className="contain">Card-Game</h2>
            </div>
            <div style={{width:900, height:50, borderStyle:"solid", borderColor:"black", justifyContent:"space-evenly"}} className="flexy contain">
                <div className="flexy">
                    <h4 style={{color:"gray"}}>Trainer:</h4>
                    <h4 style={{marginLeft:5}}>{user.username}</h4>
                </div>
                
                
                
                <div className="flexy" style={{marginLeft:15}}>
                    <button  style={{height:40}} className="btn btn-outline-dark" onClick={(e)=>{ 
                        e.preventDefault()
                        navi(`/home`)
                    }}>Home</button>
                    
                </div>
                <h4>Tokens: {user.tokens}</h4>
            </div>

            <div className="contain flexy" style={{width:900, height:500, backgroundColor:"white",borderStyle:"solid", borderColor:"black",marginTop:10}}>
                
                <div className="flexy contain">
                <div style={{width:350, height:350, backgroundColor:"white",borderStyle:"solid", borderColor:"black",marginTop:10}}>
                    <h3>Store</h3>
                    <img className="minimize" src={require(`../photos/symbols/store.png`)}/><br/>
                    <h6>Buy cards with tokens</h6> <br/>
                    <button className="btn btn-dark" onClick={(e)=>{
                        e.preventDefault()
                        navi("/store")
                    }}>Store</button>

                </div>
                    <div style={{width:350, height:350, backgroundColor:"white",borderStyle:"solid", borderColor:"black",marginTop:10, marginLeft:10}}>
                    <h3>Chest</h3>
                    <img className="minimize" src={require(`../photos/symbols/chest.png`)}/><br/>
                    <h6>Open chest for a chance to obtain any card</h6> <br/>
                    <button className="btn btn-dark" onClick={(e)=>{chestHandeler(e)}}>Open(1 Token)</button>
                    </div>
                </div>
                   
            </div>
        </div>
    )
}

export default GetCards