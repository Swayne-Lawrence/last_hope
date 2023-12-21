import React,{useState,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router"

const AllCards = (props)=>{

    const [user,setUser]= useState({});
    const [pokemon, setPokemon]= useState([]);
    const navi = useNavigate()

    useEffect(()=>{
        axios.get("http://localhost:8000/api/pokemons").then((res)=>{
            console.log(res.data)
            setPokemon(res.data)
        }).catch((err)=>{console.log(err)})
        axios.get("http://localhost:8000/api/user/logged",{withCredentials:true}).then((res)=>{
            if(res.data.username != "admin_swiz"){
                navi("/home")
            }
        }).catch((err)=>{console.log(err); navi("/login")})
    },[])


    return(
        <div>
            {
                pokemon.map((poke,index)=>{return(
                    <div> 
                        <Link to={`/updatecard/${poke.name}`}>{poke.name}</Link> 
                    </div>
                    
                )
                    
                })
            }
        </div>
    )
}

export default AllCards