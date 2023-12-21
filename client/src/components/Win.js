import React, {useEffect, useState} from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import { useNavigate } from "react-router"
import { useParams } from "react-router";

const Win = (props)=>{
    const [winner, setWinner]=useState({profilePic:"male/holder.jpg",wins:[],loses:[]});
    const[loser, setLoser]=useState({wins:[],loses:[]})
    const navi = useNavigate();
   
    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/logged",{withCredentials:true}).then((res)=>{
            var winner = res.data.winner
            var loser= res.data.loser
            var logged= res.data._id
            var wToke=10
            var lToke=2

            if(res.data.getTokens=="false"){
                wToke=0
                lToke=0
            }
 
            axios.get(`http://localhost:8000/api/user/${res.data.winner}`).then((res)=>{
                setWinner(res.data)
                console.log(res.data)
                if(logged==winner){
                    res.data.wins.push(loser)
                    axios.put(`http://localhost:8000/api/user/${res.data._id}`,{wins:res.data.wins,tokens:res.data.tokens+wToke, winner:"",loser:"",status:"idle",reason:"",getTokens:""}).then((res)=>{}).catch((err)=>{console.log(err)})
                    }
               


                
            }).catch((err)=>{console.log(err)})
            axios.get(`http://localhost:8000/api/user/${res.data.loser}`).then((res)=>{
                setLoser(res.data)
                console.log(res.data)
                if(logged==loser){
                    res.data.loses.push(winner)
                    axios.put(`http://localhost:8000/api/user/${res.data._id}`,{loses:res.data.loses,tokens:res.data.tokens+lToke, winner:"",loser:"",status:"idle",reason:"",getTokens:""}).then((res)=>{}).catch((err)=>{console.log(err)})
                }
               
            }).catch((err)=>{console.log(err)})  
            axios.delete(`http://localhost:8000/api/game/${res.data.game}`).then((res)=>{}).catch((err)=>{console.log(err)})  
            }).catch((err)=>{console.log(err)})
    },[])

    const onHover = (e)=>{
        e.preventDefault()
        var give= document.getElementById("winner").classList.add("orange")
    }

    const onHover2 = (e)=>{
        e.preventDefault()
        var give= document.getElementById("loser").classList.add("grey")
    }

    const onExit = (e)=>{
        e.preventDefault()
        var give= document.getElementById("winner").classList.remove("orange")
    }
    const onExit2 = (e)=>{
        e.preventDefault()
        var give= document.getElementById("loser").classList.remove("grey")
    }

    const onClick=(e)=>{
        e.preventDefault()

    }
    const onClick2=(e)=>{
        e.preventDefault()

    }
    return(
        <div>
            <div className="contain" style={{backgroundColor:"black",width:900,height:1000}}>
                <h1 style={{color:"yellow",fontSize:100}}>Winner</h1>
                <div className="contain" style={{backgroundColor:"black",width:500,height:600}}>
                    <img className="fit" src={require(`../photos/pictures/${winner.profilePic}`)}/>
                </div>
                <h3 id="winner" onMouseEnter={(e)=>{onHover(e)}} onMouseLeave={(e)=>{onExit(e)}} onClick={(e)=>{onClick(e)}} style={{color:"yellow"}}>{winner.username} ({winner.wins.length}-{winner.loses.length}) </h3>
                <h2 style={{color:"white"}}>Win Condition: {winner.reason}</h2>
                <h5 id="loser" onMouseEnter={(e)=>{onHover2(e)}} onMouseLeave={(e)=>{onExit2(e)}} onClick={(e)=>{onClick2(e)}} style={{color:"white"}}>Loser: {loser.username} ({loser.wins.length}-{loser.loses.length})</h5>
               <button className="btn btn-outline-light" onClick={(e)=>{e.preventDefault()
                                       navi("/home")                     }}>Home</button>
            </div>
             
        </div>
    )
}
export default Win;