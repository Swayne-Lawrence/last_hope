import React, {useEffect, useState} from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import { useNavigate } from "react-router"
import { useParams } from "react-router";


const Notify=(props)=>{
     const {type} = useParams()
     const [user,setUser]= useState({})
     const[links, setLinks]=useState([])
     const [all, setAll]=useState([])
     const [trades,setTrades]= useState([])
     const navi= useNavigate()

     useEffect(()=>{
         axios.get("http://localhost:8000/api/user/logged",{withCredentials:true}).then((res)=>{
            if(type=="battle"){
                const id= res.data._id
                axios.get("http://localhost:8000/api/requestses").then((res)=>{
                    setLinks(res.data.filter((re)=>{return re.temp==id}))
                }).catch((err)=>{console.log(err)})
            }
            
            if(type=="reply"){
                setLinks(res.data.replies)
            }
            
            if(type=="trade"){
                const id= res.data._id
                axios.get("http://localhost:8000/api/tradeses").then((res)=>{
                    
                    setLinks(res.data.filter((tr)=>{return tr.reciever==id}))
                }).catch((err)=>{console.log(err)})
            }
            axios.get("http://localhost:8000/api/users").then((res)=>{
                setAll(res.data)
            }).catch((err)=>{console.log(err)})
            setUser(res.data)
         }).catch((err)=>{console.log(err)})
     },[])

    const getReplies=(rid)=>{
        var arr= all.filter((per)=>{return rid==per._id})

        console.log(arr[0])

    }

    const getBattles=(bid)=>{
        axios.get(`http://localhost:8000/api/requests/${bid}`).then((res)=>{
            axios.get(`http://localhost:8000/api/user/${res.data.p1}`).then((res)=>{
                return res.data.username
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})

    }

    const getTrades=(tid)=>{
        axios.get(`http://localhost:8000/api/trades/${tid}`).then((res)=>{
            axios.get(`http://localhost:8000/api/user/${res.data.requester}`).then((res)=>{
                return res.data.username
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})

    }

    const replyLink= (e,rid)=>{
        e.preventDefault()
        for(let i=0; i<user.replies.length; i++){
            if(rid==user.replies[i]){
                user.replies.splice(i,1)
                break;
            }
            
        }
        user.replies = user.replies.filter((h)=>{return h!=null})

        axios.put(`http://localhost:8000/api/user/${user._id}`,{replies:user.replies}).then((res)=>{navi(`/profile/${rid}`) }).catch((err)=>{console.log(err)})
        
    }

    const battleAccept= (e,bid)=>{
        e.preventDefault()
        var fid=""
       
        axios.put(`http://localhost:8000/api/requests/${bid}`,{p2:user._id,players:2}).then((res)=>{
            fid=res.data.p1
            axios.post("http://localhost:8000/api/game",{player1:res.data.p1, player2:res.data.p2,link:`/game/${res.data.p1}/${res.data.p2}`}).then((res)=>{
                axios.put(`http://localhost:8000/api/user/${res.data.player1}`,{game:res.data._id,link:res.data.link,status:"found",getTokens:"false"}).then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err)})
                axios.put(`http://localhost:8000/api/user/${res.data.player2}`,{game:res.data._id,link:res.data.link,status:"found",getTokens:"false"}).then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err)})
            }).catch((err)=>console.log(err))
            axios.delete(`http://localhost:8000/api/requests/${bid}`).then((res)=>{
                console.log(res.data)
                for(let i=0; i<user.battles.length; i++){
                    if(bid==user.battles[i]){
                        user.battles.splice(i,1)
                        break;
                    }
                    
                }
                user.battles = user.battles.filter((h)=>{return h!=null})
        
                axios.put(`http://localhost:8000/api/user/${user._id}`,{battles:user.battles}).then((res)=>{setTimeout(()=>{ navi(`/game/${fid}/${user._id}`);},300) }).catch((err)=>{console.log(err)})
                
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
    }

    const battleDecline=(e,bid)=>{
        e.preventDefault()
        axios.get(`http://localhost:8000/api/requests/${bid}`).then((res)=>{
            axios.put(`http://localhost:8000/api/user/${res.data.p1}`,{status:"idle",link:"",game:""}).then((res)=>{
                axios.delete(`http://localhost:8000/api/requests/${bid}`).then((res)=>{
                    for(let i=0; i<user.battles.length; i++){
                        if(bid==user.battles[i]){
                            user.battles.splice(i,1)
                            break;
                        }
                        
                    }
                    user.battles = user.battles.filter((h)=>{return h!=null})
                    axios.put(`http://localhost:8000/api/user/${user._id}`,{battles:user.battles}).then((res)=>{window.location.reload(false); }).catch((err)=>{console.log(err)})
                }).catch((err)=>{console.log(err)})    
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
    }

    const acceptHandeler=(e,tid,req,give,person)=>{
        e.preventDefault()
        var arr= user.reserve.filter((r)=>{return r==req})
        if(arr.length<=0){
            alert("you dont have that card")
            return
        }

        axios.get(`http://localhost:8000/api/user/${person}`).then((res)=>{
            var arr= res.data.reserve.filter((r)=>{return r==give})
            if(arr.length<=0){
                alert("card is no longer obtainable")
                return
            }
            for(let i=0; i<res.data.reserve.length; i++){
                if(give==res.data.reserve[i]){
                    res.data.reserve.splice(i,1)
                    break;
                
            }
        }
                res.data.reserve = res.data.reserve.filter((h)=>{return h!=null})
                res.data.reserve.push(req)
                axios.put(`http://localhost:8000/api/user/${person}`,{reserve:res.data.reserve}).then((res)=>{
                    for(let i=0; i<user.reserve.length; i++){
                        if(req==user.reserve[i]){
                            user.reserve.splice(i,1)
                            break;
                        
                    }
                }
                user.reserve = user.reserve.filter((h)=>{return h!=null})
                user.reserve.push(give)
                axios.put(`http://localhost:8000/api/user/${user._id}`,{reserve:user.reserve}).then((res)=>{
                    axios.delete(`http://localhost:8000/api/trades/${tid}`).then((res)=>{
                        for(let i=0; i<user.trades.length; i++){
                            if(tid==user.trades[i]){
                                user.trades.splice(i,1)
                                break;
                            
                        }
                    }
                    user.trades = user.trades.filter((h)=>{return h!=null})
                    axios.put(`http://localhost:8000/api/user/${user._id}`,{trades:user.trades}).then((res)=>{
                        alert(`You obtained ${give}`)
                        window.location.reload(false);
                    }).catch((err)=>{console.log(err)})
                    }).catch((err)=>{console.log(err)})
                }).catch((err)=>{console.log(err)})
                }).catch((err)=>{console.log(err)})
                
            
        }).catch((err)=>{console.log(err)})
    }

    const rejectHandeler= (e,tid)=>{
        e.preventDefault()
        axios.delete(`http://localhost:8000/api/trades/${tid}`).then((res)=>{
            for(let i=0; i<user.trades.length; i++){
                if(tid==user.trades[i]){
                    user.trades.splice(i,1)
                    break;
                
            }
        }
        user.trades = user.trades.filter((h)=>{return h!=null})
        axios.put(`http://localhost:8000/api/user/${user._id}`,{trades:user.trades}).then((res)=>{
            window.location.reload(false);
        }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
    }





    return(
        <div>
            <div className="contain" style={{width:900,height:400, backgroundColor:"white",borderStyle:"solid", borderColor:"black", overflow:"scroll", overflowX:"hidden"}}>
                <h1>Notifications</h1>
                {type=="reply"?
                <>
                    <div>
                        {
                            links.map((li,index)=>{
                                return(<>
                                {console.log(li)}
                                <button style={{color:"black"}} type="button" className="btn btn-link" onClick={(e)=>{replyLink(e,li)}}>Someone Replied to your comment (Click to View)</button><br/>
                                </>)
                            })
                        }
                    </div>
                </>:
                <p></p>

                }
                 {type=="battle"?
                <>
                    <div >


                        {
                            links.map((li,index)=>{
                                return(<>
                               <div className="contain" style={{backgroundColor:"black",marginTop:5,marginBottom:5,width:800,height:100}}>
                                   <h3  style={{color:"white"}}>{li.name} has sent a battle request</h3>
                                   <button onClick={(e)=>{battleAccept(e,li._id)}} className="btn btn-outline-light">Accept</button>
                                   <button onClick={(e)=>{battleDecline(e,li._id)}} className="btn btn-outline-light">Decline</button>
                               </div>
                                </>)
                            })
                        }
                    </div>
                </>:
                <p></p>

                }
                {type=="trade"?
                <>
                    <div>
                        {
                            links.map((tr,index)=>{
                                return(
                                <>
                                    <div style={{borderStyle:"solid",borderColor:"black", marginBottom:5}}>
                                        <h5><span style={{color:"goldenrod"}}>{tr.requser}</span> wants your <span style={{color:"goldenrod"}}>{tr.pokereq}</span> for <span style={{color:"goldenrod"}}>{tr.pokegive}</span></h5>
                                        <div>
                                            <button onClick={(e)=>{acceptHandeler(e,tr._id,tr.pokereq,tr.pokegive,tr.requester)}} className="btn btn-outline-dark">Accept</button> 
                                            <button className="btn btn-outline-danger" onClick={(e)=>{rejectHandeler(e,tr._id)}}>Reject</button>
                                        </div>
                                    </div>
                                </>
                                )
                            })
                        }
                    </div>
                </>:
                <p></p>

                }
            </div>
            <Link to="/home" style= {{color:"black"}}>Return Home</Link>
        </div>
    )
}

export default Notify