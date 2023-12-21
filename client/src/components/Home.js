import React, {useEffect, useState} from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import { useNavigate } from "react-router"

const Home = (props)=>{
    const [user,setUser] = useState({
        battles:[],
        replies:[],
        trades:[],
        username:""
    })
    const [leaders,setLeaders]=useState([])
    const navi = useNavigate()
    useEffect(()=>{
            
            axios.get("http://localhost:8000/api/user/logged",{withCredentials:true}).then((res)=>{
         
                var person= res.data._id
                var loses= res.data.loses.length
                var wins = res.data.wins.length
                var logged= res.data._id
                var ip = res.data.ip
                
                
                axios.get("http://localhost:8000/api/banned").then((res)=>{
                        
                        var banarr=res.data.filter((ban)=>{return ban.ip==ip})
                        if(banarr.length>0){
                            axios.post("http://localhost:8000/api/user/logout",{},{withCredentials:true}).then((res)=>{
                                console.log(res.data)
                            }).catch((err)=>{
                                console.log(err);
                    
                            })
                            axios.delete(`http://localhost:8000/api/user/${logged}`).then((res)=>{
                                alert(`You are banned'`)    
                                navi("/")
                                }).catch((err)=>{console.log(err)})
                        }
                    }).catch((err)=>{console.log(err)})

                
                axios.get("http://localhost:8000/api/users/ratio").then((res)=>{
                    var count=0;
                    for(var i = 0; i<res.data.length;i++){
                        if(person==res.data[i]._id){
                            count= i+1
                            break
                        }
                    }
                    if(wins==0 && loses==0){
                        loses=-10000
                        wins=-100000
                    }
                    axios.put(`http://localhost:8000/api/user/${logged}`,{status:"idle",link:"",game:"", que:"",ratio:wins-loses,rank:count,getTokens:""}).then((res)=>{
                    
                    }).catch((err)=>{console.log(err)})
                   
                    setLeaders(res.data)
                }).catch((err)=>{console.log(err)})

                    axios.get("https://api.ipify.org?format=json")
                    .then((res)=>{
                       
                        axios.put(`http://localhost:8000/api/user/${logged}`,{ip:res.data.ip}).then((res)=>{}).catch((err)=>{console.log(err)})
                    
                   
                    }).catch((err)=>{console.log(err)})
                    
                setUser(res.data)
            }).catch((err)=>{console.log(err); navi("/login")})
            
    },[])

useEffect(()=>{
  
},[])


    
    
    const logoutHandler= (e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/user/logout",{},{withCredentials:true}).then((res)=>{
            console.log(res.data)
            navi("/login")
        }).catch((err)=>{
            console.log(err);

        })
    }

    const gameHandeler=(e)=>{
        e.preventDefault()
        navi("/matchmaking")

    } 

    const goTo=(e,pid)=>{
        e.preventDefault()
        navi(`/profile/${pid}`)
    }

    const storeNav=(e)=>{
        e.preventDefault()
        navi("/getcards")
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
                    }} className="btn btn-outline-dark">Profile</button>
                    <button  style={{height:40}} className="btn btn-outline-dark" onClick={(e)=>{ logoutHandler(e)}}>logout</button>
                </div>
                
            </div>
               {user.username=="admin_swiz"?
               <h1>Hey swiz</h1>:
               <p></p>

               }
            <div className="contain" style={{width:900, height:200,marginTop:20, borderStyle:"solid",borderColor:"black"}}>
                <div className="flexy" style={{justifyContent:"space-evenly",marginTop:15}}>
                    <button className="btn btn btn-dark" onClick={(e)=>{storeNav(e)}}>Get Cards</button>
                    <button onClick={(e)=>{e.preventDefault(); navi("/findTrainer")}} className="btn btn btn-dark">Trainer Search</button>
                    <button onClick={(e)=>{e.preventDefault(); navi("/learn")}} className="btn btn btn-dark">How to Play</button>

                </div>
                <button className="btn btn-outline-dark" style={{marginTop:10, width:100, height:80, fontSize:25,position:"relative", right:7}} onClick={(e)=>{gameHandeler(e)}}>Play</button>
            </div>

            <div className="contain" style={{marginTop:10,width:900,height:700, backgroundColor:"black", overflow:"scroll", overflowX:"hidden"}}>
                <h1 className="contain text"> Leaderboards</h1>
                <table className="table contain">
  <thead>
    <tr>
      <th style={{color:"white"}} scope="col">#</th>
      <th style={{color:"white"}} scope="col">Username</th>
      <th style={{color:"white"}} scope="col">Wins</th>
      <th style={{color:"white"}} scope="col">Loses</th>
    </tr>
  </thead>
  <tbody>
      {
          leaders.map((person,index)=>{return(
                
                  <tr style={{color:"white"}}>
                    <th scope="row">{person.rank}</th>
                  {person.rank<=10?<td onClick={(e)=>{goTo(e,person._id)}} style={{color:"yellow"}}>{person.username}</td>:<td onClick={(e)=>{goTo(e,person._id)}} style={{color:"white"}}>{person.username}</td>}  
                  {person.rank<=10?<td onClick={(e)=>{goTo(e,person._id)}} style={{color:"yellow"}}>{person.wins.length}</td>:<td onClick={(e)=>{goTo(e,person._id)}} style={{color:"white"}}>{person.wins.length}</td>}  
                  {person.rank<=10?<td onClick={(e)=>{goTo(e,person._id)}} style={{color:"yellow"}}>{person.loses.length}</td>:<td onClick={(e)=>{goTo(e,person._id)}} style={{color:"white"}}>{person.loses.length}</td>}  
    </tr>

          )})
      }

  </tbody>
</table>

            </div>
        {(user.battles.length>0 || user.replies.length>0 || user.trades.length>0 || user.comments>0)?
             <div style={{height:200,width:400, borderStyle:"solid",borderColor:"black", position:"fixed", bottom:10,left:1400}}>
             <h2 className="contain">Notifications</h2>
             {user.comments>0?
                <>
                <Link to={`/profile/${user._id}`} style={{color:"black"}}>Comments({user.comments})</Link><br/>
                </>
                :
                <p></p>
                }
                             {user.replies.length>0?
                <>
                <Link to="/notify/reply" style={{color:"black"}}>Replies({user.replies.length})</Link><br/>
                </>
                :
                <p></p>
                }
                             {user.battles.length>0?
                <>
                <Link to={`/notify/battle`} style={{color:"black"}}>Battle Requests({user.battles.length})</Link><br/>
                </>
                :
                <p></p>
                }
                             {user.trades.length>0?
                <>
                <Link to={`/notify/trade`} style={{color:"black"}}>Trade Requests({user.trades.length})</Link><br/>
                </>
                :
                <p></p>
                }
             
             
             
            
            
         </div>
          :
          <p></p>
        }    
       
            
            
        </div>
    )
}
export default Home;