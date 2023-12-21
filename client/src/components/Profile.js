import React, {useEffect, useState} from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import { useNavigate } from "react-router"
import { useParams } from "react-router";

const Profile = (props)=>{
    const {id} = useParams()
    const [logged, setLogged]= useState({})
    const [user, setUser] = useState({profilePic:"male/holder.jpg",wins:[],loses:[]})
    const[count,setCount]= useState(0)
    const navi = useNavigate()
    const[message, setMessage]=useState("")
    const [comments, setComments]=useState([])
    const [isBlocked, setIsBlocked]=useState(false)

    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/logged",{withCredentials:true}).then((res)=>{
            var person=res.data._id
            var ip = res.data.ip

            axios.get("http://localhost:8000/api/banned").then((res)=>{
               
                var banarr=res.data.filter((ban)=>{return ban.ip==ip})
                if(banarr.length>0){
                    axios.post("http://localhost:8000/api/user/logout",{},{withCredentials:true}).then((res)=>{
                        
                    }).catch((err)=>{
                        console.log(err);
            
                    })
                    axios.delete(`http://localhost:8000/api/user/${person}`).then((res)=>{
                        alert(`You are banned'`)    
                        navi("/")
                        }).catch((err)=>{console.log(err)})
                }
            }).catch((err)=>{console.log(err)})

            
            axios.get(`http://localhost:8000/api/user/${id}`).then((res)=>{
                setUser(res.data)
                var check=res.data.blocked.filter((ppl)=>ppl == person)
                if(check.length>0){
                    alert("This user has blocked you")
                    navi("/home")
                }
                var num = 0;
                for(var i=0; i<res.data.loses.length; i++){
                    if(res.data.loses[i]==person){
                        num+=1
                    }
                }
                setCount(num)
                
                }).catch((err)=>{console.log(err)})
            setLogged(res.data)
            var check2=res.data.blocked.filter((ppl)=>ppl == id)
            if(check2.length>0){
                setIsBlocked(true)
            }
                    if(person==id){
        axios.put(`http://localhost:8000/api/user/${person}`,{comments:0}).then((res)=>{
        }).catch((err)=>{console.log(err)})
                    }

        
    
    }).catch((err)=>{console.log(err)})


    },[])

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/commentses/${id}`).then((res)=>{
            setComments(res.data)
        }).catch((err)=>{console.log(err)})
    },[])
    const logoutHandler= (e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/user/logout",{},{withCredentials:true}).then((res)=>{
           
            navi("/login")
        }).catch((err)=>{
            console.log(err);

        })
    }

    const deleteHandler=(e,cid)=>{
        e.preventDefault()
        axios.delete(`http://localhost:8000/api/comments/${cid}`).then((res)=>{
            
            window.location.reload(false);
        }).catch((err)=>{console.log(err)})
    }

    const CommentHandeler=(e)=>{
        e.preventDefault()

        axios.post("http://localhost:8000/api/comments",{message:message,commenterId:logged._id,commenterName:logged.username,profile:user._id}).then((res)=>{
           
            axios.put(`http://localhost:8000/api/user/${user._id}`,{comments:user.comments+1}).then((res)=>{
                window.location.reload(false);
            }).catch((err)=>{console.log(err)})
            
        }).catch((err)=>(console.log(err)))
    }
    const getTime=(createdAt)=>{
    
        const num1=Math.round(new Date(createdAt).getTime()/1000)
        const num2= Math.round(new Date().getTime()/1000)
        const sec=num2-num1;
        if(sec<60){
            return(`${sec} second ago`);
        }
        if(sec>60 && sec<3600){
            return(`${Math.round(sec/60)} mins ago`)
        }
        if(sec>3600 && sec<86400){
            return(`${Math.round(sec/3600)} hours ago`)
        }
        if(sec>86400 && sec<2628002){
           return(`${Math.round(sec/86400)} days ago`)
        }
        if(sec>2628002 && sec<31536000){
            return(`${Math.round(sec/2628002)} months ago`)
        }
        if(sec>31536000){
            return(new Date(createdAt).toLocaleDateString())
        }


    }

    const linkHandker=(e,pid)=>{
        e.preventDefault()
        navi(`/profile/${pid}`)
        window.location.reload(false);
    }

    const replyHandler=(e,rid,pid)=>{
        e.preventDefault()

        axios.post("http://localhost:8000/api/comments",{commenterId:logged._id, profile:user._id, commenterName:logged.username,message:`@${rid} `}).then((res)=>{
            
            const reply=res.data._id
            axios.get(`http://localhost:8000/api/user/${pid}`).then((res)=>{
                res.data.replies.push(id)
                axios.put(`http://localhost:8000/api/user/${pid}`,{replies:res.data.replies}).then((res)=>{
                    navi(`/reply/${reply}/${rid}`)
                }).catch((err)=>{console.log(err)})
            }).catch((err)=>{console.log(err)})
            
        }).catch((err)=>{console.log(err)})
    }

    const requestHandeler=(e)=>{
        e.preventDefault()
        navi(`/battle/${id}`)
    }

    const tradeHandler = (e)=>{
        e.preventDefault()
        navi(`/trade/${id}`)
    }

    const blockHandler = (e)=>{
        e.preventDefault()

        logged.blocked.push(id)

        axios.put(`http://localhost:8000/api/user/${logged._id}`,{blocked:logged.blocked}).then((res)=>{
            window.location.reload(false);
        }).catch((err)=>{console.log(err)})
    }

    const unblockHandler= (e)=>{
        e.preventDefault()

        for(let i=0; i<logged.blocked.length; i++){
            if(id==logged.blocked[i]){
                logged.blocked.splice(i,1)
                break;
            
        }
    }
    logged.blocked= logged.blocked.filter((h)=>{return h != null})
    axios.put(`http://localhost:8000/api/user/${logged._id}`,{blocked:logged.blocked}).then((res)=>{
        window.location.reload(false);
    }).catch((err)=>{console.log(err)})
    
    }

    const giveModHandeler= (e,str)=>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/user/${user._id}`,{mod:str}).then((res)=>{
            window.location.reload(false);
        }).catch((err)=>{console.log(err)})
    }

    const deleteAccount =(e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/banned",{name:user.username, ip:user.ip}).then((res)=>{
            axios.delete(`http://localhost:8000/api/user/${user._id}`).then((res)=>{
                alert(`You have deleted ${user.username}'s account'`)    
                navi("/home")
                }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
 
    }



    return(
        <div>

            <div className="contain flexy">{/*Big div*/ }
            <div style={{position:"relative",top:300, marginRight:-70,marginLeft:5}}>{/*blocking div */}
            <div style={{width:350, height:200,backgroundColor:"white" ,borderStyle:"solid", borderColor:"black",marginBottom:20}}>
                {logged._id==user._id?
                <>
                    <button onClick={(e)=>{e.preventDefault();
                                            navi("/deckselect")}} style={{marginTop:15}} className="btn btn btn-dark">Deck Manager</button><br></br>
                </>
                    :
                <>
                    <button style={{marginTop:15}} className="btn btn btn-dark" onClick={(e)=>{tradeHandler(e)}}>Request Trade</button><br></br>
                </>
            }
            {logged._id==user._id?
                <>
                    <button onClick={(e)=>{
                        e.preventDefault()
                        navi("/avatar")
                    }} style={{marginTop:15}} className="btn btn btn-dark">Change Avatar</button><br></br>
                </>
                    :
                <>
                <button style={{marginTop:15}} onClick={(e)=>{requestHandeler(e)}} className="btn btn btn-dark">Battle</button><br></br>
                </>
            }

 
            {logged._id!=user._id && user.mod=="No" && user.username!="admin_swiz"?
            <div>
                {isBlocked==false?
                <button style={{marginTop:15}} onClick={(e)=>{blockHandler(e)}} className="btn btn-danger">Block</button>:
                <button style={{marginTop:15}} onClick={(e)=>{unblockHandler(e)}} className="btn btn-danger">Unblock</button>
                }
                
            </div>:
            <p></p>
                }
                
            </div>

            <div style={{width:350, height:200,backgroundColor:"white",borderStyle:"solid", borderColor:"white"}}>
                {logged.username=="admin_swiz"?
                <div>
                {user.mod=="No"?
                <button onClick={(e)=>{giveModHandeler(e,"Yes")}}>Give Mod</button>:
                <button onClick={(e)=>{giveModHandeler(e,"No")}}>Take Mod</button>
                    
                }
                </div>:
                <div></div>
                }
                {(logged.mod=="Yes" || logged.username=="admin_swiz") && (user.mod=="No") && (user.username != "admin_swiz") ?
                <button onClick={(e)=>{deleteAccount(e)}} style={{marginTop:15}}>Delete Account</button>:
                <p></p>

                }

            </div>

                        </div>
            <div> {/* comment div*/ }
            <div className="flexy contain" style={{backgroundColor:"white", width:1500}}>
                <h2 className="contain">Swiz</h2> <img className="slogo contain" src={require(`../photos/symbols/button.jpg`)}/> <h2 className="contain">Card-Game</h2>
            </div>
            <div style={{width:900, height:50, borderStyle:"solid", borderColor:"black", justifyContent:"center"}} className="flexy contain">
                <div className="flexy">
                    <h4 style={{color:"gray"}}>Trainer:</h4>
                    <h4 style={{marginLeft:5}}>{logged.username}</h4>
                </div>
                
                
                
                <div className="flexy" style={{marginLeft:15}}>
                {/* <button style={{height:40}} onClick={(e)=>{
                        e.preventDefault()
                        navi(`/profile/${logged._id}`)
                        window.location.reload(false);
                    }} className="btn btn-outline-dark">Profile</button>*/}
                    <button  style={{height:40}} className="btn btn-outline-dark" onClick={(e)=>{ 
                        e.preventDefault()
                        navi(`/home`)
                    }}>Home</button>
                </div>
                
            </div>
    <div className="contain" style={{width:900, height:500, backgroundColor:"white",borderStyle:"solid", borderColor:"black",marginTop:10,position:"relative"}}>
                    
                    <h3 style={{color:"gold"}}>{user.username}</h3>
                    {user.mod=="Yes"?
                    <h5 style={{color:"red", marginTop:-10}}>Mod</h5>:
                    <p></p>

                    }
                    <img style={{width:330,height:330, borderStyle:"solid", borderColor:"gold"}} src={require(`../photos/pictures/${user.profilePic}`)}/>
                    <h4><span style={{color:"grey"}}>Rank: </span> {user.rank}</h4>
                    <h4><span style={{color:"grey"}}>W-L: </span> {user.wins.length}-{user.loses.length}</h4>
                    {logged._id==user._id?
                    <>
                        <h4><span style={{color:"grey"}}>Tokens: </span> {logged.tokens}</h4>
                    </>:
                    <>
                        <h4>(beaten by you {count} times)</h4>
                    </>

                    }
                    
                    
            </div>
            <div className="contain" style={{width:900, height:650, backgroundColor:"black",marginTop:10}}>
                    <h1 className="text">Comments</h1>
            
                <form autoComplete="off" onSubmit={(e)=>{CommentHandeler(e)}} className="input-group contain" style={{width:600}}>
                    <input  type="text" autoComplete="off" name="message" value={message} onChange={(e)=>{setMessage(e.target.value)}}  className="form-control" placeholder="Say Something..." aria-label="Comment"/>
                        <button className="btn btn-primary" type="submit">Comment</button>
                        
                </form>
            
                    <div className="contain" style={{width: 800, height:500,borderStyle:"solid",borderColor:"white",marginTop:10, overflow:"scroll", overflowX:"hidden"}}>
                        {
                            comments.map((com, index)=>{
                                return(
                                    <>
                                        {
                                            user._id==com.commenterId?
                                            <div className="contain" style={{width:400, height:210,marginTop:10, marginBottom:10, borderStyle:"solid", borderColor:"yellow", borderRadius:20}}>
                                            <div style={{display:"flex",  justifyContent:"center"}}>
                                            <button type="button" style={{color:"yellow", fontWeight:"bold", fontSize:20}} className="btn btn-link" onClick={(e)=>{linkHandker(e,com.commenterId)}}>{com.commenterName} </button>
                                            <p style={{color:"grey", position:"relative", top:10}}>{getTime(com.createdAt)} </p>
                                            </div>
                                            <div className="" style={{display:"flex", flexWrap:"wrap"}} >
                                                <p style={{wordBreak:"break-all",whiteSpace:"normal",color:"yellow", fontWeight:"bold",marginLeft:5}}>{com.message}</p>{/*90 chars*/}
                                            </div>
                                                <div style={{display:"flex",justifyContent:"right"}}>
                                                    <button onClick={(e)=>{replyHandler(e,com.commenterName,com.commenterId)}} className="btn btn-outline-light">Reply</button>
                                                    {com.commenterId==logged._id || com.profile==logged._id || logged.mod=="Yes" || logged.username=="admin_swiz"?
                                                <button className="btn btn-outline-danger" onClick={(e)=>{deleteHandler(e,com._id)} }>Delete</button>:
                                                <p></p>
                                            }
                                                </div>
                                        </div>
                                        
                                        :
                                        <div className="contain" style={{width:400, height:210,marginTop:10, marginBottom:10, borderStyle:"solid", borderColor:"white", borderRadius:20}}>
                                        <div style={{display:"flex",  justifyContent:"center"}}>
                                        <button type="button" style={{color:"white", fontWeight:"bold", fontSize:20}} className="btn btn-link" onClick={(e)=>{linkHandker(e,com.commenterId)}}>{com.commenterName} </button>
                                        <p style={{color:"grey", position:"relative", top:10}}>{getTime(com.createdAt)}</p>
                                        </div>
                                        <div className="text" style={{display:"flex", flexWrap:"wrap"}} >
                                            <p style={{wordBreak:"break-all",whiteSpace:"normal",marginLeft:5}}>{com.message}</p>{/*90 chars*/}
                                        </div>
                                            <div style={{display:"flex",justifyContent:"right"}}>
                                                <button onClick={(e)=>{replyHandler(e,com.commenterName,com.commenterId)}} className="btn btn-outline-light">Reply</button>
                                                {com.commenterId==logged._id || com.profile==logged._id || logged.mod=="Yes" || logged.username=="admin_swiz"?
                                                <button className="btn btn-outline-danger" onClick={(e)=>{deleteHandler(e,com._id)} }>Delete</button>:
                                                <p></p>
                                            }
                                            </div>
                                    </div>
                                    
                                        }
                                    </>
                                )
                            })
                        }

                        
                    </div>
            </div>

            </div>
     




            </div>


        </div>
    )
}
export default Profile;