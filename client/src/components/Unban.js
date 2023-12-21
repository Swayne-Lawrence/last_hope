import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router"

const Unban = (props)=>{
    const [banned, setBanned]= useState([]);
    const navi = useNavigate()

    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/logged",{withCredentials:true}).then((res)=>{
            if(res.data.username != "admin_swiz"){
                navi("/home")
            }
        }).catch((err)=>{console.log(err); navi("/login")})
        axios.get("http://localhost:8000/api/banned").then((res)=>{
            setBanned(res.data)
        }).catch((err)=>{console.log(err)})
    },[])

    const save = (e,person)=>{
        axios.delete(`http://localhost:8000/api/banned/${person}`).then((res)=>{
            window.location.reload(false);
        }).catch((err)=>(console.log(err)))
    }


    return(
        <div>
            <h1>Yo</h1>
            {
                banned.map((ban,index)=>{
                    return(
                        <div>

                            <button onClick={(e)=>{save(e,ban._id)}}>{ban.name}</button> <br></br>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Unban;