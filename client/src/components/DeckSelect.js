import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router"
import { useParams } from "react-router";

const DeckSelect = (props)=>{

    const navi = useNavigate()
    const [user,setUser]= useState({})
    const [d1,setD1]=useState([])
    const [d2,setD2]=useState([])
    const [d3,setD3]=useState([])
   

    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/logged",{withCredentials:true}).then((res)=>{
            setUser(res.data)
            setD1(res.data.deck1)
            setD2(res.data.deck2)
            setD3(res.data.deck3)
        }).catch((err)=>{console.log(err)})

    },[])

    const selector=(e,deck,name)=>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/user/${user._id}`,{mainDeck:deck}).then((res)=>{
            
            navi(`/manageDeck/${name}`)
        }).catch((err)=>{console.log(err)})

    }

    return(
        <div>
            <div className="flexy contain" style={{backgroundColor:"white", width:1500}}>
                <h2 className="contain">Swiz</h2> <img className="slogo contain" src={require(`../photos/symbols/button.jpg`)}/> <h2 className="contain">Card-Game</h2>
            </div>
            <div style={{width:900, height:50, borderStyle:"solid", borderColor:"black", justifyContent:"center"}} className="flexy contain">
                <div className="flexy">
                    <h4 style={{color:"gray"}}>Trainer:</h4>
                    <h4 style={{marginLeft:5}}>{user.username}</h4>
                </div>
                
                
                
                <div className="flexy" style={{marginLeft:15}}>
                <button style={{height:40}} onClick={(e)=>{
                        e.preventDefault()
                        navi(`/profile/${user._id}`)
                        window.location.reload(false);
                    }} className="btn btn-outline-dark">Profile</button>
                    <button  style={{height:40}} className="btn btn-outline-dark" onClick={(e)=>{ 
                        e.preventDefault()
                        navi(`/home`)
                    }}>Home</button>
                </div>
                
            </div>
            <div className= "flexy contain" style={{backgroundColor:"",width:1100, marginTop:30}}>
                <div style={{borderStyle:"solid", borderColor:"black"}}>
                    <h3>{user.deck1n}</h3>
                    <img className="minimize2" src={require(`../photos/symbols/deck.png`)}/>
                    <h5>{d1.length} Cards</h5> 
                    <button className="btn btn-dark" onClick={(e)=>{selector(e,user.deck1,"d1")}}> Select</button>
                </div>
                <div style={{borderStyle:"solid", borderColor:"black",marginLeft:5,marginRight:5}}>
                    <h3>{user.deck2n}</h3>
                    <img className="minimize2" src={require(`../photos/symbols/deck.png`)}/>
                    <h5>{d2.length} Cards</h5> 
                    <button className="btn btn-dark" onClick={(e)=>{selector(e,user.deck2,"d2")}}> Select</button>
                </div>
                <div style={{borderStyle:"solid", borderColor:"black"}}>
                    <h3>{user.deck3n}</h3>
                    <img className="minimize2" src={require(`../photos/symbols/deck.png`)}/>
                    <h5>{d3.length} Cards</h5> 
                    <button className="btn btn-dark" onClick={(e)=>{selector(e,user.deck3,"d3")}}> Select</button>
                </div>

            </div>
        </div>
    )

}

export default DeckSelect