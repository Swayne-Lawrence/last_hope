import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router"
import { useParams } from "react-router";

const Store = (props)=>{
    const [user,setUser]= useState({})
    const navi = useNavigate()

    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/logged",{withCredentials:true}).then((res)=>{
            setUser(res.data)
        }).catch((err)=>{console.log(err)})
    },[])

    const buyHandler=(e,name,amount)=>{
        e.preventDefault()
        if(user.tokens<amount){
            alert("you do not have enough tokens")
            return
        }
        user.reserve.push(name)
        axios.put(`http://localhost:8000/api/user/${user._id}`,{reserve:user.reserve,tokens:user.tokens-amount}).then((res)=>{
            
            alert("card has successfully been purchased")
            window.location.reload(false);
        }).catch((err)=>(console.log(err)))
    }

    const viewHandler=(e,name,amount)=>{
        e.preventDefault()
        navi(`/view/${name}/store/${amount}`)
    }

    return(
        <div>
            <div className="flexy contain" style={{backgroundColor:"white", width:1500}}>
                <h2 className="contain">Swiz</h2> <img className="slogo contain" src={require(`../photos/symbols/button.jpg`)}/> <h2 className="contain">Card-Game</h2>
            </div>
            <div style={{width:900, height:50, borderStyle:"solid", borderColor:"black", justifyContent:"space-evenly"}} className="flexy contain">
                <div className="flexy">
                    <h4 style={{color:"gray"}}>Trainer:</h4>
                    <h4 style={{marginLeft:5}}>{user.username}</h4>
                </div>
                
                
                
                <div className="flexy" style={{marginLeft:15}}>
                    <button  style={{height:40}} className="btn btn-outline-dark" onClick={(e)=>{ 
                        e.preventDefault()
                        navi(`/home`)
                    }}>Home</button>
                    
                </div>
                <h4>Tokens: {user.tokens}</h4>
            </div>
            <h1>Store</h1>

            <div className="contain" style={{backgroundColor:"black", width:900,height:600,overflow:"scroll", overflowX:"hidden",marginBottom:20}}>
                <h3 style={{color:"white",marginTop:10,marginBottom:10}}>Spell Cards</h3>
                <div className="flexy contain" style={{width:380,height:100,borderStyle:"solid",borderColor:"white", justifyContent:"space-evenly",alignItems:"center",marginTop:10,marginBottom:10}}>
                    <h4 style={{color:"white"}}>StatusHeal_sp</h4>
                    <div >
                        <button className="btn btn-outline-light" onClick={(e)=>{viewHandler(e,"StatusHeal_sp",5)}}>View</button>
                        <button onClick={(e)=>{buyHandler(e,"StatusHeal_sp",5)}} className="btn btn-outline-light">Buy(5 Tokens)</button>
                    </div>
                </div>
                <div className="flexy contain" style={{width:380,height:100,borderStyle:"solid",borderColor:"white", justifyContent:"space-evenly",alignItems:"center",marginTop:10,marginBottom:10}}>
                    <h4 style={{color:"white"}}>StatusExtender_sp</h4>
                    <div >
                        <button className="btn btn-outline-light" onClick={(e)=>{viewHandler(e,"StatusExtender_sp",5)}}>View</button>
                        <button onClick={(e)=>{buyHandler(e,"StatusExtender_sp",5)}} className="btn btn-outline-light">Buy(5 Tokens)</button>
                    </div>
                </div>
                <div className="flexy contain" style={{width:380,height:100,borderStyle:"solid",borderColor:"white", justifyContent:"space-evenly",alignItems:"center",marginTop:10,marginBottom:10}}>
                    <h4 style={{color:"white"}}>ResistBreaker_sp</h4>
                    <div >
                        <button className="btn btn-outline-light" onClick={(e)=>{viewHandler(e,"ResistBreaker_sp",5)}}>View</button>
                        <button onClick={(e)=>{buyHandler(e,"ResistBreaker_sp",5)}} className="btn btn-outline-light">Buy(5 Tokens)</button>
                    </div>
                </div>
                <div className="flexy contain" style={{width:380,height:100,borderStyle:"solid",borderColor:"white", justifyContent:"space-evenly",alignItems:"center",marginTop:10,marginBottom:10}}>
                    <h4 style={{color:"white"}}>Potion_sp</h4>
                    <div >
                        <button className="btn btn-outline-light" onClick={(e)=>{viewHandler(e,"Potion_sp",10)}}>View</button>
                        <button onClick={(e)=>{buyHandler(e,"Potion_sp",10)}} className="btn btn-outline-light">Buy(10 Tokens)</button>
                    </div>
                </div>
                <div className="flexy contain" style={{width:380,height:100,borderStyle:"solid",borderColor:"white", justifyContent:"space-evenly",alignItems:"center",marginTop:10,marginBottom:10}}>
                    <h4 style={{color:"white"}}>SuperPotion_sp</h4>
                    <div >
                        <button className="btn btn-outline-light" onClick={(e)=>{viewHandler(e,"SuperPotion_sp",15)}}>View</button>
                        <button onClick={(e)=>{buyHandler(e,"SuperPotion_sp",15)}} className="btn btn-outline-light">Buy(15 Tokens)</button>
                    </div>
                </div>
                <div className="flexy contain" style={{width:380,height:100,borderStyle:"solid",borderColor:"white", justifyContent:"space-evenly",alignItems:"center",marginTop:10,marginBottom:10}}>
                    <h4 style={{color:"white"}}>ExtraDraw_sp</h4>
                    <div >
                        <button className="btn btn-outline-light" onClick={(e)=>{viewHandler(e,"ExtraDraw_sp",15)}}>View</button>
                        <button onClick={(e)=>{buyHandler(e,"ExtraDraw_sp",15)}} className="btn btn-outline-light">Buy(15 Tokens)</button>
                    </div>
                </div>
                <div className="flexy contain" style={{width:380,height:100,borderStyle:"solid",borderColor:"white", justifyContent:"space-evenly",alignItems:"center",marginTop:10,marginBottom:10}}>
                    <h4 style={{color:"white"}}>AttackDebuff_sp</h4>
                    <div >
                        <button className="btn btn-outline-light" onClick={(e)=>{viewHandler(e,"AttackDebuff_sp",15)}}>View</button>
                        <button onClick={(e)=>{buyHandler(e,"AttackDebuff_sp",15)}} className="btn btn-outline-light">Buy(15 Tokens)</button>
                    </div>
                </div>
                <div className="flexy contain" style={{width:380,height:100,borderStyle:"solid",borderColor:"white", justifyContent:"space-evenly",alignItems:"center",marginTop:10,marginBottom:10}}>
                    <h4 style={{color:"white"}}>AttackBuff_sp</h4>
                    <div >
                        <button className="btn btn-outline-light" onClick={(e)=>{viewHandler(e,"AttackBuff_sp",15)}}>View</button>
                        <button onClick={(e)=>{buyHandler(e,"AttackBuff_sp",15)}} className="btn btn-outline-light">Buy(15 Tokens)</button>
                    </div>
                </div>
                <div className="flexy contain" style={{width:380,height:100,borderStyle:"solid",borderColor:"white", justifyContent:"space-evenly",alignItems:"center",marginTop:10,marginBottom:10}}>
                    <h4 style={{color:"white"}}>HyperPotion_sp</h4>
                    <div >
                        <button className="btn btn-outline-light" onClick={(e)=>{viewHandler(e,"HyperPotion_sp",20)}}>View</button>
                        <button onClick={(e)=>{buyHandler(e,"HyperPotion_sp",20)}} className="btn btn-outline-light">Buy(20 Tokens)</button>
                    </div>
                </div>
                <div className="flexy contain" style={{width:380,height:100,borderStyle:"solid",borderColor:"white", justifyContent:"space-evenly",alignItems:"center",marginTop:10,marginBottom:10}}>
                    <h4 style={{color:"white"}}>ExtraSummon_sp</h4>
                    <div >
                        <button className="btn btn-outline-light" onClick={(e)=>{viewHandler(e,"ExtraSummon_sp",30)}}>View</button>
                        <button onClick={(e)=>{buyHandler(e,"ExtraSummon_sp",30)}} className="btn btn-outline-light">Buy(30 Tokens)</button>
                    </div>
                </div>
            </div>
            <div className="contain" style={{backgroundColor:"black", width:900,height:600,overflow:"scroll", overflowX:"hidden"}}>
                <h3 style={{color:"white",marginTop:10,marginBottom:10}}>Legendary Birds</h3>
                <div className="flexy contain" style={{width:380,height:100,borderStyle:"solid",borderColor:"white", justifyContent:"space-evenly",alignItems:"center",marginTop:10,marginBottom:10}}>
                    <h4 style={{color:"white"}}>Zapdos_l</h4>
                    <div >
                        <button className="btn btn-outline-light" onClick={(e)=>{viewHandler(e,"Zapdos_l",100)}}>View</button>
                        <button onClick={(e)=>{buyHandler(e,"Zapdos_l",100)}} className="btn btn-outline-light">Buy(100 Tokens)</button>
                    </div>
                </div>
                <div className="flexy contain" style={{width:380,height:100,borderStyle:"solid",borderColor:"white", justifyContent:"space-evenly",alignItems:"center",marginTop:10,marginBottom:10}}>
                    <h4 style={{color:"white"}}>Moltres_l</h4>
                    <div >
                        <button className="btn btn-outline-light" onClick={(e)=>{viewHandler(e,"Moltres_l",100)}}>View</button>
                        <button onClick={(e)=>{buyHandler(e,"Moltres_l",100)}} className="btn btn-outline-light">Buy(100 Tokens)</button>
                    </div>
                </div>
                <div className="flexy contain" style={{width:380,height:100,borderStyle:"solid",borderColor:"white", justifyContent:"space-evenly",alignItems:"center",marginTop:10,marginBottom:10}}>
                    <h4 style={{color:"white"}}>Articuno_l</h4>
                    <div >
                        <button className="btn btn-outline-light" onClick={(e)=>{viewHandler(e,"Articuno_l",100)}}>View</button>
                        <button onClick={(e)=>{buyHandler(e,"Articuno_l",100)}} className="btn btn-outline-light">Buy(100 Tokens)</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Store