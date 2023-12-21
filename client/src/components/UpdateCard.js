import React ,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

const UpdateCard = (props)=>{
const {name} = useParams();
const [user, setUser]=useState({})
const navi = useNavigate()
const [pokemon,setPokemon]=useState({})
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
    axios.get(`http://localhost:8000/api/pokemon/${name}`).then((res)=>{
        setPokemon(res.data[0])
        setTest(res.data[0])
    }).catch((err)=>{console.log(err)})
    axios.get("http://localhost:8000/api/user/logged",{withCredentials:true}).then((res)=>{
        if(res.data.username != "admin_swiz"){
            navi("/home")
        }
    }).catch((err)=>{console.log(err); navi("/login")})
},[])

const submitHandeler=(e)=>{
    e.preventDefault()
    axios.put(`http://localhost:8000/api/pokemon/${name}`,pokemon).then((res)=>{
        console.log(res.data)
    }).catch((err)=>{
        console.log((err))
    })
}

    return(
        <div>
                     <form onSubmit={(e)=>{submitHandeler(e)}}>
                <div>
                    <label>name</label>
                    <input type="text" name="name" value={pokemon.name} onChange={(e)=>{setPokemon({...pokemon,name:e.target.value})}}/>
                </div>
                <div>
                    <label>type1</label>
                    <select  name="type1" value={pokemon.type1} onChange={(e)=>{setPokemon({...pokemon,type1:e.target.value})}}>
                        <option value=".">.</option>
                        <option value="normal">normal</option>
                        <option value="fire">fire</option>
                        <option value="water">water</option>
                        <option value="electric">electric</option>
                        <option value="grass">grass</option>
                        <option value="ice">ice</option>
                        <option value="fighting">fighting</option>
                        <option value="poison">poison</option>
                        <option value="ground">ground</option>
                        <option value="flying">flying</option>
                        <option value="psychic">psychic</option>
                        <option value="bug">bug</option>
                        <option value="rock">rock</option>
                        <option value="ghost">ghost</option>
                        <option value="dragon">dragon</option>
                        <option value="dark">dark</option>
                        <option value="steel">steel</option>
                        <option value="fairy">fairy</option>
                        <option value="p">p</option>
                    </select>
                </div>
                <div>
                    <label>type2</label>
                    <select  name="type2" value={pokemon.type2} onChange={(e)=>{setPokemon({...pokemon,type2:e.target.value})}}>
                        <option value=".">.</option>
                        <option value="normal">normal</option>
                        <option value="fire">fire</option>
                        <option value="water">water</option>
                        <option value="electric">electric</option>
                        <option value="grass">grass</option>
                        <option value="ice">ice</option>
                        <option value="fighting">fighting</option>
                        <option value="poison">poison</option>
                        <option value="ground">ground</option>
                        <option value="flying">flying</option>
                        <option value="psychic">psychic</option>
                        <option value="bug">bug</option>
                        <option value="rock">rock</option>
                        <option value="ghost">ghost</option>
                        <option value="dragon">dragon</option>
                        <option value="dark">dark</option>
                        <option value="steel">steel</option>
                        <option value="fairy">fairy</option>
                        <option value="p">p</option>
                    </select>
                </div>
                <div>
                    <label>hp</label>
                    <input type="number" name="hp" value={pokemon.hp} onChange={(e)=>{setPokemon({...pokemon,hp:e.target.value})}} />
                </div>
                <div>
                    <label>prev</label>
                    <input type="text" name="prev" value={pokemon.prev} onChange={(e)=>{setPokemon({...pokemon,prev:e.target.value})}} />
                </div>

                <div>
                    <label>attack1</label>
                    <input type="text" name="attack1" value={pokemon.attack1} onChange={(e)=>{setPokemon({...pokemon,attack1:e.target.value})}} />
                </div>

                <div>
                    <label>attack1Type1</label>
                    <select  name="attack1Type1" value={pokemon.attack1Type1} onChange={(e)=>{setPokemon({...pokemon,attack1Type1:e.target.value})}}>
                        <option value=".">.</option>
                        <option value="normal">normal</option>
                        <option value="fire">fire</option>
                        <option value="water">water</option>
                        <option value="electric">electric</option>
                        <option value="grass">grass</option>
                        <option value="ice">ice</option>
                        <option value="fighting">fighting</option>
                        <option value="poison">poison</option>
                        <option value="ground">ground</option>
                        <option value="flying">flying</option>
                        <option value="psychic">psychic</option>
                        <option value="bug">bug</option>
                        <option value="rock">rock</option>
                        <option value="ghost">ghost</option>
                        <option value="dragon">dragon</option>
                        <option value="dark">dark</option>
                        <option value="steel">steel</option>
                        <option value="fairy">fairy</option>
                        <option value="p">p</option>
                    </select>
                </div>
                <div>
                    <label>attack1Type2</label>
                    <select  name="attack1Type2" value={pokemon.attack1Type2} onChange={(e)=>{setPokemon({...pokemon,attack1Type2:e.target.value})}}>
                        <option value=".">.</option>
                        <option value="normal">normal</option>
                        <option value="fire">fire</option>
                        <option value="water">water</option>
                        <option value="electric">electric</option>
                        <option value="grass">grass</option>
                        <option value="ice">ice</option>
                        <option value="fighting">fighting</option>
                        <option value="poison">poison</option>
                        <option value="ground">ground</option>
                        <option value="flying">flying</option>
                        <option value="psychic">psychic</option>
                        <option value="bug">bug</option>
                        <option value="rock">rock</option>
                        <option value="ghost">ghost</option>
                        <option value="dragon">dragon</option>
                        <option value="dark">dark</option>
                        <option value="steel">steel</option>
                        <option value="fairy">fairy</option>
                        <option value="p">p</option>
                    </select>
                </div>
                <div>
                    <label>attack1Des</label>
                    <input type="text" name="attack1Des" value={pokemon.attack1Des} onChange={(e)=>{setPokemon({...pokemon,attack1Des:e.target.value})}} />
                </div>
                <div>
                    <label>attack1Damage</label>
                    <input type="number" name="attack1Damage" value={pokemon.attack1Damage} onChange={(e)=>{setPokemon({...pokemon,attack1Damage:e.target.value})}} />
                </div>
                
                <div>
                    <label>attack2</label>
                    <input type="text" name="attack2" value={pokemon.attack2} onChange={(e)=>{setPokemon({...pokemon,attack2:e.target.value})}} />
                </div>

                <div>
                    <label>attack2Type1</label>
                    <select  name="attack2Type1" value={pokemon.attack2Type1} onChange={(e)=>{setPokemon({...pokemon,attack2Type1:e.target.value})}}>
                        <option value=".">.</option>
                        <option value="normal">normal</option>
                        <option value="fire">fire</option>
                        <option value="water">water</option>
                        <option value="electric">electric</option>
                        <option value="grass">grass</option>
                        <option value="ice">ice</option>
                        <option value="fighting">fighting</option>
                        <option value="poison">poison</option>
                        <option value="ground">ground</option>
                        <option value="flying">flying</option>
                        <option value="psychic">psychic</option>
                        <option value="bug">bug</option>
                        <option value="rock">rock</option>
                        <option value="ghost">ghost</option>
                        <option value="dragon">dragon</option>
                        <option value="dark">dark</option>
                        <option value="steel">steel</option>
                        <option value="fairy">fairy</option>
                        <option value="p">p</option>
                    </select>
                </div>
                <div>
                    <label>attack2Type2</label>
                    <select  name="attack2Type2" value={pokemon.attack2Type2} onChange={(e)=>{setPokemon({...pokemon,attack2Type2:e.target.value})}}>
                        <option value=".">.</option>
                        <option value="normal">normal</option>
                        <option value="fire">fire</option>
                        <option value="water">water</option>
                        <option value="electric">electric</option>
                        <option value="grass">grass</option>
                        <option value="ice">ice</option>
                        <option value="fighting">fighting</option>
                        <option value="poison">poison</option>
                        <option value="ground">ground</option>
                        <option value="flying">flying</option>
                        <option value="psychic">psychic</option>
                        <option value="bug">bug</option>
                        <option value="rock">rock</option>
                        <option value="ghost">ghost</option>
                        <option value="dragon">dragon</option>
                        <option value="dark">dark</option>
                        <option value="steel">steel</option>
                        <option value="fairy">fairy</option>
                        <option value="p">p</option>
                    </select>
                </div>
                <div>
                    <label>attack2Des</label>
                    <input type="text" name="attack2Des" value={pokemon.attack2Des} onChange={(e)=>{setPokemon({...pokemon,attack2Des:e.target.value})}} />
                </div>
                <div>
                    <label>attack2Damage</label>
                    <input type="number" name="attack2Damage" value={pokemon.attack2Damage} onChange={(e)=>{setPokemon({...pokemon,attack2Damage:e.target.value})}} />
                </div>
                
                <div>
                    <label>attack3</label>
                    <input type="text" name="attack3" value={pokemon.attack3} onChange={(e)=>{setPokemon({...pokemon,attack3:e.target.value})}} />
                </div>

                <div>
                    <label>attack3Type1</label>
                    <select  name="attack3Type1" value={pokemon.attack3Type1} onChange={(e)=>{setPokemon({...pokemon,attack3Type1:e.target.value})}}>
                        <option value=".">.</option>
                        <option value="normal">normal</option>
                        <option value="fire">fire</option>
                        <option value="water">water</option>
                        <option value="electric">electric</option>
                        <option value="grass">grass</option>
                        <option value="ice">ice</option>
                        <option value="fighting">fighting</option>
                        <option value="poison">poison</option>
                        <option value="ground">ground</option>
                        <option value="flying">flying</option>
                        <option value="psychic">psychic</option>
                        <option value="bug">bug</option>
                        <option value="rock">rock</option>
                        <option value="ghost">ghost</option>
                        <option value="dragon">dragon</option>
                        <option value="dark">dark</option>
                        <option value="steel">steel</option>
                        <option value="fairy">fairy</option>
                        <option value="p">p</option>
                    </select>
                </div>
                <div>
                    <label>attack3Type2</label>
                    <select  name="attack3Type2" value={pokemon.attack3Type2} onChange={(e)=>{setPokemon({...pokemon,attack3Type2:e.target.value})}}>
                        <option value=".">.</option>
                        <option value="normal">normal</option>
                        <option value="fire">fire</option>
                        <option value="water">water</option>
                        <option value="electric">electric</option>
                        <option value="grass">grass</option>
                        <option value="ice">ice</option>
                        <option value="fighting">fighting</option>
                        <option value="poison">poison</option>
                        <option value="ground">ground</option>
                        <option value="flying">flying</option>
                        <option value="psychic">psychic</option>
                        <option value="bug">bug</option>
                        <option value="rock">rock</option>
                        <option value="ghost">ghost</option>
                        <option value="dragon">dragon</option>
                        <option value="dark">dark</option>
                        <option value="steel">steel</option>
                        <option value="fairy">fairy</option>
                        <option value="p">p</option>
                    </select>
                </div>
                <div>
                    <label>attack3Des</label>
                    <input type="text" name="attack3Des" value={pokemon.attack3Des} onChange={(e)=>{setPokemon({...pokemon,attack3Des:e.target.value})}} />
                </div>
                <div>
                    <label>attack3Damage</label>
                    <input type="number" name="attack3Damage" value={pokemon.attack3Damage} onChange={(e)=>{setPokemon({...pokemon,attack3Damage:e.target.value})}} />
                </div>
                <div>
                    <label>weak1</label>
                    <select  name="weak1" value={pokemon.weak1} onChange={(e)=>{setPokemon({...pokemon,weak1:e.target.value})}}>
                        <option value=".">.</option>
                        <option value="normal">normal</option>
                        <option value="fire">fire</option>
                        <option value="water">water</option>
                        <option value="electric">electric</option>
                        <option value="grass">grass</option>
                        <option value="ice">ice</option>
                        <option value="fighting">fighting</option>
                        <option value="poison">poison</option>
                        <option value="ground">ground</option>
                        <option value="flying">flying</option>
                        <option value="psychic">psychic</option>
                        <option value="bug">bug</option>
                        <option value="rock">rock</option>
                        <option value="ghost">ghost</option>
                        <option value="dragon">dragon</option>
                        <option value="dark">dark</option>
                        <option value="steel">steel</option>
                        <option value="fairy">fairy</option>
                        <option value="p">p</option>
                    </select>
                </div>
                <div>
                    <label>weak1Amount</label>
                    <input type="number" name="weak1Amount" value={pokemon.weak1Amount} onChange={(e)=>{setPokemon({...pokemon,weak1Amount:e.target.value})}} />
                </div>
                <div>
                    <label>weak2</label>
                    <select  name="weak2" value={pokemon.weak2} onChange={(e)=>{setPokemon({...pokemon,weak2:e.target.value})}}>
                        <option value=".">.</option>
                        <option value="normal">normal</option>
                        <option value="fire">fire</option>
                        <option value="water">water</option>
                        <option value="electric">electric</option>
                        <option value="grass">grass</option>
                        <option value="ice">ice</option>
                        <option value="fighting">fighting</option>
                        <option value="poison">poison</option>
                        <option value="ground">ground</option>
                        <option value="flying">flying</option>
                        <option value="psychic">psychic</option>
                        <option value="bug">bug</option>
                        <option value="rock">rock</option>
                        <option value="ghost">ghost</option>
                        <option value="dragon">dragon</option>
                        <option value="dark">dark</option>
                        <option value="steel">steel</option>
                        <option value="fairy">fairy</option>
                        <option value="p">p</option>
                    </select>
                </div>
                <div>
                    <label>weak2Amount</label>
                    <input type="number" name="weak2Amount" value={pokemon.weak2Amount} onChange={(e)=>{setPokemon({...pokemon,weak2Amount:e.target.value})}} />
                </div>
                <div>
                    <label>resist1</label>
                    <select  name="resist1" value={pokemon.resist1} onChange={(e)=>{setPokemon({...pokemon,resist1:e.target.value})}}>
                        <option value=".">.</option>
                        <option value="normal">normal</option>
                        <option value="fire">fire</option>
                        <option value="water">water</option>
                        <option value="electric">electric</option>
                        <option value="grass">grass</option>
                        <option value="ice">ice</option>
                        <option value="fighting">fighting</option>
                        <option value="poison">poison</option>
                        <option value="ground">ground</option>
                        <option value="flying">flying</option>
                        <option value="psychic">psychic</option>
                        <option value="bug">bug</option>
                        <option value="rock">rock</option>
                        <option value="ghost">ghost</option>
                        <option value="dragon">dragon</option>
                        <option value="dark">dark</option>
                        <option value="steel">steel</option>
                        <option value="fairy">fairy</option>
                        <option value="p">p</option>
                    </select>
                </div>
                <div>
                    <label>resist1Amount</label>
                    <input type="number" name="resist1Amount" value={pokemon.resist1Amount} onChange={(e)=>{setPokemon({...pokemon,resist1Amount:e.target.value})}} />
                </div>
                <div>
                    <label>resist2</label>
                    <select  name="resist2" value={pokemon.resist2} onChange={(e)=>{setPokemon({...pokemon,resist2:e.target.value})}}>
                        <option value=".">.</option>
                        <option value="normal">normal</option>
                        <option value="fire">fire</option>
                        <option value="water">water</option>
                        <option value="electric">electric</option>
                        <option value="grass">grass</option>
                        <option value="ice">ice</option>
                        <option value="fighting">fighting</option>
                        <option value="poison">poison</option>
                        <option value="ground">ground</option>
                        <option value="flying">flying</option>
                        <option value="psychic">psychic</option>
                        <option value="bug">bug</option>
                        <option value="rock">rock</option>
                        <option value="ghost">ghost</option>
                        <option value="dragon">dragon</option>
                        <option value="dark">dark</option>
                        <option value="steel">steel</option>
                        <option value="fairy">fairy</option>
                        <option value="p">p</option>
                    </select>
                </div>
                <div>
                    <label>resist2Amount</label>
                    <input type="number" name="resist2Amount" value={pokemon.resist2Amount} onChange={(e)=>{setPokemon({...pokemon,resist2Amount:e.target.value})}} />
                </div>

                <button type="submit">submit</button>
            </form>
            <div style={{height:900, width:600}} className={`${test.type1}bg`}> {/*------------------------------------------------------------------------------------------------big card */}
                        <div style={{width:600, height: 75,  display:"flex",justifyContent:"space-around", alignItems:"center", flexWrap:"wrap"}} className={`${test.type1}bg`}>
                            <h2 className="text highlightCard">{test.name}</h2>
                            
                                {test.type1=="p"?<p></p>:<h2 className="text highlightCard">Hp: {test.hp}</h2>}
                                <img className="cardtype" src={require(`../photos/symbols/${test.type1}.png`)}/>
                                <img className="cardtype" src={require(`../photos/symbols/${test.type2}.png`)}/>
                            
                        </div>
                        <div style={{width:550, height:750}} className={`${test.name} ${test.type1}bg`}>
                            <div style={{position: "relative", top: 450}}>
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
                        
                        <div style={{width:600,height:75,  display:"flex", justifyContent:"space-around",alignItems:"center", flexWrap:"wrap"}} className={`${test.type1}bg`}>
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
                        </div>

                    </div>
        </div>
    )
}

export default UpdateCard