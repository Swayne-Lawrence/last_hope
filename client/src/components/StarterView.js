import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router"
import { useParams } from "react-router";

const StarterView =(props)=>{
    const navi = useNavigate()

    const [searchItem,setSearchItem]=useState("");

    const {start} = useParams()
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

    const [gen1,setGen1]=useState(["Potion_sp","Potion_sp","Potion_sp","StatusHeal_sp","ExtraDraw_sp","Charmander_b",
       "Charmander_b","Charmeleon","Charizard","Squirtle_b", "Squirtle_b","Wartortle","Blastoise"
   ,"Bulbasaur_b","Bulbasaur_b","Ivysaur","Venusaur","Rattata_b","Rattata_b","Raticate"])

const [gen2,setGen2]=useState(["Potion_sp","Potion_sp","Potion_sp","StatusHeal_sp","ExtraDraw_sp","Cyndaquil_b",
   "Cyndaquil_b","Quilava","Typhlosion","Totodile_b", "Totodile_b","Croconaw","Feraligatr"
,"Chikorita_b","Chikorita_b","Bayleef","Meganium","Sentret_b","Sentret_b","Furret"])

const [gen3,setGen3]=useState(["Potion_sp","Potion_sp","Potion_sp","StatusHeal_sp","ExtraDraw_sp","Torchic_b",
   "Torchic_b","Combusken","Blaziken","Mudkip_b", "Mudkip_b","Marshtomp","Swampert"
,"Treecko_b","Treecko_b","Grovyle","Sceptile","Zigzagoon_b","Zigzagoon_b","Linoone"])

const [gen4,setGen4]=useState(["Potion_sp","Potion_sp","Potion_sp","StatusHeal_sp","ExtraDraw_sp","Chimchar_b",
   "Chimchar_b","Monferno","Infernape","Piplup_b", "Piplup_b","Prinplup","Empoleon"
,"Turtwig_b","Turtwig_b","Grotle","Torterra","Bidoof_b","Bidoof_b","Bibarel"])

const [gen5,setGen5]=useState(["Potion_sp","Potion_sp","Potion_sp","StatusHeal_sp","ExtraDraw_sp","Tepig_b",
"Tepig_b","Pignite","Emboar","Oshawott_b", "Oshawott_b","Dewott","Samurott"
,"Snivy_b","Snivy_b","Servine","Serperior","Patrat_b","Patrat_b","Watchog"])

const [gen6,setGen6]=useState(["Potion_sp","Potion_sp","Potion_sp","StatusHeal_sp","ExtraDraw_sp","Fennekin_b",
"Fennekin_b","Braixen","Delphox","Froakie_b", "Froakie_b","Frogadier","Greninja"
,"Chespin_b","Chespin_b","Quilladin","Chesnaught","Bunnelby_b","Bunnelby_b","Diggersby"])

const [gen7,setGen7]=useState(["Potion_sp","Potion_sp","Potion_sp","StatusHeal_sp","ExtraDraw_sp","Litten_b",
"Litten_b","Torracat","Incineroar","Popplio_b", "Popplio_b","Brionne","Primarina"
,"Rowlet_b","Rowlet_b","Dartrix","Decidueye","Yungoos_b","Yungoos_b","Gumshoos"])
const [gen8,setGen8]=useState(["Potion_sp","Potion_sp","Potion_sp","StatusHeal_sp","ExtraDraw_sp","Scorbunny_b",
"Scorbunny_b","Raboot","Cinderace","Sobble_b", "Sobble_b","Drizzile","Inteleon"
,"Grookey_b","Grookey_b","Thwackey","Rillaboom","Skwovet_b","Skwovet_b","Greedent"])



    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/logged",{withCredentials:true}).then((res)=>{
            console.log(res.data)
               /*  if(res.data.wins.length>0 || res.data.loses.length>0){
                alert("already selected a starter")
                navi("/home")
            }*/
            setUser(res.data)
            
            setReserves(res.data.reserve)
            setRecent(res.data.reserve)
            if(start=="g1"){
                setDeck(gen1)
            }
            if(start=="g2"){
                setDeck(gen2)
            }
            if(start=="g3"){
                setDeck(gen3)
            }
            if(start=="g4"){
                setDeck(gen4)
            }
            if(start=="g5"){
                setDeck(gen5)
            }
            if(start=="g6"){
                setDeck(gen6)
            }
            if(start=="g7"){
                setDeck(gen7)
            }
            if(start=="g8"){
                setDeck(gen8)
            }

            if(res.data.view.length>0){
                axios.get(`http://localhost:8000/api/pokemon/${res.data.view}`).then((res)=>{
                    console.log(res.data)
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

    const selector=(e,arr)=>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/user/${user._id}`,{mainDeck:arr,deck1:arr}).then((res)=>{
            navi("/avatar")
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
            setReserves(reserves.filter((poke)=> poke.slice(0,5).toLowerCase()==searchItem.slice(0,1).toLowerCase()))}
       
        if(searchItem.length>=10){
            setReserves(reserves.filter((poke)=> poke.slice(0,8).toLowerCase()==searchItem.slice(0,1).toLowerCase()))
        }
    }



    return(
        <div>
            <div className="flexy contain" style={{backgroundColor:"white", width:1500}}>
                <h2 className="contain">Swiz</h2> <img className="slogo contain" src={require(`../photos/symbols/button.jpg`)}/> <h2 className="contain">Card-Game</h2>
            </div>

            <div style={{backgroundColor:"black",height:1000,width:1900,marginTop:3}}>
                    <h1 style={{color:"white"}}>Deck View</h1>
                    <button onClick={(e)=>{
                        e.preventDefault(e)
                        navi("/starter")
                    }} className="btn btn-light">Return</button>
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

                        
                        <div style={{backgroundColor:"darkslategray",width:500,height:200,marginLeft:150,display:"flex",flexWrap:"wrap", overflow:"scroll", overflowX:"hidden"}}>
                            {deck.map((poke,index)=>{
                                return(
                                    <>
                                    <div style={{display:"flex",marginBottom:5,marginLeft:5,marginRight:5,height:30,borderStyle:"solid",borderColor:"white"}}>
                                        <p id={`de${index}`} onClick={(e)=>{viewHandeler(e,poke)}} onMouseEnter={(e)=>{turnBlack(e,index.toString(),"de")}} onMouseLeave={(e)=>{turnWhite(e,index.toString(),"de")}} className="text">{poke}</p>
                                        
                                    </div>
                                    </>
                                )
                            })}

          

                        </div>
                        <button onClick={(e)=>{selector(e,deck)}} className="btn btn-light" style={{marginTop:10}}>Select This Deck</button>
                       
                        
                    </div>
                    </div>
            </div>
        </div>
    )

}

export default StarterView