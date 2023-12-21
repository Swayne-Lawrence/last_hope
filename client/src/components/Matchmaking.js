import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router"

const Matchmaking=(props)=>{
    const [user,setUser]= useState({})
    const [link,setLink]= useState("")
    const [que,setQue]=useState({})


    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/logged",{withCredentials:true}).then((res)=>{
            var count = 0
            var count2=0
            setInterval(()=>{
                if(res.data.status=="in que"){
                    window.location.reload(false);
                }
            },8000)
            for(let i= 0 ; i<res.data.mainDeck.length; i++){
                if(res.data.mainDeck[i].includes("_b"))
                    count+=1
                if(res.data.mainDeck[i].includes("_l"))
                    count2+=1
            }
            if(res.data.status !="found"){         
                axios.put(`http://localhost:8000/api/user/${res.data._id}`,{stage1s:count,legends:count2,tempDeck:res.data.mainDeck,hand:[],rounds:0,field:0,lifePoints:600,summons:1,draws:1,discards:0, attacks:0,emergency:0,holder:"",reason:"",lastUsed:"None"}).then((res)=>{
                
            }).catch((err)=>{console.log(err)})}
   
            setUser(res.data)
        }).catch((err)=>{console.log(err); navi("/login")})
},[])

    const navi = useNavigate()

    const QueHandler=(e)=>{
        e.preventDefault()

      /*  if(user.stage1s==0 || user.legends>2){
            alert("You either have more then 2 legendary pokemon or no basic stage  pokemon(pre-evolution) in your deck")
            return
        }*/
        axios.get("http://localhost:8000/api/ques").then((res)=>{
            console.log(res.data)

            if(res.data.length==0){
                axios.post("http://localhost:8000/api/que",{p1:user._id, players:1}).then((res)=>{
                    console.log(res.data)
                    setQue(res.data)
                    axios.put(`http://localhost:8000/api/user/${user._id}`,{status:"in que",que:res.data._id}).then((res)=>{
                        console.log(res.data)
                        window.location.reload(false);
                    }).catch((err)=>{console.log(err)})
                }).catch((err)=>{console.log(err)})
            }else{
                var array= res.data.filter((que)=>{return que.players==1})

                if(array.length==0){
                    axios.post("http://localhost:8000/api/que",{
                        p1: user._id,
                        players: 1
                    }).then((res)=>{
                        console.log(res.data)
                        setQue(res.data)
                        axios.put(`http://localhost:8000/api/user/${user._id}`,{status:"in que"}).then((res)=>{
                            console.log(res.data)
                            window.location.reload(false);
                        }).catch((err)=>{console.log(err)})
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
                var reveal2 = document.getElementById("mm").classList.add("hide")
                alert("Match Found (please wait a couple seconds)")

                axios.put(`http://localhost:8000/api/que/${array[0]._id}`,{p2:user._id, players:2}).then((res)=>{
                    console.log(res.data)
                    axios.post("http://localhost:8000/api/game",{player1:res.data.p1, player2:res.data.p2,link:`/game/${res.data.p1}/${res.data.p2}`}).then((res)=>{
                        axios.put(`http://localhost:8000/api/user/${res.data.player1}`,{game:res.data._id,link:res.data.link,status:"found"}).then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err)})
                        axios.put(`http://localhost:8000/api/user/${res.data.player2}`,{game:res.data._id,link:res.data.link,status:"found"}).then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err)})
                    }).catch((err)=>console.log(err))
                    axios.delete(`http://localhost:8000/api/que/${array[0]._id}`).then((res)=>{
                        console.log(res.data)
                       
                        setTimeout(()=>{ window.location.reload(false);},300)
                    }).catch((err)=>{console.log(err)})
                }).catch((err)=>{console.log(err)})
 
            }
        }).catch((err)=>{console.log(err)})
    }

    const MatchHandeler=(e)=>{
        e.preventDefault()
        navi(user.link)
    }

    const leaveHandeler=(e)=>{
        axios.put(`http://localhost:8000/api/user/${user._id}`,{status:"idle",link:"",game:""}).then((res)=>{
            console.log(res.data)
            console.log(que._id)
            axios.delete(`http://localhost:8000/api/que/${res.data.que}`).then((res)=>{
                console.log(res.data)
                navi("/home")
            }).catch((err)=>{console.log(err)})
            
        }).catch((err)=>{console.log(err)})
    }

    return(
        <div>
            <div className="flexy contain" style={{backgroundColor:"white", width:1500}}>
                <h2 className="contain">Swiz</h2> <img className="slogo contain" src={require(`../photos/symbols/button.jpg`)}/> <h2 className="contain">Card-Game</h2>
            </div>
            <div className="contain" style={{width:900,height:400, backgroundColor:"white",borderStyle:"solid", borderColor:"black", marginTop:30}}>
                <h1 className="contain"> Matchmaking </h1>
                <h5 style={{color:"grey"}}>*If something in game doesnt load or any other bug try refreshing page*</h5>
                 {
                    user.status== "idle"?
                    <button id="mm" style={{marginTop:20}} className="btn btn-dark" onClick={(e)=>{QueHandler(e)}}>Find Match</button>:
                    <div> 
                    <img style={{marginTop:20}} className="waiting" src={require("../photos/gifs/waiting.gif")}/>
                    <div>
                        <button className="btn btn-dark disabled" style={{marginTop:20}} disabled>In Que</button> 
                        <button style={{marginTop:20}} className="btn btn-danger" onClick={(e)=>{leaveHandeler(e)}}>Leave Que</button>
                    </div>
                    
                    </div>
                }

                {
                    user.status=="found"?
                    <button style={{marginTop:20}} className="btn btn-outline-dark" onClick={(e)=>{MatchHandeler(e)}}>Match Found</button>:
                    <p></p>
                }
            </div>
               
        </div>
    )
}

export default Matchmaking;