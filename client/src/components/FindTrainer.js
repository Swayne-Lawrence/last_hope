import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router"
import { useParams } from "react-router";

const FindTrainer = (props)=>{
    const navi = useNavigate()
    const [user,setUser]= useState({})
    const [searchItem,setSearchItem]=useState("");
    const [reserves, setReserves]= useState([])


    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/logged",{withCredentials:true}).then((res)=>{
            console.log(res.data)
            setUser(res.data)
        }).catch((err)=>{console.log(err)})

        axios.get("http://localhost:8000/api/users").then((res)=>{
            setReserves(res.data)
        }).catch((err)=>{console.log(err)})

    },[])

    const searchDb=()=>{
        console.log(searchItem)
        var word=searchItem

        if (reserves.length==0){
           axios.get(`http://localhost:8000/api/users`).then(((res)=>{
               setReserves(res.data)
           })).catch((err)=>{console.log(err)})
        }

        if(searchItem.length<=1){
            setReserves(reserves.filter((poke)=> poke.username.slice(0,1).toLowerCase()==searchItem.slice(0,1).toLowerCase()))
            
            return
        }
        
            setReserves(reserves.filter((poke)=> poke.username.slice(0,2).toLowerCase()==searchItem.slice(0,2).toLowerCase()))
        
        if(searchItem.length>=5 && searchItem.length<8){ 
            setReserves(reserves.filter((poke)=> poke.username.slice(0,5).toLowerCase()==searchItem.slice(0,5).toLowerCase()))}
       
        if(searchItem.length>=10){
            setReserves(reserves.filter((poke)=> poke.username.slice(0,8).toLowerCase()==searchItem.slice(0,8).toLowerCase()))
        }

        if(searchItem.length>=12){
            setReserves(reserves.filter((poke)=> poke.username.slice(0,12).toLowerCase()==searchItem.slice(0,12).toLowerCase()))
        }
    }

    const directSearch=(e)=>{
        e.preventDefault()
        var arr=reserves.filter((poke)=>poke.username.toLowerCase().includes(searchItem.toLowerCase()))

        if(arr.length==0){
            alert("User doesnt exist")
            return
        }

        navi(`/profile/${arr[0]._id}`)
    }

    const toProfile=(e,id)=>{
        e.preventDefault()
        navi(`/profile/${id}`)
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
            <div onSubmit={(e)=>{}} className="input-group contain" style={{width:600,marginTop:20}}>
                    <input value={searchItem} type="text" name="searchItem"  onChange={(e)=>{setSearchItem(e.target.value); searchDb()}}  className="form-control" placeholder="Search" aria-label="Comment"/>
                        <button onClick={(e)=>{directSearch(e)}} className="btn btn-dark" type="submit">Search</button>
                        
                </div>
                <div className="contain" style={{overflow:"scroll", overflowX:"hidden",width:500,height:750,marginTop:30}}>
                    {
                        reserves.map((person,index)=>{
                            return(
                                <>
                                <div className="contain" style={{display:"flex", height: 200, width: 400, backgroundColor:"white",marginTop:60,marginBottom:60,borderStyle:"solid",borderColor:"black"}}>
                                    <div>
                                        <img style={{width:150,height:150}} src={require(`../photos/pictures/${person.profilePic}`)}/>
                                        <h3>{person.username}</h3>
                                    </div>
                                    <button onClick={(e)=>{toProfile(e,person._id)}} className="btn btn-outline-dark" style={{width:100, height:50, position:"relative", left:120, top:90}}>Profile</button>
                                </div>
                                </>
                            )
                        })
                    }
                </div>
        </div>
    )
}

export default FindTrainer