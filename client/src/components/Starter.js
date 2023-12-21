import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router"
import { useParams } from "react-router";

const Starter = (props)=>{
    const navi = useNavigate()
    const [user,setUser]= useState({})
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
            setUser(res.data)

          /*  if(res.data.wins.length>0 || res.data.loses.length>0){
                alert("already selected a starter")
                navi("/home")
            }*/

        }).catch((err)=>{console.log(err)})
    },[])

    const selector=(e,arr)=>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/user/${user._id}`,{mainDeck:arr,deck1:arr}).then((res)=>{
            navi("/avatar")
        }).catch((err)=>{console.log(err)})
    }

    const viewhand=(e,gen)=>{
        e.preventDefault()
        navi(`/starterView/${gen}`)
    }

    return(
        <div>
            <div className="flexy contain" style={{backgroundColor:"white", width:1500}}>
                <h2 className="contain">Swiz</h2> <img className="slogo contain" src={require(`../photos/symbols/button.jpg`)}/> <h2 className="contain">Card-Game</h2>
            </div>
            <h1>Select a Starting Deck</h1>
            <div className="contain" style={{width:1500, height:750, borderStyle:"solid", borderColor:"black"}}>
            <div className= "flexy contain" style={{backgroundColor:"",width:1200, marginTop:30}}>
                <div style={{borderStyle:"solid", borderColor:"black"}}>
                    
                    <img className="minimize2" src={require(`../photos/symbols/gen1.jpg`)}/>
                    <h5>{} Gen 1</h5> 
                    <button className="btn btn-dark" onClick={(e)=>{viewhand(e,"g1")}}> View</button> <button className="btn btn-dark" onClick={(e)=>{selector(e,gen1)}}> Select</button>
                </div>
                <div style={{borderStyle:"solid", borderColor:"black",marginLeft:5,marginRight:5}}>
                    
                    <img className="minimize3" src={require(`../photos/symbols/gen2.jpg`)}/>
                    <h5>{} Gen 2</h5> 
                    <button className="btn btn-dark" onClick={(e)=>{viewhand(e,"g2")}}> View</button> <button className="btn btn-dark" onClick={(e)=>{selector(e,gen2)}}> Select</button>
                </div>
                <div style={{borderStyle:"solid", borderColor:"black"}}>
                    
                    <img className="minimize2" src={require(`../photos/symbols/gen3.jpg`)}/>
                    <h5>{} Gen 3</h5> 
                    <button className="btn btn-dark" onClick={(e)=>{viewhand(e,"g3")}}> View</button> <button className="btn btn-dark" onClick={(e)=>{selector(e,gen3)}}> Select</button>
                </div>

            </div>
            <div className= "flexy contain" style={{backgroundColor:"",width:1200, marginTop:30}}>
                <div style={{borderStyle:"solid", borderColor:"black"}}>
                    
                    <img className="minimize2" src={require(`../photos/symbols/gen4.jpg`)}/>
                    <h5>{} Gen 4</h5> 
                    <button className="btn btn-dark" onClick={(e)=>{viewhand(e,"g4")}}> View</button> <button className="btn btn-dark" onClick={(e)=>{selector(e,gen4)}}> Select</button>
                </div>
                <div style={{borderStyle:"solid", borderColor:"black",marginLeft:5,marginRight:5}}>
                    
                    <img className="minimize2" src={require(`../photos/symbols/gen5.jpg`)}/>
                    <h5>{} Gen 5</h5> 
                    <button className="btn btn-dark" onClick={(e)=>{viewhand(e,"g5")}}> View</button> <button className="btn btn-dark" onClick={(e)=>{selector(e,gen5)}}> Select</button>
                </div>
                <div style={{borderStyle:"solid", borderColor:"black"}}>
                   
                    <img className="minimize2" src={require(`../photos/symbols/gen6.jpg`)}/>
                    <h5>{} Gen 6</h5> 
                    <button className="btn btn-dark" onClick={(e)=>{viewhand(e,"g6")}}> View</button> <button className="btn btn-dark" onClick={(e)=>{selector(e,gen6)}}> Select</button>
                </div>

            </div>
            <div className= "flexy contain" style={{backgroundColor:"",width:1200,height:220, marginTop:30, position:"relative",left:100}}>
                <div style={{borderStyle:"solid", borderColor:"black", marginRight: 15}}>
                    
                    <img style={{width:250}} className="minimize2" src={require(`../photos/symbols/gen7.jpg`)}/>
                    <h5>{} Gen 7</h5> 
                    <button className="btn btn-dark" onClick={(e)=>{viewhand(e,"g7")}}> View</button> <button className="btn btn-dark" onClick={(e)=>{selector(e,gen7)}}> Select</button>
                </div>
                <div style={{borderStyle:"solid", borderColor:"black"}}>
                    
                    <img style={{width:250}} className="minimize2" src={require(`../photos/symbols/gen8.jpg`)}/>
                    <h5>{} Gen 8</h5> 
                    <button className="btn btn-dark" onClick={(e)=>{viewhand(e,"g8")}}> View</button> <button className="btn btn-dark" onClick={(e)=>{selector(e,gen8)}}> Select</button>
                </div>
               

            </div>
            
            </div>
        </div>
    )

}

export default Starter