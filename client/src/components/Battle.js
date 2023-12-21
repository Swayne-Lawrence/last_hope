import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router"
import { useParams } from "react-router";

const Battle=(props)=>{
    const [user,setUser]= useState({})
    const [link,setLink]= useState("")
    const [que,setQue]=useState({})
    const [person,setPerson]= useState("")
    const {id} = useParams()


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

    axios.get(`http://localhost:8000/api/user/${id}`).then((res)=>{
        setPerson(res.data)
    }).catch((err)=>{console.log(err)})
},[])

    const navi = useNavigate()

    const battleHandler=(e)=>{
        e.preventDefault()

        if(user.stage1s==0 || user.legends>2){
            alert("You either have more then 2 legendary pokemon or no basic stage  pokemon(pre-evolution) in your deck")
            return
        }

        axios.post("http://localhost:8000/api/requests",{p1:user._id,players:1,name:user.username,temp:person._id}).then((res)=>{
            const req= res.data._id
            axios.put(`http://localhost:8000/api/user/${user._id}`,{status:"in que",que:res.data._id}).then((res)=>{
                axios.get(`http://localhost:8000/api/user/${id}`).then((res)=>{
                    res.data.battles.push(req)
                    axios.put(`http://localhost:8000/api/user/${id}`,{battles:res.data.battles}).then((res)=>{
                        setTimeout(()=>{ window.location.reload(false);},300)
                    }).catch((err)=>{console.log(err)})
                    }).catch((err)=>{console.log(err)})
            }).catch((err)=>{console.log(err)})

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

            for(let i=0; i<person.battles.length; i++){
                if(res.data.que==person.battles[i]){
                    person.battles.splice(i,1)
                    break;
                }
                
            }
            person.battles = person.battles.filter((h)=>{return h!=null})

            axios.put(`http://localhost:8000/api/user/${person._id}`,{battles:person.battles}).then((res)=>{}).catch((err)=>{console.log(err)})

            axios.delete(`http://localhost:8000/api/requests/${res.data.que}`).then((res)=>{
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
                <h1 className="contain"> Challenging {person.username} </h1>
                <h5 style={{color:"grey"}}>*If something in game doesnt load or any other bug try refreshing page*</h5>
                 {
                    user.status== "idle"?
                    <button style={{marginTop:20}} className="btn btn-dark" onClick={(e)=>{battleHandler(e)}}>Challenge</button>:
                    <div> 
                    <img style={{marginTop:20}} className="waiting" src={require("../photos/gifs/waiting2.gif")}/>
                    <div>
                        <button className="btn btn-dark disabled" style={{marginTop:20}} disabled>waiting for {person.username}</button> 
                        <button style={{marginTop:20}} className="btn btn-danger" onClick={(e)=>{leaveHandeler(e)}}>cancel</button>
                    </div>
                    
                    </div>
                }

                {
                    user.status=="found"?
                    <button style={{marginTop:20}} className="btn btn-outline-dark" onClick={(e)=>{MatchHandeler(e)}}>Challenge Accepted</button>:
                    <p></p>
                }
            </div>
               
        </div>
    )
}

export default Battle;