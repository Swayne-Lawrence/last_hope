import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router"
import { useParams } from "react-router";

const Trade = (props) =>{
    const {id} = useParams({})
    const navi = useNavigate()
    const [user,setUser]= useState({})
    const [userAr,setUserAr]=useState([])
    const [person,setPerson]= useState({})
    const [personAr,setPersonAr]=useState([])
    const [trades,setTrades]=useState({})

    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/logged",{withCredentials:true}).then((res)=>{
            setUser(res.data)
            setUserAr(res.data.reserve.sort())
        }).catch((err)=>{console.log(err)})
        axios.get(`http://localhost:8000/api/user/${id}`).then((res)=>{
            setPerson(res.data)
            setPersonAr(res.data.reserve.sort())
        }).catch((err)=>{console.log(err)})
    },[])

    const submitHandeler=(e)=>{
        e.preventDefault();

        axios.post("http://localhost:8000/api/trades",{...trades,requester:user._id,reciever:person._id,requser:user.username}).then((res)=>{
            console.log(res.data)
            person.trades.push(res.data._id)
            axios.put(`http://localhost:8000/api/user/${id}`,{trades:person.trades}).then((res)=>{
                alert("request has been sent")
                navi("/home")
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
    }
    
    return(
        <div>
            <div className="flexy contain" style={{backgroundColor:"white", width:1500}}>
                <h2 className="contain">Swiz</h2> <img className="slogo contain" src={require(`../photos/symbols/button.jpg`)}/> <h2 className="contain">Card-Game</h2>
            </div>
            <form onSubmit={(e)=>{submitHandeler(e)}} className="contain" style={{width:900,height:400, backgroundColor:"black",borderStyle:"solid", borderColor:"black", marginTop:30}}>
                <h1 style={{color:"white"}}>Trading with {person.username}</h1>
                <div style={{marginTop:60}}>
                <div>
                    <label style={{color:"yellow",marginRight:20}}>{user.username}:</label>
                    <select name="pokegive" value={trades.pokegive} onChange={(e)=>{setTrades({...trades,pokegive:e.target.value})}}>
                        <option  ><span style={{color:"gray"}}>-Select-</span> </option>
                        {userAr.map((poke,index)=>{
                            return(
                                <option value={poke}>{poke}</option>
                            )
                        })}
                    </select>
                </div>
                <h5 style={{color:"white"}}>FOR</h5>
                <div>
                    <label style={{color:"yellow",marginRight:20}}>{person.username}:</label>
                    <select name="pokereq" value={trades.pokereq} onChange={(e)=>{setTrades({...trades,pokereq:e.target.value})}}>
                     <option  >-Select- </option>
                    {personAr.map((poke,index)=>{
                       
                            return(
                                <option value={poke}>{poke}</option>
                            )
                        })}
                    </select>
                </div>
                </div>

                <button type="submit" className="btn btn-light" style={{marginTop:20}}>Request</button>
               
            </form>
        </div>
    )
}

export default Trade