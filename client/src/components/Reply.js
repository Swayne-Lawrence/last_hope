import React, {useEffect, useState} from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import { useNavigate } from "react-router"
import { useParams } from "react-router";

const Reply = (props)=>{
    const {id,user} =useParams()
    const [reply,setReply]=useState({})
    const [message, setMessage]=useState("")
    const [logged,setLogged]=useState({})
   const navi= useNavigate()
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/comments/${id}`).then((res)=>{
            setReply(res.data)
        }).catch((err)=>{console.log(err)})

        
        axios.get("http://localhost:8000/api/user/logged",{withCredentials:true}).then((res)=>{
            setLogged(res.data)
        }).catch((err)=>{console.log(err)})

    },[])

    const replyHandeler=(e)=>{
        e.preventDefault();

        axios.put(`http://localhost:8000/api/comments/${id}`,{commenterId:logged._id, commenterName:logged.username,message:reply.message+message}).then((res)=>{
            console.log(res.data)
            navi(`/profile/${reply.profile}`)
        }).catch((err)=>{console.log(err)})
    }

    return(
        <div>
            <div className="contain" style={{width:900, height:300, backgroundColor:"white",borderStyle:"solid", borderColor:"black",marginTop:10}}>
                <h1>Replying to {user}</h1>
                <form onSubmit={(e)=>{replyHandeler(e)}} className="input-group contain" style={{width:600,marginTop:20}}>
                    <input type="text" name="message" value={message} onChange={(e)=>{setMessage(e.target.value)}}  className="form-control" placeholder="Say Something..." aria-label="Comment"/>
                        <button className="btn btn-dark" type="submit">Reply</button>
                        
                </form>
            </div>
        </div>
    )
}

export default Reply;