import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router"
import { useParams } from "react-router";

const ManageDeck =(props)=>{
    const navi = useNavigate()
    const [searchItem,setSearchItem]=useState("");

    const {deckName} = useParams()
    const [deck,setDeck]= useState([])
    const [reserves, setReserves]= useState([])
    const [recent,setRecent]= useState([])
    const [user,setUser]= useState({})
    const [test,setTest]= useState({       
        name: "",
       type1: "p",
       type2: "p",
       hp:0,
       prev:"",
       attack1:"",
       attack1Type1:"p",
       attack1Type2:"p",
       attack1Des: "",
       attack1Damage:0,
       attack2:"",
       attack2Type1:"p",
       attack2Type2:"p",
       attack2Des: "",
       attack2Damage:0,
       attack3:"",
       attack3Type1:"p",
       attack3Type2:"p",
       attack3Des: "",
       attack3Damage:0,
       weak1:"p",
       weak1Amount:0,
       weak2:"p",
       weak2Amount:0,
       resist1:"p",
       resist1Amount:0,
       resist2: "p",
       resist2Amount:0})

    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/logged",{withCredentials:true}).then((res)=>{
           
            setUser(res.data)
            setDeck(res.data.mainDeck)
            setRecent(res.data.reserve)
            setReserves(res.data.reserve)

            if(res.data.view.length>0){
                axios.get(`http://localhost:8000/api/pokemon/${res.data.view}`).then((res)=>{
                    
                    setTest(res.data[0])
                }).catch((err)=>{console.log(err)})
            }




        }).catch((err)=>{console.log(err)})

    },[])

    const turnBlack=(e,num,where)=>{
        e.preventDefault();
        var move= document.getElementById(where+num)
        move.classList.remove("text")
        move.classList.add("text2")
    }

    const turnWhite=(e,num,where)=>{
        e.preventDefault();
        var move= document.getElementById(where+num)
        move.classList.remove("text2")
        move.classList.add("text")
    }

    const viewHandeler=(e,poke)=>{
        e.preventDefault();

        axios.put(`http://localhost:8000/api/user/${user._id}`,{view:poke}).then((res)=>{
            window.location.reload(false);
        }).catch((err)=>{console.log(err)})
    }

    const deckRemove=(e,poke)=>{
        e.preventDefault();

        var arr1=user.deck1
        var arr2= user.deck2
        var arr3= user.deck3

        user.reserve.push(poke)

        for(let i=0; i<user.mainDeck.length; i++){
            if(poke==user.mainDeck[i]){
                user.mainDeck.splice(i,1)
                break;
            
        }
    }
    user.mainDeck =user.mainDeck.filter((h)=>{return h!=null})

    if(deckName=="d1"){
        arr1=user.mainDeck
    }

    if(deckName=="d2"){
        arr2=user.mainDeck
    }

    if(deckName=="d3"){
        arr3=user.mainDeck
        
    }

        axios.put(`http://localhost:8000/api/user/${user._id}`,{mainDeck:user.mainDeck,deck1:arr1,deck2:arr2,deck3:arr3,reserve:user.reserve}).then((res)=>{
            window.location.reload(false);
        }).catch((err)=>{console.log(err)})

    }

    const deckAdd=(e,poke)=>{
        e.preventDefault();

        if(user.mainDeck.length>=30){
            alert("Deck is at max")
            return
        }

        var arr1=user.deck1
        var arr2= user.deck2
        var arr3= user.deck3

        user.mainDeck.push(poke)

        for(let i=0; i<user.reserve.length; i++){
            if(poke==user.reserve[i]){
                user.reserve.splice(i,1)
                break;
            
        }
    }
    user.reserve =user.reserve.filter((h)=>{return h!=null})

    if(deckName=="d1"){
        arr1=user.mainDeck
    }

    if(deckName=="d2"){
        arr2=user.mainDeck
    }

    if(deckName=="d3"){
        arr3=user.mainDeck
        
    }

        axios.put(`http://localhost:8000/api/user/${user._id}`,{mainDeck:user.mainDeck,deck1:arr1,deck2:arr2,deck3:arr3,reserve:user.reserve}).then((res)=>{
            window.location.reload(false);
        }).catch((err)=>{console.log(err)})

    }

    const reserveDelete=(e,poke)=>{
        e.preventDefault();
        for(let i=0; i<user.reserve.length; i++){
            if(poke==user.reserve[i]){
                user.reserve.splice(i,1)
                break;
            
            }
        }
        user.reserve =user.reserve.filter((h)=>{return h!=null})

        axios.put(`http://localhost:8000/api/user/${user._id}`,{reserve:user.reserve}).then((res)=>{
            window.location.reload(false);
        }).catch((err)=>{console.log(err)})
    }

    const nameEdit=(e)=>{
        e.preventDefault()

        axios.put(`http://localhost:8000/api/user/${user._id}`,user).then((res)=>{
            window.location.reload(false);
        }).catch((err)=>{console.log(err)})
    }

    const searchDb=()=>{
        console.log(searchItem)
        var word=searchItem

        if (reserves.length==0){
           axios.get(`http://localhost:8000/api/user/${user._id}`).then(((res)=>{
               setReserves(res.data.reserve)
           })).catch((err)=>{console.log(err)})
        }

        if(searchItem.length<=1){
            setReserves(reserves.filter((poke)=> poke.slice(0,1).toLowerCase()==searchItem.slice(0,1).toLowerCase()))
            
            return
        }
        
            setReserves(reserves.filter((poke)=> poke.slice(0,2).toLowerCase()==searchItem.slice(0,2).toLowerCase()))
        
        if(searchItem.length>=5 && searchItem.length<8){ 
            setReserves(reserves.filter((poke)=> poke.slice(0,5).toLowerCase()==searchItem.slice(0,5).toLowerCase()))}
       
        if(searchItem.length>=10){
            setReserves(reserves.filter((poke)=> poke.slice(0,8).toLowerCase()==searchItem.slice(0,8).toLowerCase()))
        }
    }

    const directAdd=(e)=>{
        e.preventDefault()
        var arr=reserves.filter((poke)=>poke.toLowerCase().includes(searchItem.toLowerCase()))

        if(arr.length==0){
            alert("You do not own that card/it doesnt exist")
            return
        }

        deckAdd(e,arr[0])
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
            <div style={{backgroundColor:"black",height:1000,width:1900,marginTop:3}}>
                    <h1 style={{color:"white"}}>Deck Manager</h1>
                    <button className="btn btn-light" onClick={(e)=>{e.preventDefault();
                                            navi("/home")}} >Finish</button>
                    <div style={{width:1900,height:1000,backgroundColor:"black",display:"flex"}}>{/*new*/}
                    <div style={{height:750, width:450}} className={`${test.type1}bg contain moveCard`}> {/*------------------------------------------------------------------------------------------------big card */}
                        <div style={{width:450, height: 75,  display:"flex",justifyContent:"space-around", alignItems:"center", flexWrap:"wrap",borderStyle:"solid",borderColor:"white"}} className={`${test.type1}bg`}>
                            <h2 className="text highlightCard">{test.name}</h2>
                            
                                {test.type1=="p"?<p></p>:<h2 className="text highlightCard">Hp: {test.hp}</h2>}
                                <img className="cardtype" src={require(`../photos/symbols/${test.type1}.png`)}/>
                                <img className="cardtype" src={require(`../photos/symbols/${test.type2}.png`)}/>
                            
                        </div>
                        <div style={{width:450, height:650,borderStyle:"solid",borderColor:"white"}} className={`${test.name} ${test.type1}bg`}>
                            <div style={{position: "relative", top: 400}}>
                            <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}}>
                                <h3 className="text highlightCard">{test.attack1}  {test.attack1Damage}</h3> 
                                <img className="cardtype3" src={require(`../photos/symbols/${test.attack1Type1}.png`)}/> 
                                <img style={{marginRight: 100}} className="cardtype3" src={require(`../photos/symbols/${test.attack1Type2}.png`)}/>
                            </div>
                            <p className="text outline"> {test.attack1Des} </p>
                            <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}} >
                                {test.type1=="p"?<p></p>:<h3 className="text highlightCard">{test.attack2}  {test.attack2Damage}</h3> }
                                <img className="cardtype3" src={require(`../photos/symbols/${test.attack2Type1}.png`)}/> 
                                <img style={{marginRight: 100}} className="cardtype3" src={require(`../photos/symbols/${test.attack2Type2}.png`)}/>
                            </div>
                            <p className="text outline">{test.attack2Des} </p>
                            <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}} >
                               {test.type1=="p"? <p></p>:<h3 className="text highlightCard">{test.attack3}  {test.attack3Damage}</h3> } 
                                <img className="cardtype3" src={require(`../photos/symbols/${test.attack3Type1}.png`)}/> 
                                <img style={{marginRight: 100}} className="cardtype3" src={require(`../photos/symbols/${test.attack3Type2}.png`)}/>
                            </div>
                            <p className="text outline">{test.attack3Des} </p>
                            </div>
 
                        </div>
                        {
                            test.prev=="Spell Card"?<div style={{width:450,height:75,  display:"flex", justifyContent:"space-around",alignItems:"center", flexWrap:"wrap",borderStyle:"solid",borderColor:"white"}} className={`${test.type1}bg`}></div>:
                        
                        <div style={{width:450,height:75,  display:"flex", justifyContent:"space-around",alignItems:"center", flexWrap:"wrap",borderStyle:"solid",borderColor:"white"}} className={`${test.type1}bg`}>
                            <h5 className="text highlightCard">Weakness:</h5>
                            <img className="cardtype2" src={require(`../photos/symbols/${test.weak1}.png`)}/>
                            <h5 className="text highlightCard">x{test.weak1Amount}</h5>
                            <img className="cardtype2" src={require(`../photos/symbols/${test.weak2}.png`)}/>
                            <h5 className="text highlightCard">x{test.weak2Amount}</h5>
                            <h5 className="text highlightCard">Resist:</h5>
                            <img className="cardtype2" src={require(`../photos/symbols/${test.resist1}.png`)}/>
                            <h5 className="text highlightCard">-{test.resist1Amount}</h5>
                            <img className="cardtype2" src={require(`../photos/symbols/${test.resist2}.png`)}/>
                            <h5 className="text highlightCard">-{test.resist2Amount}</h5>
                            <h5 className="text highlightCard">Prev:{test.prev}</h5>
                        </div>}

                    </div>
                    <div className="moveDude" style={{width:800,height:960,backgroundColor:"black"}}>
                        <h2 style={{color:"white"}}>Deck: </h2> 
                        {
                            deckName=="d1"?
                            <form onSubmit={(e)=>{nameEdit(e)}}> <input type="text" name="deck1n" value={user.deck1n} onChange={(e)=>{setUser({...user,deck1n:e.target.value})}}/> <button style={{marginBottom:5}} className="btn btn-light" type="submit">Rename</button></form>:
                            deckName=="d2"?
                            <form  onSubmit={(e)=>{nameEdit(e)}}> <input type="text" name="deck2n" value={user.deck2n} onChange={(e)=>{setUser({...user,deck2n:e.target.value})}}/><button style={{marginBottom:5}} className="btn btn-light" type="submit">Rename</button></form>:
                            deckName=="d3"?
                            <form  onSubmit={(e)=>{nameEdit(e)}}> <input type="text" name="deck3n" value={user.deck3n} onChange={(e)=>{setUser({...user,deck3n:e.target.value})}}/> <button style={{marginBottom:5}} className="btn btn-light" type="submit">Rename</button></form>
                            :<div></div>


                        }
                        
                        <div style={{backgroundColor:"darkslategray",width:500,height:200,marginLeft:150,display:"flex",flexWrap:"wrap", overflow:"scroll", overflowX:"hidden"}}>
                            {deck.map((poke,index)=>{
                                return(
                                    <>
                                    <div style={{display:"flex",marginBottom:5,marginLeft:5,marginRight:5,height:30,borderStyle:"solid",borderColor:"white"}}>
                                        <p id={`de${index}`} onClick={(e)=>{viewHandeler(e,poke)}} onMouseEnter={(e)=>{turnBlack(e,index.toString(),"de")}} onMouseLeave={(e)=>{turnWhite(e,index.toString(),"de")}} className="text">{poke}</p>
                                        <button onClick={(e)=>{deckRemove(e,poke)}} style={{marginLeft:10}} type="button" aria-label="Remove" className="btn-close"></button>
                                    </div>
                                    </>
                                )
                            })}

          

                        </div>
                        <h5 style={{color:"white"}}>{deck.length}/30 (must have 20 cards minimum)</h5>
                        <h2 style={{color:"white"}}>Cards: </h2>
                        <div style={{backgroundColor:"black",width:500,height:600,marginLeft:150}}>
                            <h4 style={{color:"white"}}>Recent</h4>
                            <div style={{backgroundColor:"darkslategray",width:450,height:150,marginLeft:25}}>
                                {
                                    recent.length>=3?
                                    <div> 
                                            <div style={{display:"flex",alignItems:"center",marginTop:5,borderStyle:"solid",borderColor:"white"}}>
                                                <p id={`rec1`} onClick={(e)=>{viewHandeler(e,recent[recent.length-1])}} onMouseEnter={(e)=>{turnBlack(e,"1","rec")}} onMouseLeave={(e)=>{turnWhite(e,"1","rec")}} className="text" style={{marginRight:30,marginLeft:5}}>{recent[recent.length-1]}</p>
                                                <button onClick={(e)=>{deckAdd(e,recent[recent.length-1])}}>Add</button>
                                                <button onClick={(e)=>{reserveDelete(e,recent[recent.length-1])}}>Delete</button>
                                            </div>

                                            <div style={{display:"flex",alignItems:"center",marginTop:5,borderStyle:"solid",borderColor:"white"}}>
                                                <p id={`rec2`} onClick={(e)=>{viewHandeler(e,recent[recent.length-2])}} onMouseEnter={(e)=>{turnBlack(e,"2","rec")}} onMouseLeave={(e)=>{turnWhite(e,"2","rec")}} className="text" style={{marginRight:30,marginLeft:5}}>{recent[recent.length-2]}</p>
                                                <button onClick={(e)=>{deckAdd(e,recent[recent.length-2])}}>Add</button>
                                                <button onClick={(e)=>{reserveDelete(e,recent[recent.length-2])}}>Delete</button>
                                            </div>

                                            <div style={{display:"flex",alignItems:"center",marginTop:5,borderStyle:"solid",borderColor:"white"}}>
                                                <p id={`rec3`} onClick={(e)=>{viewHandeler(e,recent[recent.length-3])}} onMouseEnter={(e)=>{turnBlack(e,"3","rec")}} onMouseLeave={(e)=>{turnWhite(e,"3","rec")}} className="text" style={{marginRight:30,marginLeft:5}}>{recent[recent.length-3]}</p>
                                                <button onClick={(e)=>{deckAdd(e,recent[recent.length-3])}}>Add</button>
                                                <button onClick={(e)=>{reserveDelete(e,recent[recent.length-3])}}>Delete</button>
                                            </div>
                                    </div>:
                                    reserves.length==2?
                                    <div> 
                                            <div style={{display:"flex",alignItems:"center",marginTop:5,borderStyle:"solid",borderColor:"white"}}>
                                                <p id={`rec1`} onClick={(e)=>{viewHandeler(e,recent[recent.length-1])}} onMouseEnter={(e)=>{turnBlack(e,"1","rec")}} onMouseLeave={(e)=>{turnWhite(e,"1","rec")}} className="text" style={{marginRight:30,marginLeft:5}}>{recent[recent.length-1]}</p>
                                                <button onClick={(e)=>{deckAdd(e,recent[recent.length-1])}}>Add</button>
                                                <button onClick={(e)=>{reserveDelete(e,recent[recent.length-1])}}>Delete</button>
                                            </div>

                                            <div style={{display:"flex",alignItems:"center",marginTop:5,borderStyle:"solid",borderColor:"white"}}>
                                                <p id={`rec2`} onClick={(e)=>{viewHandeler(e,recent[recent.length-2])}} onMouseEnter={(e)=>{turnBlack(e,"2","rec")}} onMouseLeave={(e)=>{turnWhite(e,"2","rec")}} className="text" style={{marginRight:30,marginLeft:5}}>{recent[recent.length-2]}</p>
                                                <button onClick={(e)=>{deckAdd(e,recent[recent.length-2])}}>Add</button>
                                                <button onClick={(e)=>{reserveDelete(e,recent[recent.length-2])}}>Delete</button>
                                            </div>
                                    </div>:
                                    reserves.length==1?
                                    <div>
                                         <div style={{display:"flex",alignItems:"center",marginTop:5,borderStyle:"solid",borderColor:"white"}}>
                                                <p id={`rec1`} onClick={(e)=>{viewHandeler(e,recent[recent.length-1])}} onMouseEnter={(e)=>{turnBlack(e,"1","rec")}} onMouseLeave={(e)=>{turnWhite(e,"1","rec")}} className="text" style={{marginRight:30,marginLeft:5}}>{recent[recent.length-1]}</p>
                                                <button onClick={(e)=>{deckAdd(e,recent[recent.length-1])}}>Add</button>
                                                <button onClick={(e)=>{reserveDelete(e,recent[recent.length-1])}}>Delete</button>
                                            </div>
                                    

                                    </div>
                                    :
                                   <div></div>
                                }
                            </div>
                            <div style={{backgroundColor:"darkslategray",width:450,height:400,marginLeft:25,marginTop:5, overflow:"scroll", overflowX:"hidden"}}>
                                <input placeholder="Search" value={searchItem} name="searchItem" onChange={(e)=>{setSearchItem(e.target.value); searchDb()}} type="text"/>
                                <button className="btn btn-dark" style={{marginLeft:5}} onClick={(e)=>{directAdd(e)}}>Add</button>
                                
                                {reserves.map((poke,index)=>{
                                    return(
                                        <>
                                            <div style={{display:"flex",alignItems:"center",marginTop:5,borderStyle:"solid",borderColor:"white"}}>
                                                <p id={`re${index}`} onClick={(e)=>{viewHandeler(e,poke)}} onMouseEnter={(e)=>{turnBlack(e,index.toString(),"re")}} onMouseLeave={(e)=>{turnWhite(e,index.toString(),"re")}} className="text" style={{marginRight:30,marginLeft:5}}>{poke}</p>
                                                <button onClick={(e)=>{deckAdd(e,poke)}}>Add</button>
                                                <button onClick={(e)=>{reserveDelete(e,poke)}}>Delete</button>
                                            </div>
                                        </>
                                    )
                                })}
  

                            </div>
                        </div>
                        
                    </div>
                    </div>
            </div>
        </div>
    )

}

export default ManageDeck