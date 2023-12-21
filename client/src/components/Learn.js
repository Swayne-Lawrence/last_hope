import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router"
import { useParams } from "react-router";

const Learn = props =>{
    const [user,setUser]= useState({})
    const navi = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/logged",{withCredentials:true}).then((res)=>{
            
            setUser(res.data)

        }).catch((err)=>{console.log(err)})

    },[])

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
            <div style={{height:2600, backgroundColor:"black", marginTop: 2}}>
                <h1 style={{color:"white"}}>How To Play</h1>

                <div style={{marginTop: 15}}>
                    <h2  className="whiter" style={{textDecoration:"underline"}}>Basics</h2>
                    <h4 className="whiter">Each player starts with 600 health and a deck of 20-30 cards. The objective</h4>
                    <h4 className="whiter">of this game is to defeat your opponent by lowering their health to 0, killing </h4>
                    <h4 className="whiter"> all  pokemon in their deck that are able to be summoned without </h4>
                    <h4 className="whiter">tributing(will go over summoning later), or getting them to surrender.</h4>
                    <h4 className="whiter">Players can summon up to 2 pokemon and each pokemon has its own health, attacks, </h4>
                    <h4 className="whiter">weaknesses, and resistances. When all pokemon your oppenent currently summoned have been killed</h4>
                    <h4 className="whiter"> you then gain the oppurtunity to attack them directly with your pokemon. </h4>
                    <h4 className="whiter">(you can also attack them directly if they haven't summoned a pokemon, unless it is the</h4>
                    <h4 className="whiter">first turn of the match).Killing a pokemon that has been summoned </h4>
                    <h4 className="whiter">will automatically damage your oppenents health by 100.</h4>
                </div>

                <div style={{marginTop: 15}}>
                    <h2 className="whiter" style={{textDecoration:"underline"}}>Summoning</h2>
                    <h4 className="whiter">Tributing in this game is summoning a pokemon by selecting a pokemon in your hand and then </h4>
                    <h4 className="whiter"> clicking on a space on the field that already has a pokemon on it (instead of  selecting a blank space</h4>
                    <h4 className="whiter"> which is how you would normally summon).There are three different summoning types, basic stage pokemon summoning, </h4>
                    <h4 className="whiter">pokemon evolution summoning(or tributing ), and legendary pokemon summoning(also called tributing).</h4>
                    <h4 className="whiter">Basic stage pokemon summoning is the summoning of basic stage pokemon (any pokemon with _b after their name)</h4>
                    <h4 className="whiter"> and does not have any summoning requirements. Even if a summoning spot is taken you are</h4>
                    <h4 className="whiter">able to discard whatever pokemon that is currently on the space and then summon any basic </h4>
                    <h4 className="whiter">stage pokemon(this would be a useful strategy if your current pokemon is  facing a pokemon it's weak against),</h4>
                    <h4 className="whiter">however you can only do this a limited amount of times before you face a health penalty(this is for balancing purposes). </h4>
                    <h4 className="whiter">Pokemon evolution summoning is the summoning of the evolved version of a pokemon</h4>
                    <h4 className="whiter">and it is required that you tribute whatever the previous stage of that pokemon is in order to</h4>
                    <h4 className="whiter"> complete the summons(each card shows its previous stage  at the  bottom of it next to the abbreviation "Prev").</h4>
                    <h4 className="whiter">Legendary pokemon (any pokemon with _l after their name) are the most powerful pokemon in this game and summoning them requires that you</h4>
                    <h4 className="whiter">tribute 2 pokemon. This is done like a normal summon but requires that both of </h4>
                    <h4 className="whiter">your summoning spaces have pokemon on them in order to be successful.</h4>
                </div>

                <div style={{marginTop: 15}}>
                <h2 className="whiter" style={{textDecoration:"underline"}}>Spell Cards</h2>
                    <h4 className="whiter">Spell cards in this game can be used to heal your pokemon,</h4>
                    <h4 className="whiter">boost their attack, and give you other advantages such as an extra draw </h4>
                    <h4 className="whiter">or the ability to summon multiple pokemon in a turn. Some spell cards do have their</h4>
                    <h4 className="whiter">limit such as, you can only use healing spell cards to heal a single pokemon for a total of 400hp</h4>
                    <h4 className="whiter">(once that pokemon reaches that limit futher use of healing spell cards on it won't work) and</h4>
                    <h4 className="whiter">you can only use one buff/debuff spell card on a pokemon. Every spell card in this</h4>
                    <h4 className="whiter">game can be purchased at the in game store (purchased using tokens you earn by playing).</h4>
                </div>

                <div style={{marginTop: 15}}>
                <h2 className="whiter" style={{textDecoration:"underline"}}>Pokemon Types</h2>
                <div className="flexy contain" style={{width:1000, backgroundColor:"",marginRight:20}}>
                <img className="cardtype4 " src={require(`../photos/symbols/fire.png`)}/> 
                <h5 className="" style={{color:"yellow"}}>- Fire</h5>
                </div>
                <div className="flexy contain" style={{width:1000, backgroundColor:"",marginRight:20}}>
                <img className="cardtype4 " src={require(`../photos/symbols/water.png`)}/> 
                <h5 className="" style={{color:"yellow"}}>- Water</h5>
                </div>
                <div className="flexy contain" style={{width:1000, backgroundColor:"",marginRight:20}}>
                <img className="cardtype4 " src={require(`../photos/symbols/dark.png`)}/> 
                <h5 className="" style={{color:"yellow"}}>- Dark</h5>
                </div>
                <div className="flexy contain" style={{width:1000, backgroundColor:"",marginRight:20}}>
                <img className="cardtype4 " src={require(`../photos/symbols/dragon.png`)}/> 
                <h5 className="" style={{color:"yellow"}}>- Dragon</h5>
                </div>
                <div className="flexy contain" style={{width:1000, backgroundColor:"",marginRight:20}}>
                <img className="cardtype4 " src={require(`../photos/symbols/electric.png`)}/> 
                <h5 className="" style={{color:"yellow"}}>- Electric</h5>
                </div>
                <div className="flexy contain" style={{width:1000, backgroundColor:"",marginRight:20}}>
                <img className="cardtype4 " src={require(`../photos/symbols/fairy.png`)}/> 
                <h5 className="" style={{color:"yellow"}}>- Fairy</h5>
                </div>
                <div className="flexy contain" style={{width:1000, backgroundColor:"",marginRight:20}}>
                <img className="cardtype4 " src={require(`../photos/symbols/fighting.png`)}/> 
                <h5 className="" style={{color:"yellow"}}>- Fighting</h5>
                </div>
                <div className="flexy contain" style={{width:1000, backgroundColor:"",marginRight:20}}>
                <img className="cardtype4 " src={require(`../photos/symbols/flying.png`)}/> 
                <h5 className="" style={{color:"yellow"}}>- Flying</h5>
                </div>
                <div className="flexy contain" style={{width:1000, backgroundColor:"",marginRight:20}}>
                <img className="cardtype4 " src={require(`../photos/symbols/ghost.png`)}/> 
                <h5 className="" style={{color:"yellow"}}>- Ghost</h5>
                </div>
                <div className="flexy contain" style={{width:1000, backgroundColor:"",marginRight:20}}>
                <img className="cardtype4 " src={require(`../photos/symbols/grass.png`)}/> 
                <h5 className="" style={{color:"yellow"}}>- Grass</h5>
                </div>
                <div className="flexy contain" style={{width:1000, backgroundColor:"",marginRight:20}}>
                <img className="cardtype4 " src={require(`../photos/symbols/ground.png`)}/> 
                <h5 className="" style={{color:"yellow"}}>- Ground</h5>
                </div>
                <div className="flexy contain" style={{width:1000, backgroundColor:"",marginRight:20}}>
                <img className="cardtype4 " src={require(`../photos/symbols/ice.png`)}/> 
                <h5 className="" style={{color:"yellow"}}>- Ice</h5>
                </div>
                <div className="flexy contain" style={{width:1000, backgroundColor:"",marginRight:20}}>
                <img className="cardtype4 " src={require(`../photos/symbols/normal.png`)}/> 
                <h5 className="" style={{color:"yellow"}}>- Normal</h5>
                </div>
                <div className="flexy contain" style={{width:1000, backgroundColor:"",marginRight:20}}>
                <img className="cardtype4 " src={require(`../photos/symbols/poison.png`)}/> 
                <h5 className="" style={{color:"yellow"}}>- Poison</h5>
                </div>
                <div className="flexy contain" style={{width:1000, backgroundColor:"",marginRight:20}}>
                <img className="cardtype4 " src={require(`../photos/symbols/psychic.png`)}/> 
                <h5 className="" style={{color:"yellow"}}>- Psychic</h5>
                </div>
                <div className="flexy contain" style={{width:1000, backgroundColor:"",marginRight:20}}>
                <img className="cardtype4 " src={require(`../photos/symbols/rock.png`)}/> 
                <h5 className="" style={{color:"yellow"}}>- Rock</h5>
                </div>
                <div className="flexy contain" style={{width:1000, backgroundColor:"",marginRight:20}}>
                <img className="cardtype4 " src={require(`../photos/symbols/steel.png`)}/> 
                <h5 className="" style={{color:"yellow"}}>- Steel</h5>
                </div>{/*<h4 className="whiter"></h4>*/}
                <h4 className="whiter">A Pokemons type determines its, weakness, resistances, and some of the attacks it</h4>
                <h4 className="whiter">can use. Attacks also have their own typing and using an attack that matches an</h4>
                <h4 className="whiter">opponents pokemons weakness will do extra damage to them. Alternativly, using and attack that</h4>
                <h4 className="whiter">matches an opponents resistances will do less damage to them.</h4>


                </div>
                <div style={{marginTop: 15}}>
                <h2 className="whiter" style={{textDecoration:"underline"}}>Status Effects</h2>
                <h4 className="whiter"><span style={{color:"yellow"}}>Burned: </span>Inflicts damage over time </h4>
                <h4 className="whiter"><span style={{color:"yellow"}}>Poisoned: </span>Inflicts less damage over time then burned but has a longer duration </h4>
                <h4 className="whiter"><span style={{color:"yellow"}}>Paralyzed: </span>Pokemon has a chance to be unable to make an attack </h4>
                <h4 className="whiter"><span style={{color:"yellow"}}>Confused: </span>Pokemon has a chance to be unable to make an attack and attacks itself </h4>
                <h4 className="whiter"><span style={{color:"yellow"}}>Frozen: </span>Pokemon are unable to attack </h4>
                <h4 className="whiter"><span style={{color:"yellow"}}>Charmed: </span>Inflicts damage over time on opponents pokemon while healing your pokemon</h4>
                <h4 className="whiter"><span style={{color:"yellow"}}>Cursed: </span>Does delayed damage and makes pokemon unable to be effected by spell cards(except status heal)</h4>
                </div>
                <div style={{marginTop: 30}}> 
                <h4 className="whiter">Status effects have a chance to be inflicted to a pokemon by use of certain attack moves.</h4>
                <h4 className="whiter">They can be removed by using the spell card status heal or if enough turns have passed.</h4>
                </div>

            </div>
        </div>
    )
}
export default Learn