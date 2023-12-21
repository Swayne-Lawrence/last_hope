import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router"
import { useParams } from "react-router";

const Chest = (props)=>{
    const [user,setUser]=useState({})
    const navi = useNavigate()
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

       const getRandom= (min,max)=>{
        min=Math.ceil(min);
        max=Math.floor(max);
        return Math.floor(Math.random()*(max-min+1)+min);
    }

       useEffect(()=>{
        axios.get("http://localhost:8000/api/user/logged",{withCredentials:true}).then((res)=>{
            if(res.data.tokens<=0){
                navi("/getcards")
            }
            axios.put(`http://localhost:8000/api/user/${res.data._id}`,{tokens:res.data.tokens-1}).then((res)=>{
                setUser(res.data)

            }).catch((err)=>{console.log(err)})
            
        }).catch((err)=>{console.log(err)})

        axios.get("http://localhost:8000/api/pokemons").then((res)=>{
            var num= getRandom(0,res.data.length-1)
            setTest(res.data[num])
            console.log(num)
        }).catch((err)=>{console.log(err)})

       },[])

       const acceptHandeler = (e)=>{
           user.reserve.push(test.name)

           axios.put(`http://localhost:8000/api/user/${user._id}`,{reserve:user.reserve}).then((res)=>{
            console.log(res.data)
            alert(`You have obtained ${test.name}`)
            navi("/getcards")
        }).catch((err)=>(console.log(err)))
       }
    
    
    
    return(
        <div style={{backgroundColor:"black", height:1000}}>
        <div   className="contain">

                    <div style={{height:750, width:450}} className={`${test.type1}bg contain`}> {/*------------------------------------------------------------------------------------------------big card */}
                    <div style={{width:450, height: 75,  display:"flex",justifyContent:"space-around", alignItems:"center", flexWrap:"wrap",borderStyle:"solid",borderColor:"white"}} className={`${test.type1}bg`}>
                        <h2 className="text highlightCard">{test.name}</h2>
                        
                            {test.type1=="p"?<p></p>:<h2 className="text highlightCard">Hp: {test.hp}</h2>}
                            <img className="cardtype" src={require(`../photos/symbols/${test.type1}.png`)}/>
                            <img className="cardtype" src={require(`../photos/symbols/${test.type2}.png`)}/>
                        
                    </div>
                    <div style={{width:450, height:650,borderStyle:"solid",borderColor:"white", position:"relative"}} className={`${test.name} ${test.type1}bg`}>
                        <div style={{position: "relative", top: 400}}>
                        <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}}>
                            <h3 className="text highlightCard">{test.attack1}  {test.attack1Damage}</h3> 
                            <img className="cardtype3" src={require(`../photos/symbols/${test.attack1Type1}.png`)}/> 
                            <img style={{marginRight: 100}} className="cardtype3" src={require(`../photos/symbols/${test.attack1Type2}.png`)}/>
                        </div>
                        <p className="text"> {test.attack1Des} </p>
                        <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}} >
                            {test.type1=="p"?<p></p>:<h3 className="text highlightCard">{test.attack2}  {test.attack2Damage}</h3> }
                            <img className="cardtype3" src={require(`../photos/symbols/${test.attack2Type1}.png`)}/> 
                            <img style={{marginRight: 100}} className="cardtype3" src={require(`../photos/symbols/${test.attack2Type2}.png`)}/>
                        </div>
                        <p className="text">{test.attack2Des} </p>
                        <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}} >
                           {test.type1=="p"? <p></p>:<h3 className="text highlightCard">{test.attack3}  {test.attack3Damage}</h3> } 
                            <img className="cardtype3" src={require(`../photos/symbols/${test.attack3Type1}.png`)}/> 
                            <img style={{marginRight: 100}} className="cardtype3" src={require(`../photos/symbols/${test.attack3Type2}.png`)}/>
                        </div>
                        <p className="text">{test.attack3Des} </p>
                        </div>

                    </div>
                    
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
                    </div>

                </div>
                <div style={{position:"relative",top:80}}>
                    <button className="btn btn-light" style={{marginRight:10}} onClick={(e)=>{acceptHandeler(e)}}>Accept</button> 
                    <button className="btn btn-danger" onClick={(e)=>{
                        e.preventDefault()
                        navi("/getcards")
                    }}>Reject</button>
                </div>
        </div>
    </div>
    )
}

export default Chest