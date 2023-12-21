import React ,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router";



const GameRoom = (props)=>{
    const navi =useNavigate();
    const [user,setUser]=useState({});
    const [game, setGame]=useState({round:0})
    const[hand, setHand]= useState([])
    const [deckLen, setDeckLen]=useState(0);
    const [player1,setPlayer1]= useState({profilePic:"male/holder.jpg"});
    const [player2, setPlayer2] = useState({profilePic:"male/holder.jpg"});
    const [spot1, setSpot1] = useState({
        name:"p",
        damageT1:"p",
        damageT2:"p"
        
    });
    const [spot2, setSpot2] = useState({
        name:"p",
        damageT1:"p",
        damageT2:"p"
        
    });
    const [spot3, setSpot3] = useState({
        name:"p",
        damageT1:"p",
        damageT2:"p"
        
    });
    const [spot4, setSpot4] = useState({
        name:"p",
        damageT1:"p",
        damageT2:"p"
        
    });
    const {id,id2} = useParams()
    const [test13,setTest13]= useState({
        type1: "p",
        type2: "p",
        attack1Type1:"p",
        attack1Type2:"p",
        attack2Type1:"p",
        attack2Type2:"p",
        attack3Type1:"p",
        attack3Type2:"p",
        weak1:"p",
        weak2:"p",
        resist1:"p",
        resist2: "p"
    })
    const [test24,setTest24]= useState({
        type1: "p",
        type2: "p",
        attack1Type1:"p",
        attack1Type2:"p",
        attack2Type1:"p",
        attack2Type2:"p",
        attack3Type1:"p",
        attack3Type2:"p",
        weak1:"p",
        weak2:"p",
        resist1:"p",
        resist2: "p"
    })
    const [test13o,setTest13o]= useState({
        type1: "p",
        type2: "p",
        attack1Type1:"p",
        attack1Type2:"p",
        attack2Type1:"p",
        attack2Type2:"p",
        attack3Type1:"p",
        attack3Type2:"p",
        weak1:"p",
        weak2:"p",
        resist1:"p",
        resist2: "p"
    })
    const [test24o,setTest24o]= useState({
        type1: "p",
        type2: "p",
        attack1Type1:"p",
        attack1Type2:"p",
        attack2Type1:"p",
        attack2Type2:"p",
        attack3Type1:"p",
        attack3Type2:"p",
        weak1:"p",
        weak2:"p",
        resist1:"p",
        resist2: "p"
    })

const getRandom= (min,max)=>{
    min=Math.ceil(min);
    max=Math.floor(max);
    return Math.floor(Math.random()*(max-min+1)+min);
}

const loserCheck=()=>{
    axios.get(`http://localhost:8000/api/user/${id}`).then((res)=>{
        if(res.data.lifePoints<=0 ){
            axios.put(`http://localhost:8000/api/user/${id}`,{winner:id2,loser:id,reason:"Players lifepoints reached 0"}).then((res)=>{
                
            }).catch((err)=>{console.log(err)})
            axios.put(`http://localhost:8000/api/user/${id2}`,{winner:id2,loser:id,reason:"Players lifepoints reached 0"}).then((res)=>{
                navi(`/win/${res.data.game}`)
            }).catch((err)=>{console.log(err)})
        }

        if (res.data.stage1s==0 && res.data.field==0){
            axios.put(`http://localhost:8000/api/user/${id}`,{winner:id2,loser:id,reason:"Player has ran out of basic stage pokemon"}).then((res)=>{
                
            }).catch((err)=>{console.log(err)})
            axios.put(`http://localhost:8000/api/user/${id2}`,{winner:id2,loser:id,reason:"Player has ran out of basic stage pokemon"}).then((res)=>{
                navi(`/win/${res.data.game}`)
            }).catch((err)=>{console.log(err)})
        }
    }).catch((err)=>{console.log(err)})

    axios.get(`http://localhost:8000/api/user/${id2}`).then((res)=>{
        if(res.data.lifePoints<=0 ){
            axios.put(`http://localhost:8000/api/user/${id2}`,{winner:id,loser:id2,reason:"Player's lifepoints reached 0"}).then((res)=>{
                
            }).catch((err)=>{console.log(err)})
            axios.put(`http://localhost:8000/api/user/${id}`,{winner:id,loser:id2,reason:"Player's lifepoints reached 0"}).then((res)=>{
                navi(`/win/${res.data.game}`)
            }).catch((err)=>{console.log(err)})
        }

        if (res.data.stage1s==0 && res.data.field==0){
            axios.put(`http://localhost:8000/api/user/${id2}`,{winner:id,loser:id2,reason:"Player has ran out of basic stage pokemon"}).then((res)=>{
                
            }).catch((err)=>{console.log(err)})
            axios.put(`http://localhost:8000/api/user/${id}`,{winner:id,loser:id2,reason:"Player has ran out of basic stage pokemon"}).then((res)=>{
                navi(`/win/${res.data.game}`)
            }).catch((err)=>{console.log(err)})
        }
    }).catch((err)=>{console.log(err)})
}

useEffect(()=>{
    axios.get("http://localhost:8000/api/user/logged",{withCredentials:true}).then((res)=>{
        
        var player = res.data._id;
        loserCheck()
        if(res.data.reason=="Player has surrendered"){
            navi(`/win/${res.data.game}`)
        }
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        axios.get(`http://localhost:8000/api/game/${res.data.game}`).then((res)=>{

            if(res.data.timer<=0){
                alert("player took too long")
                navi("/home")
                
            }
            
            if(player== res.data.player2 && res.data.round%2!=0){
                setInterval(()=>{
                    axios.put(`http://localhost:8000/api/game/${res.data._id}`,{timer:res.data.timer-5}).then((res)=>{
                        window.location.reload(false);
                    }).catch((err)=>console.log(err))
                    },5000)
            }

            if(player== res.data.player1 && res.data.round%2==0){
                setInterval(()=>{
                    axios.put(`http://localhost:8000/api/game/${res.data._id}`,{timer:res.data.timer-5}).then((res)=>{
                        window.location.reload(false);
                    }).catch((err)=>console.log(err))
                    },5000)
            }
            var num = res.data.round;
           
            if(res.data.spot1!=""){
                axios.get(`http://localhost:8000/api/tempPoke/${res.data.spot1}`).then((res)=>{
                    
                    setSpot1(res.data)
                    if(num%2!=0){
                        setTest13(res.data)
                    }
                    if(num%2==0){
                        setTest13o(res.data)
                    }
                }).catch((err)=>{console.log(err)})
            }
            if(res.data.spot2!=""){
                axios.get(`http://localhost:8000/api/tempPoke/${res.data.spot2}`).then((res)=>{
                    
                    setSpot2(res.data)
                    if(num%2!=0){
                    setTest24(res.data)}
                    if(num%2==0){
                        setTest24o(res.data)
                    }
                }).catch((err)=>{console.log(err)})
            }
            if(res.data.spot3!=""){
                axios.get(`http://localhost:8000/api/tempPoke/${res.data.spot3}`).then((res)=>{
                   
                    setSpot3(res.data)
                    if(num%2==0){
                        setTest13(res.data)
                    }
                    if(num%2 !=0){
                        setTest13o(res.data)
                    }
                }).catch((err)=>{console.log(err)})
            }
            if(res.data.spot4!=""){
                axios.get(`http://localhost:8000/api/tempPoke/${res.data.spot4}`).then((res)=>{
                    
                    setSpot4(res.data)
                    if(num%2==0){
                        setTest24(res.data)}
                    if(num%2 !=0){
                        setTest24o(res.data)
                    }
                }).catch((err)=>{console.log(err)})
            }
            setGame(res.data)

        }).catch((err)=>{console.log(err)})




    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        setDeckLen(res.data.tempDeck.length)
        if (res.data.rounds==0){
            var num= 0;

            for(let i=0; i<5; i++){
                num= getRandom(0,res.data.tempDeck.length-1)
                res.data.hand.push(res.data.tempDeck[num])
                res.data.tempDeck.splice(num,1);
            }
            res.data.tempDeck = res.data.tempDeck.filter((h)=>{return h!=null})
            axios.put(`http://localhost:8000/api/user/${res.data._id}`,{tempDeck:res.data.tempDeck, hand:res.data.hand,rounds:1}).then((res)=>{
                console.log(res.data)
                setUser(res.data)
                setHand(res.data.hand)
                setDeckLen(res.data.tempDeck.length)
            }).catch((err)=>{console.log(err)})
        }
        else{
            setUser(res.data)
            setHand(res.data.hand)
        }
    }).catch((err)=>{console.log(err)})
},[])

useEffect(()=>{
    axios.get(`http://localhost:8000/api/user/${id}`).then((res)=>{
       
        setPlayer1(res.data)
    }).catch((err)=>{console.log(err)})

    axios.get(`http://localhost:8000/api/user/${id2}`).then((res)=>{
       
        setPlayer2(res.data)
    }).catch((err)=>{console.log(err)})
},[])

const calculate=(dmg,dmgt1,dmgt2,wk1,wk1a,wk2,wk2a,r1,r1a,r2,r2a)=>{
    if(dmgt1==wk1){
        dmg=dmg*wk1a
    }
    if(dmgt1==wk2){
        dmg=dmg*wk2a
    }
    if(dmgt2==wk1){
        dmg=dmg*wk1a
    }
    if(dmgt2==wk2){
        dmg=dmg*wk2a
    }
    if(dmgt1==r1){
        dmg=dmg-r1a
    }
    if(dmgt1==r2){
        dmg=dmg-r2a
    }
    if(dmgt2==r1){
        dmg=dmg-r1a
    }
    if(dmgt2==r2){
        dmg=dmg-r2a
    }
    if(dmg<0){
        dmg=0
    }
    return dmg
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~spells~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const spellHandeler=(pokeid,name)=>{


    if(name=="ExtraDraw_sp"){
        axios.put(`http://localhost:8000/api/user/${user._id}`,{draws:user.draws+2}).then((res)=>{
            console.log(res.data)
            alert("gained 2 extra draws")
            if(game.round%2==0){
                axios.put(`http://localhost:8000/api/user/${player2._id}`,{lastUsed:"ExtraDraw_sp"}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            if(game.round%2!=0){
                axios.put(`http://localhost:8000/api/user/${player1._id}`,{lastUsed:"ExtraDraw_sp"}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }

    if(name=="ExtraSummon_sp"){
        axios.put(`http://localhost:8000/api/user/${user._id}`,{summons:user.summons+1}).then((res)=>{
            console.log(res.data)
            alert("gained an extra summmon")
            if(game.round%2==0){
                axios.put(`http://localhost:8000/api/user/${player2._id}`,{lastUsed:"ExtraSummon_sp"}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            if(game.round%2!=0){
                axios.put(`http://localhost:8000/api/user/${player1._id}`,{lastUsed:"ExtraSummon_sp"}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }

    if(name=="AttackBuff_sp"){
        axios.get(`http://localhost:8000/api/tempPoke/${pokeid}`).then((res)=>{
            
            if(res.data.attack1Damage !=0 && res.data.bonus<30 && res.data.status!="cursed"){
                axios.put(`http://localhost:8000/api/tempPoke/${pokeid}`,{attack1Damage:res.data.attack1Damage+30,bonus:res.data.bonus+30}).then((res)=>{
                    alert("pokemon attacks increased by 30")
                    if(game.round%2==0){
                        axios.put(`http://localhost:8000/api/user/${player2._id}`,{lastUsed:"AttackBuff_sp"}).then((res)=>{}).catch((err)=>{console.log(err)})
                    }
                    if(game.round%2!=0){
                        axios.put(`http://localhost:8000/api/user/${player1._id}`,{lastUsed:"AttackBuff_sp"}).then((res)=>{}).catch((err)=>{console.log(err)})
                    }
                }).catch((err)=>console.log(err))
            }

            if(res.data.attack2Damage !=0 && res.data.bonus<30 && res.data.status!="cursed"){
                axios.put(`http://localhost:8000/api/tempPoke/${pokeid}`,{attack2Damage:res.data.attack2Damage+30}).then((res)=>{
                    
                }).catch((err)=>console.log(err))
            }

            if(res.data.attack3Damage !=0 && res.data.bonus< 30 && res.data.status!="cursed"){
                axios.put(`http://localhost:8000/api/tempPoke/${pokeid}`,{attack3Damage:res.data.attack3Damage+30}).then((res)=>{
                    
                }).catch((err)=>console.log(err))
            }
        }).catch((err)=>{console.log(err)})
    }

    if(name=="AttackDebuff_sp"){
        axios.get(`http://localhost:8000/api/tempPoke/${pokeid}`).then((res)=>{
            
            if(res.data.attack1Damage >=5 && res.data.bonus>=0 && res.data.status!="cursed"){
                axios.put(`http://localhost:8000/api/tempPoke/${pokeid}`,{attack1Damage:res.data.attack1Damage-30,bonus:res.data.bonus-30}).then((res)=>{
                    alert("pokemon attacks decreased by 30")
                    if(game.round%2==0){
                        axios.put(`http://localhost:8000/api/user/${player2._id}`,{lastUsed:"AttackDebuff_sp"}).then((res)=>{}).catch((err)=>{console.log(err)})
                    }
                    if(game.round%2!=0){
                        axios.put(`http://localhost:8000/api/user/${player1._id}`,{lastUsed:"AttackDebuff_sp"}).then((res)=>{}).catch((err)=>{console.log(err)})
                    }
                    if(res.data.attack1Damage<5){
                        axios.put(`http://localhost:8000/api/tempPoke/${pokeid}`,{attack1Damage:5}).then((res)=>{
                    
                        }).catch((err)=>console.log(err))
                    }
                }).catch((err)=>console.log(err))
            }

            if(res.data.attack2Damage >=5 && res.data.bonus>=0 && res.data.status!="cursed"){
                axios.put(`http://localhost:8000/api/tempPoke/${pokeid}`,{attack2Damage:res.data.attack2Damage-30}).then((res)=>{
                    if(res.data.attack2Damage<5){
                        axios.put(`http://localhost:8000/api/tempPoke/${pokeid}`,{attack2Damage:5}).then((res)=>{
                    
                        }).catch((err)=>console.log(err))
                    }
                }).catch((err)=>console.log(err))
            }

            if(res.data.attack3Damage >=5 && res.data.bonus>=0 && res.data.status!="cursed"){
                axios.put(`http://localhost:8000/api/tempPoke/${pokeid}`,{attack3Damage:res.data.attack3Damage-30}).then((res)=>{
                    if(res.data.attack3Damage<5){
                        axios.put(`http://localhost:8000/api/tempPoke/${pokeid}`,{attack3Damage:5}).then((res)=>{
                    
                        }).catch((err)=>console.log(err))
                    }
                }).catch((err)=>console.log(err))
            }
        }).catch((err)=>{console.log(err)})
    }

    if(name=="ResistBreaker_sp"){
        axios.get(`http://localhost:8000/api/tempPoke/${pokeid}`).then((res)=>{
            if(res.data.resist1Amount>0 && res.data.status!="cursed"){
                alert("pokemon resistance decreased by 30")
                if(game.round%2==0){
                    axios.put(`http://localhost:8000/api/user/${player2._id}`,{lastUsed:"ResistBreaker_sp"}).then((res)=>{}).catch((err)=>{console.log(err)})
                }
                if(game.round%2!=0){
                    axios.put(`http://localhost:8000/api/user/${player1._id}`,{lastUsed:"ResistBreaker_sp"}).then((res)=>{}).catch((err)=>{console.log(err)})
                }
                axios.put(`http://localhost:8000/api/tempPoke/${pokeid}`,{resist1Amount:res.data.resist1Amount-30}).then((res)=>{
                    if(res.data.resist1Amount<0){
                        
                        axios.put(`http://localhost:8000/api/tempPoke/${pokeid}`,{resist1Amount:0}).then((res)=>{}).catch((err)=>{console.log(err)})
                    }
                }).catch((err)=>{console.log(err)})
            }
            if(res.data.resist2Amount>0 && res.data.status!="cursed"){
                axios.put(`http://localhost:8000/api/tempPoke/${pokeid}`,{resist2Amount:res.data.resist2Amount-30}).then((res)=>{
                    if(res.data.resist2Amount<0){
                        axios.put(`http://localhost:8000/api/tempPoke/${pokeid}`,{resist2Amount:0}).then((res)=>{}).catch((err)=>{console.log(err)})
                    }
                }).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }

    if(name=="StatusExtender_sp"){
        axios.get(`http://localhost:8000/api/tempPoke/${pokeid}`).then((res)=>{
            if(res.data.statusAmount!=-1 && res.data.status!="cursed"){
                alert("pokemon status duration increased by 4")
                if(game.round%2==0){
                    axios.put(`http://localhost:8000/api/user/${player2._id}`,{lastUsed:"StatusExtender_sp"}).then((res)=>{}).catch((err)=>{console.log(err)})
                }
                if(game.round%2!=0){
                    axios.put(`http://localhost:8000/api/user/${player1._id}`,{lastUsed:"StatusExtender_sp"}).then((res)=>{}).catch((err)=>{console.log(err)})
                }
                axios.put(`http://localhost:8000/api/tempPoke/${pokeid}`,{statusAmount:res.data.statusAmount+4}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }

    if(name=="StatusHeal_sp"){
        axios.get(`http://localhost:8000/api/tempPoke/${pokeid}`).then((res)=>{
            if(res.data.status!="" && res.data.status!="dead"){
                alert("pokemon status has been healed")
                if(game.round%2==0){
                    axios.put(`http://localhost:8000/api/user/${player2._id}`,{lastUsed:"StatusHeal_sp"}).then((res)=>{}).catch((err)=>{console.log(err)})
                }
                if(game.round%2!=0){
                    axios.put(`http://localhost:8000/api/user/${player1._id}`,{lastUsed:"StatusHeal_sp"}).then((res)=>{}).catch((err)=>{console.log(err)})
                }
                axios.put(`http://localhost:8000/api/tempPoke/${pokeid}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }

    if(name=="Potion_sp"){
        axios.get(`http://localhost:8000/api/tempPoke/${pokeid}`).then((res)=>{
            if(res.data.hp!=0 && res.data.heal <=400 && res.data.status!="cursed"){
                alert("pokemon health increased by 100")
                if(game.round%2==0){
                    axios.put(`http://localhost:8000/api/user/${player2._id}`,{lastUsed:"Potion_sp"}).then((res)=>{}).catch((err)=>{console.log(err)})
                }
                if(game.round%2!=0){
                    axios.put(`http://localhost:8000/api/user/${player1._id}`,{lastUsed:"Potion_sp"}).then((res)=>{}).catch((err)=>{console.log(err)})
                }
                axios.put(`http://localhost:8000/api/tempPoke/${pokeid}`,{hp:res.data.hp+100,heal:res.data.heal+100}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }
    if(name=="SuperPotion_sp"){
        axios.get(`http://localhost:8000/api/tempPoke/${pokeid}`).then((res)=>{
            if(res.data.hp!=0 && res.data.heal <=400 && res.data.status!="cursed"){
                alert("pokemon health increased by 150")
                if(game.round%2==0){
                    axios.put(`http://localhost:8000/api/user/${player2._id}`,{lastUsed:"SuperPotion_sp"}).then((res)=>{}).catch((err)=>{console.log(err)})
                }
                if(game.round%2!=0){
                    axios.put(`http://localhost:8000/api/user/${player1._id}`,{lastUsed:"SuperPotion_sp"}).then((res)=>{}).catch((err)=>{console.log(err)})
                }
                axios.put(`http://localhost:8000/api/tempPoke/${pokeid}`,{hp:res.data.hp+150,heal:res.data.heal+150}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }
    if(name=="HyperPotion_sp"){
        axios.get(`http://localhost:8000/api/tempPoke/${pokeid}`).then((res)=>{
            if(res.data.hp!=0 && res.data.heal <=400 && res.data.status!="cursed"){
                alert("pokemon health increased by 200")
                if(game.round%2==0){
                    axios.put(`http://localhost:8000/api/user/${player2._id}`,{lastUsed:"HyperPotion_sp"}).then((res)=>{}).catch((err)=>{console.log(err)})
                }
                if(game.round%2!=0){
                    axios.put(`http://localhost:8000/api/user/${player1._id}`,{lastUsed:"HyperPotion_sp"}).then((res)=>{}).catch((err)=>{console.log(err)})
                }
                axios.put(`http://localhost:8000/api/tempPoke/${pokeid}`,{hp:res.data.hp+200,heal:res.data.heal+200}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }


    for(let i=0; i<user.hand.length; i++){
        if(name==user.hand[i]){
            user.hand.splice(i,1)
            break;
        }
    }
    user.hand = user.hand.filter((h)=>{return h!=null})
        axios.put(`http://localhost:8000/api/user/${user._id}`,{hand:user.hand}).then((res)=>{
    
}).catch((err)=>{console.log(err)})
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~spells~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~status~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const statusGiver=(des,spot)=>{
    if(des=="heals for 15"){
        
        if(spot=="spot1"){
            axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{hp:spot1.hp+15}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
        if(spot=="spot2"){
            axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{hp:spot2.hp+15}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
        if(spot=="spot3"){
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{hp:spot3.hp+15}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
        if(spot=="spot4"){
            axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{hp:spot4.hp+15}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
        
    }

    if(des=="heals for 25"){
        
        if(spot=="spot1"){
            axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{hp:spot1.hp+25}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
        if(spot=="spot2"){
            axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{hp:spot2.hp+25}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
        if(spot=="spot3"){
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{hp:spot3.hp+25}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
        if(spot=="spot4"){
            axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{hp:spot4.hp+25}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
        
    }

    if(des=="heals for 35"){
        
        if(spot=="spot1"){
            axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{hp:spot1.hp+35}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
        if(spot=="spot2"){
            axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{hp:spot2.hp+35}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
        if(spot=="spot3"){
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{hp:spot3.hp+35}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
        if(spot=="spot4"){
            axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{hp:spot4.hp+35}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
        
    }

    if(des=="25% chance of paralyzing"){
        if(getRandom(1,4)==2){
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:"paralyzed"}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
    }
    if(des=="35% chance of paralyzing"){
        if(getRandom(1,3)==2){
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:"paralyzed"}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
    }

    if(des=="45% chance of paralyzing"){
        
        if(getRandom(1,2)==2){
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:"paralyzed"}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
    }


    if(des=="25% chance of burning"){
        if(getRandom(1,4)==2){
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:"burned"}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
    }
    if(des=="35% chance of burning"){
        if(getRandom(1,3)==2){
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:"burned"}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
    }

    if(des=="45% chance of burning"){
        if(getRandom(1,2)==2){
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:"burned"}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
    }

    if(des=="25% chance of freezing"){
        if(getRandom(1,4)==2){
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:"frozen"}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
    }
    if(des=="35% chance of freezing"){
        if(getRandom(1,3)==2){
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:"frozen"}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
    }

    if(des=="45% chance of freezing"){
        if(getRandom(1,2)==2){
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:"frozen"}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
    }

    if(des=="25% chance of poisoning"){
        if(getRandom(1,4)==2){
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:"poisoned"}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
    }
    if(des=="35% chance of poisoning"){
        if(getRandom(1,3)==2){
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:"poisoned"}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
    }

    if(des=="45% chance of poisoning"){
        if(getRandom(1,2)==2){
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:"poisoned"}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
    }

    if(des=="25% chance of confusing"){
        if(getRandom(1,4)==2){
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:"confused"}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
    }
    if(des=="35% chance of confusing"){
        if(getRandom(1,3)==2){
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:"confused"}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
    }

    if(des=="45% chance of confusing"){
        if(getRandom(1,2)==2){
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:"confused"}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
    }

    if(des=="25% chance of charming"){
        if(getRandom(1,4)==2){
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:"charmed"}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
    }
    if(des=="35% chance of charming"){
        if(getRandom(1,3)==2){
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:"charmed"}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
    }

    if(des=="45% chance of charming"){
        if(getRandom(1,2)==2){
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:"charmed"}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
    }

    if(des=="25% chance of cursing"){
        if(getRandom(1,4)==2){
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:"cursed"}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
    }
    if(des=="35% chance of cursing"){
        if(getRandom(1,3)==2){
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:"cursed"}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
    }

    if(des=="45% chance of cursing"){
        if(getRandom(1,2)==2){
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:"cursed"}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
    }
    
    
}


const spot1Check=()=>{
    if(spot1.name=="p" || spot1.status=="dead"){
        return
    }

    if(spot1.status=="paralyzed"){
        var para=""
        
        if(spot1.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{statusAmount:6}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot1.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(getRandom(1,2)==2){
            para="yes"
        }
        axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{attacked:para,statusAmount:spot1.statusAmount-1}).then((res)=>{}).catch((err)=>{console.log(err)})
    }

    if(spot1.status=="confused"){
        var con=""
        var dmg=0
        
        if(spot1.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{statusAmount:4}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot1.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(getRandom(1,2)==2){
            con="yes"
            dmg=25
            alert("Pokemon attacked itself")
        }
        axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{attacked:con,statusAmount:spot1.statusAmount-1,hp:spot1.hp-dmg}).then((res)=>{
            if(res.data.hp<=0){
                axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{status:"",statusAmount:-1,hp:5}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }

    if(spot1.status=="frozen"){
        
        if(spot1.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{statusAmount:4,attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot1.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }

        axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{attacked:"yes",statusAmount:spot1.statusAmount-1}).then((res)=>{}).catch((err)=>{console.log(err)})
    }

    if(spot1.status=="burned"){
        
        if(spot1.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{statusAmount:6}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot1.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }

        axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{statusAmount:spot1.statusAmount-1,hp:spot1.hp-15}).then((res)=>{
            if(res.data.hp<=0){
                axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{status:"",statusAmount:-1,hp:5}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }

    if(spot1.status=="poisoned"){
        
        if(spot1.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{statusAmount:12}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot1.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }

        axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{statusAmount:spot1.statusAmount-1,hp:spot1.hp-10}).then((res)=>{
            if(res.data.hp<=0){
                axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{status:"",statusAmount:-1,hp:5}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }

    if(spot1.status=="charmed"){
        
        if(spot1.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{statusAmount:4}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot1.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }

        axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{statusAmount:spot1.statusAmount-1,hp:spot1.hp-15}).then((res)=>{
            if(spot3.name!="p" && spot3.status!="dead"){
                axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{hp:spot3.hp+20}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            if(spot4.name!="p" && spot4.status!="dead"){
                axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{hp:spot4.hp+20}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            if(res.data.hp<=0){
                axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{status:"",statusAmount:-1,hp:5}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }

    if(spot1.status=="cursed"){
        
        if(spot1.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{statusAmount:4}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot1.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{status:"",statusAmount:-1,hp:spot1.hp-75}).then((res)=>{
                if(res.data.hp<=0){
                    axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{status:"",statusAmount:-1,hp:5}).then((res)=>{}).catch((err)=>{console.log(err)})
                }
            }).catch((err)=>{console.log(err)})
            return
        }

        axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{statusAmount:spot1.statusAmount-1}).then((res)=>{

        }).catch((err)=>{console.log(err)})
    }
}//spot1check

const spot2Check=()=>{
    if(spot2.name=="p" || spot2.status=="dead"){
        return
    }

    if(spot2.status=="paralyzed"){
        var para=""
        
        if(spot2.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{statusAmount:6}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot2.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(getRandom(1,2)==2){
            para="yes"
        }
        axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{attacked:para,statusAmount:spot2.statusAmount-1}).then((res)=>{}).catch((err)=>{console.log(err)})
    }

    if(spot2.status=="confused"){
        var con=""
        var dmg=0
        
        if(spot2.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{statusAmount:4}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot2.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(getRandom(1,2)==2){
            con="yes"
            dmg=25
            alert("Pokemon attacked itself")
        }
        axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{attacked:con,statusAmount:spot2.statusAmount-1,hp:spot2.hp-dmg}).then((res)=>{
            if(res.data.hp<=0){
                axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{status:"",statusAmount:-1,hp:5}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }

    if(spot2.status=="frozen"){
        
        if(spot2.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{statusAmount:4,attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot2.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }

        axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{attacked:"yes",statusAmount:spot2.statusAmount-1}).then((res)=>{}).catch((err)=>{console.log(err)})
    }

    if(spot2.status=="burned"){
        
        if(spot2.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{statusAmount:6}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot2.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }

        axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{statusAmount:spot2.statusAmount-1,hp:spot2.hp-15}).then((res)=>{
            if(res.data.hp<=0){
                axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{status:"",statusAmount:-1,hp:5}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }

    if(spot2.status=="poisoned"){
        
        if(spot2.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{statusAmount:12}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot2.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }

        axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{statusAmount:spot2.statusAmount-1,hp:spot2.hp-10}).then((res)=>{
            if(res.data.hp<=0){
                axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{status:"",statusAmount:-1,hp:5}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }

    if(spot2.status=="charmed"){
        
        if(spot2.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{statusAmount:4}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot2.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }

        axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{statusAmount:spot2.statusAmount-1,hp:spot2.hp-15}).then((res)=>{
            if(spot3.name!="p" && spot3.status!="dead"){
                axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{hp:spot3.hp+20}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            if(spot4.name!="p" && spot4.status!="dead"){
                axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{hp:spot4.hp+20}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            if(res.data.hp<=0){
                axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{status:"",statusAmount:-1,hp:5}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }

    if(spot2.status=="cursed"){
        
        if(spot2.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{statusAmount:4}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot2.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{status:"",statusAmount:-1,hp:spot2.hp-75}).then((res)=>{
                if(res.data.hp<=0){
                    axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{status:"",statusAmount:-1,hp:5}).then((res)=>{}).catch((err)=>{console.log(err)})
                }
            }).catch((err)=>{console.log(err)})
            return
        }

        axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{statusAmount:spot2.statusAmount-1}).then((res)=>{

        }).catch((err)=>{console.log(err)})
    }
}//spot2check

const spot3Check=()=>{
    if(spot3.name=="p" || spot3.status=="dead"){
        return
    }

    if(spot3.status=="paralyzed"){
        var para=""
        
        if(spot3.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{statusAmount:6}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot3.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(getRandom(1,2)==2){
            para="yes"
        }
        axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{attacked:para,statusAmount:spot3.statusAmount-1}).then((res)=>{}).catch((err)=>{console.log(err)})
    }

    if(spot3.status=="confused"){
        var con=""
        var dmg=0
        
        if(spot3.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{statusAmount:4}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot3.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(getRandom(1,2)==2){
            con="yes"
            dmg=25
            alert("Pokemon attacked itself")
        }
        axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{attacked:con,statusAmount:spot3.statusAmount-1,hp:spot3.hp-dmg}).then((res)=>{
            if(res.data.hp<=0){
                axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{status:"",statusAmount:-1,hp:5}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }

    if(spot3.status=="frozen"){
        
        if(spot3.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{statusAmount:4,attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot3.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }

        axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{attacked:"yes",statusAmount:spot3.statusAmount-1}).then((res)=>{}).catch((err)=>{console.log(err)})
    }

    if(spot3.status=="burned"){
        
        if(spot3.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{statusAmount:6}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot3.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }

        axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{statusAmount:spot3.statusAmount-1,hp:spot3.hp-15}).then((res)=>{
            if(res.data.hp<=0){
                axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{status:"",statusAmount:-1,hp:5}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }

    if(spot3.status=="poisoned"){
        
        if(spot3.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{statusAmount:12}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot3.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }

        axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{statusAmount:spot3.statusAmount-1,hp:spot3.hp-10}).then((res)=>{
            if(res.data.hp<=0){
                axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{status:"",statusAmount:-1,hp:5}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }

    if(spot3.status=="charmed"){
        
        if(spot3.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{statusAmount:4}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot3.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }

        axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{statusAmount:spot3.statusAmount-1,hp:spot3.hp-15}).then((res)=>{
            if(spot1.name!="p" && spot1.status!="dead"){
                axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{hp:spot1.hp+20}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            if(spot2.name!="p" && spot2.status!="dead"){
                axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{hp:spot2.hp+20}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            if(res.data.hp<=0){
                axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{status:"",statusAmount:-1,hp:5}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }

    if(spot3.status=="cursed"){
        
        if(spot3.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{statusAmount:4}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot3.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{status:"",statusAmount:-1,hp:spot3.hp-75}).then((res)=>{
                if(res.data.hp<=0){
                    axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{status:"",statusAmount:-1,hp:5}).then((res)=>{}).catch((err)=>{console.log(err)})
                }
            }).catch((err)=>{console.log(err)})
            return
        }

        axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{statusAmount:spot3.statusAmount-1}).then((res)=>{

        }).catch((err)=>{console.log(err)})
    }
}//spot3check

const spot4Check=()=>{
    if(spot4.name=="p" || spot4.status=="dead"){
        return
    }

    if(spot4.status=="paralyzed"){
        var para=""
        
        if(spot4.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{statusAmount:6}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot4.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(getRandom(1,2)==2){
            para="yes"
        }
        axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{attacked:para,statusAmount:spot4.statusAmount-1}).then((res)=>{}).catch((err)=>{console.log(err)})
    }

    if(spot4.status=="confused"){
        var con=""
        var dmg=0
        
        if(spot4.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{statusAmount:4}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot4.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(getRandom(1,2)==2){
            con="yes"
            dmg=25
            alert("Pokemon attacked itself")
        }
        axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{attacked:con,statusAmount:spot4.statusAmount-1,hp:spot1.hp-dmg}).then((res)=>{
            if(res.data.hp<=0){
                axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{status:"",statusAmount:-1,hp:5}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }

    if(spot4.status=="frozen"){
        
        if(spot4.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{statusAmount:4,attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot4.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }

        axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{attacked:"yes",statusAmount:spot4.statusAmount-1}).then((res)=>{}).catch((err)=>{console.log(err)})
    }

    if(spot4.status=="burned"){
        
        if(spot4.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{statusAmount:6}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot4.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }

        axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{statusAmount:spot4.statusAmount-1,hp:spot4.hp-15}).then((res)=>{
            if(res.data.hp<=0){
                axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{status:"",statusAmount:-1,hp:5}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }

    if(spot4.status=="poisoned"){
        
        if(spot4.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{statusAmount:12}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot4.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }

        axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{statusAmount:spot4.statusAmount-1,hp:spot4.hp-10}).then((res)=>{
            if(res.data.hp<=0){
                axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{status:"",statusAmount:-1,hp:5}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }

    if(spot4.status=="charmed"){
        
        if(spot4.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{statusAmount:4}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot4.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{status:"",statusAmount:-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        
        axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{statusAmount:spot4.statusAmount-1,hp:spot4.hp-15}).then((res)=>{
            
        if(spot1.name!="p" && spot1.status!="dead"){
               
                axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{hp:spot1.hp+20}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            if(spot2.name!="p" && spot2.status!="dead"){
                
                axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{hp:spot2.hp+20}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            if(res.data.hp<=0){
                axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{status:"",statusAmount:-1,hp:5}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        }).catch((err)=>{console.log(err)})
    }
    if(spot4.status=="cursed"){
        
        if(spot4.statusAmount==-1){
            axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{statusAmount:4}).then((res)=>{}).catch((err)=>{console.log(err)})
            return
        }
        if(spot4.statusAmount==0){
            axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{status:"",statusAmount:-1,hp:spot4.hp-75}).then((res)=>{
                if(res.data.hp<=0){
                    axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{status:"",statusAmount:-1,hp:5}).then((res)=>{}).catch((err)=>{console.log(err)})
                }
            }).catch((err)=>{console.log(err)})
            return
        }

        axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{statusAmount:spot4.statusAmount-1}).then((res)=>{

        }).catch((err)=>{console.log(err)})
    }
}//spot4check








//~~~~~~~~~~~status~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~attacks

const attack113=(e)=>{
    e.preventDefault()
    if(user.attacks<=0){
        return
    }
    if(spot1.attacked=="yes" && game.round%2!=0){
        return
    }
    if(spot3.attacked=="yes" && game.round%2==0){
        return
    }
    if(game.round%2!=0){
        if(spot1.attack1Damage==0){return}
        if(player2.field==0){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{player2pf:"redb",selectDmg:spot1.attack1Damage}).then((res)=>{
                console.log(res.data)
                axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
                axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
                window.location.reload(false);
            }).catch((err)=>{console.log(err)})
        }
        if(player2.field !=0){
        if(user.holder != ""){axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:""}).then((res)=>{}).catch((err)=>{console.log(err)})}
        statusGiver(spot1.attack1Des,"spot1")
        if(game.logMoves==0){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{log1Attacker:"spot1",log1T1:spot1.attack1Type1,log1T2:spot1.attack1Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
        if(game.logMoves==1){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{log2Attacker:"spot1",log2T1:spot1.attack1Type1,log2T2:spot1.attack1Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
            axios.put(`http://localhost:8000/api/game/${game._id}`,{p2Summon:"redb",selectDmg:spot1.attack1Damage, selectT1:spot1.attack1Type1, selectT2:spot1.attack1Type2}).then((res)=>{
            console.log(res.data)
            axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
            if(spot3.name != "p"){
                var damage= calculate(spot1.attack1Damage,spot1.attack1Type1,spot1.attack1Type2,spot3.weak1,
                    spot3.weak1Amount,spot3.weak2, spot3.weak2Amount,spot3.resist1,spot3.resist1Amount,
                    spot3.resist2,spot3.resist2Amount);
                axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{damage:damage,damageT1:spot1.attack1Type1,damageT2:spot1.attack1Type2,hp2:spot3.hp-damage}).then((res)=>{
                    console.log(res.data)
                    setTimeout(()=>{window.location.reload(false);},50)
                }).catch((err)=>{console.log(err)})
                }
                if(spot4.name != "p"){
                    var damage= calculate(spot1.attack1Damage,spot1.attack1Type1,spot1.attack1Type2,spot4.weak1,
                        spot4.weak1Amount,spot4.weak2, spot4.weak2Amount,spot4.resist1,spot4.resist1Amount,
                        spot4.resist2,spot4.resist2Amount);
                    axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{damage:damage,damageT1:spot1.attack1Type1,damageT2:spot1.attack1Type2,hp2:spot4.hp-damage}).then((res)=>{
                        console.log(res.data)
                        setTimeout(()=>{window.location.reload(false);},50)
                    }).catch((err)=>{console.log(err)})
                    }

        }).catch((err)=>{console.log(err)})
        }

    }

    if(game.round%2==0){
        if(spot3.attack1Damage==0){return}
        if(player1.field==0){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{player1pf:"redb",selectDmg:spot3.attack1Damage}).then((res)=>{
                console.log(res.data)
                axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
                axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
                window.location.reload(false);
            }).catch((err)=>{console.log(err)})
        }
        if(player1.field !=0){
            if(user.holder != ""){axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:""}).then((res)=>{}).catch((err)=>{console.log(err)})}
            statusGiver(spot3.attack1Des,"spot3")
            if(game.logMoves==0){
                axios.put(`http://localhost:8000/api/game/${game._id}`,{log1Attacker:"spot3",log1T1:spot3.attack1Type1,log1T2:spot3.attack1Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            if(game.logMoves==1){
                axios.put(`http://localhost:8000/api/game/${game._id}`,{log2Attacker:"spot3",log2T1:spot3.attack1Type1,log2T2:spot3.attack1Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
             axios.put(`http://localhost:8000/api/game/${game._id}`,{p1Summon:"redb",selectDmg:spot3.attack1Damage, selectT1:spot3.attack1Type1, selectT2:spot3.attack1Type2 }).then((res)=>{
            console.log(res.data)
            axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
            if(spot1.name != "p"){
                var damage= calculate(spot3.attack1Damage,spot3.attack1Type1,spot3.attack1Type2,spot1.weak1,
                    spot1.weak1Amount,spot1.weak2, spot1.weak2Amount,spot1.resist1,spot1.resist1Amount,
                    spot1.resist2,spot1.resist2Amount);
                axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{damage:damage,damageT1:spot3.attack1Type1,damageT2:spot3.attack1Type2,hp2:spot1.hp-damage}).then((res)=>{
                    console.log(res.data)
                    setTimeout(()=>{window.location.reload(false);},50)
                }).catch((err)=>{console.log(err)})
                }
                if(spot2.name != "p"){
                    var damage= calculate(spot3.attack1Damage,spot3.attack1Type1,spot3.attack1Type2,spot2.weak1,
                        spot2.weak1Amount,spot2.weak2, spot2.weak2Amount,spot2.resist1,spot2.resist1Amount,
                        spot2.resist2,spot2.resist2Amount);
                    axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{damage:damage,damageT1:spot3.attack1Type1,damageT2:spot3.attack1Type2,hp2:spot2.hp-damage}).then((res)=>{
                        console.log(res.data)
                        setTimeout(()=>{window.location.reload(false);},50)
                    }).catch((err)=>{console.log(err)})
                    }

        }).catch((err)=>{console.log(err)})
        }
       
    }
}

const attack213=(e)=>{
    e.preventDefault()
    if(user.attacks<=0){
        return
    }
    if(spot1.attacked=="yes" && game.round%2!=0){
        return
    }
    if(spot3.attacked=="yes" && game.round%2==0){
        return
    }
    if(game.round%2!=0){
        if(spot1.attack2Damage==0){return}
        if(player2.field==0){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{player2pf:"redb",selectDmg:spot1.attack2Damage}).then((res)=>{
                console.log(res.data)
                axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
                axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
                window.location.reload(false);
            }).catch((err)=>{console.log(err)})
        }
        if(player2.field !=0){
            if(user.holder != ""){axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:""}).then((res)=>{}).catch((err)=>{console.log(err)})}
            statusGiver(spot1.attack2Des,"spot1")
            if(game.logMoves==0){
                axios.put(`http://localhost:8000/api/game/${game._id}`,{log1Attacker:"spot1",log1T1:spot1.attack2Type1,log1T2:spot1.attack2Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            if(game.logMoves==1){
                axios.put(`http://localhost:8000/api/game/${game._id}`,{log2Attacker:"spot1",log2T1:spot1.attack2Type1,log2T2:spot1.attack2Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
             axios.put(`http://localhost:8000/api/game/${game._id}`,{p2Summon:"redb",selectDmg:spot1.attack2Damage, selectT1:spot1.attack2Type1, selectT2:spot1.attack2Type2 }).then((res)=>{
            console.log(res.data)
            axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
            if(spot3.name != "p"){
                var damage= calculate(spot1.attack2Damage,spot1.attack2Type1,spot1.attack2Type2,spot3.weak1,
                    spot3.weak1Amount,spot3.weak2, spot3.weak2Amount,spot3.resist1,spot3.resist1Amount,
                    spot3.resist2,spot3.resist2Amount);
                axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{damage:damage,damageT1:spot1.attack2Type1,damageT2:spot1.attack2Type2,hp2:spot3.hp-damage}).then((res)=>{
                    console.log(res.data)
                    setTimeout(()=>{window.location.reload(false);},50)
                }).catch((err)=>{console.log(err)})
                }
                if(spot4.name != "p"){
                    var damage= calculate(spot1.attack2Damage,spot1.attack2Type1,spot1.attack2Type2,spot4.weak1,
                        spot4.weak1Amount,spot4.weak2, spot4.weak2Amount,spot4.resist1,spot4.resist1Amount,
                        spot4.resist2,spot4.resist2Amount);
                    axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{damage:damage,damageT1:spot1.attack2Type1,damageT2:spot1.attack2Type2,hp2:spot4.hp-damage}).then((res)=>{
                        console.log(res.data)
                        setTimeout(()=>{window.location.reload(false);},50)
                    }).catch((err)=>{console.log(err)})
                    }

        }).catch((err)=>{console.log(err)})
        }
       
    }

    if(game.round%2==0){
        if(spot3.attack2Damage==0){return}
        if(player1.field==0){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{player1pf:"redb",selectDmg:spot3.attack2Damage}).then((res)=>{
                console.log(res.data)
                axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
                axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
                window.location.reload(false);
            }).catch((err)=>{console.log(err)})
        }
        if(player1.field !=0){
            if(user.holder != ""){axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:""}).then((res)=>{}).catch((err)=>{console.log(err)})}
            statusGiver(spot3.attack2Des,"spot3")
            if(game.logMoves==0){
                axios.put(`http://localhost:8000/api/game/${game._id}`,{log1Attacker:"spot3",log1T1:spot3.attack2Type1,log1T2:spot3.attack2Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            if(game.logMoves==1){
                axios.put(`http://localhost:8000/api/game/${game._id}`,{log2Attacker:"spot3",log2T1:spot3.attack2Type1,log2T2:spot3.attack2Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            axios.put(`http://localhost:8000/api/game/${game._id}`,{p1Summon:"redb",selectDmg:spot3.attack2Damage, selectT1:spot3.attack2Type1, selectT2:spot3.attack2Type2 }).then((res)=>{
            console.log(res.data)
            axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
            if(spot1.name != "p"){
                var damage= calculate(spot3.attack2Damage,spot3.attack2Type1,spot3.attack2Type2,spot1.weak1,
                    spot1.weak1Amount,spot1.weak2, spot1.weak2Amount,spot1.resist1,spot1.resist1Amount,
                    spot1.resist2,spot1.resist2Amount);
                axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{damage:damage,damageT1:spot3.attack2Type1,damageT2:spot3.attack2Type2,hp2:spot1.hp-damage}).then((res)=>{
                    console.log(res.data)
                    setTimeout(()=>{window.location.reload(false);},50)
                }).catch((err)=>{console.log(err)})
                }
                if(spot2.name != "p"){
                    var damage= calculate(spot3.attack2Damage,spot3.attack2Type1,spot3.attack2Type2,spot2.weak1,
                        spot2.weak1Amount,spot2.weak2, spot2.weak2Amount,spot2.resist1,spot2.resist1Amount,
                        spot2.resist2,spot2.resist2Amount);
                    axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{damage:damage,damageT1:spot3.attack2Type1,damageT2:spot3.attack2Type2,hp2:spot2.hp-damage}).then((res)=>{
                        console.log(res.data)
                        setTimeout(()=>{window.location.reload(false);},50)
                    }).catch((err)=>{console.log(err)})
                    }

        }).catch((err)=>{console.log(err)})
        }

    }
}

const attack313=(e)=>{
    e.preventDefault()
    if(user.attacks<=0){
        return
    }
    if(spot1.attacked=="yes" && game.round%2!=0){
        return
    }
    if(spot3.attacked=="yes" && game.round%2==0){
        return
    }
    if(game.round%2!=0){
        if(spot1.attack3Damage==0){return}
        if(player2.field==0){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{player2pf:"redb",selectDmg:spot1.attack3Damage}).then((res)=>{
                console.log(res.data)
                axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
                axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
                window.location.reload(false);
            }).catch((err)=>{console.log(err)})
        }
        if(player2.field !=0){
            if(user.holder != ""){axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:""}).then((res)=>{}).catch((err)=>{console.log(err)})}
            statusGiver(spot1.attack3Des,"spot1")
            if(game.logMoves==0){
                axios.put(`http://localhost:8000/api/game/${game._id}`,{log1Attacker:"spot1",log1T1:spot1.attack3Type1,log1T2:spot1.attack3Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            if(game.logMoves==1){
                axios.put(`http://localhost:8000/api/game/${game._id}`,{log2Attacker:"spot1",log2T1:spot1.attack3Type1,log2T2:spot1.attack3Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
        axios.put(`http://localhost:8000/api/game/${game._id}`,{p2Summon:"redb",selectDmg:spot1.attack3Damage, selectT1:spot1.attack3Type1, selectT2:spot1.attack3Type2 }).then((res)=>{
            console.log(res.data)
            axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
            if(spot3.name != "p"){
                var damage= calculate(spot1.attack3Damage,spot1.attack3Type1,spot1.attack3Type2,spot3.weak1,
                    spot3.weak1Amount,spot3.weak2, spot3.weak2Amount,spot3.resist1,spot3.resist1Amount,
                    spot3.resist2,spot3.resist2Amount);
                axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{damage:damage,damageT1:spot1.attack3Type1,damageT2:spot1.attack3Type2,hp2:spot3.hp-damage}).then((res)=>{
                    console.log(res.data)
                    setTimeout(()=>{window.location.reload(false);},50)
                }).catch((err)=>{console.log(err)})
                }
                if(spot4.name != "p"){
                    var damage= calculate(spot1.attack3Damage,spot1.attack3Type1,spot1.attack3Type2,spot4.weak1,
                        spot4.weak1Amount,spot4.weak2, spot4.weak2Amount,spot4.resist1,spot4.resist1Amount,
                        spot4.resist2,spot4.resist2Amount);
                    axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{damage:damage,damageT1:spot1.attack3Type1,damageT2:spot1.attack3Type2,hp2:spot4.hp-damage}).then((res)=>{
                        console.log(res.data)
                        setTimeout(()=>{window.location.reload(false);},50)
                    }).catch((err)=>{console.log(err)})
                    }

        }).catch((err)=>{console.log(err)})
        }
 
    }

    if(game.round%2==0){
      if(spot3.attack3Damage==0){return}
      if(player1.field==0){
        axios.put(`http://localhost:8000/api/game/${game._id}`,{player1pf:"redb",selectDmg:spot3.attack3Damage}).then((res)=>{
            console.log(res.data)
            axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
            window.location.reload(false);
        }).catch((err)=>{console.log(err)})
    }
    if(player1.field !=0){
        if(user.holder != ""){axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:""}).then((res)=>{}).catch((err)=>{console.log(err)})}
        statusGiver(spot3.attack3Des,"spot3")
        if(game.logMoves==0){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{log1Attacker:"spot3",log1T1:spot3.attack3Type1,log1T2:spot3.attack3Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
        if(game.logMoves==1){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{log2Attacker:"spot3",log2T1:spot3.attack3Type1,log2T2:spot3.attack3Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
            axios.put(`http://localhost:8000/api/game/${game._id}`,{p1Summon:"redb",selectDmg:spot3.attack3Damage, selectT1:spot3.attack3Type1, selectT2:spot3.attack3Type2 }).then((res)=>{
            console.log(res.data)
            axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
            if(spot1.name != "p"){
                var damage= calculate(spot3.attack3Damage,spot3.attack3Type1,spot3.attack3Type2,spot1.weak1,
                    spot1.weak1Amount,spot1.weak2, spot1.weak2Amount,spot1.resist1,spot1.resist1Amount,
                    spot1.resist2,spot1.resist2Amount);
                axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{damage:damage,damageT1:spot3.attack3Type1,damageT2:spot3.attack3Type2,hp2:spot1.hp-damage}).then((res)=>{
                    console.log(res.data)
                    setTimeout(()=>{window.location.reload(false);},50)
                }).catch((err)=>{console.log(err)})
                }
                if(spot2.name != "p"){
                    var damage= calculate(spot3.attack3Damage,spot3.attack3Type1,spot3.attack3Type2,spot2.weak1,
                        spot2.weak1Amount,spot2.weak2, spot2.weak2Amount,spot2.resist1,spot2.resist1Amount,
                        spot2.resist2,spot2.resist2Amount);
                    axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{damage:damage,damageT1:spot3.attack3Type1,damageT2:spot3.attack3Type2,hp2:spot2.hp-damage}).then((res)=>{
                        console.log(res.data)
                        setTimeout(()=>{window.location.reload(false);},50)
                    }).catch((err)=>{console.log(err)})
                    }

        }).catch((err)=>{console.log(err)})
    }

    }
}

const attack124=(e)=>{
    e.preventDefault()
    if(user.attacks<=0){
        return
    }
    if(spot2.attacked=="yes" && game.round%2!=0){
        return
    }
    if(spot4.attacked=="yes" && game.round%2==0){
        return
    }
    if(game.round%2!=0){
        if(spot2.attack1Damage==0){return}
        if(player2.field==0){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{player2pf:"redb",selectDmg:spot2.attack1Damage}).then((res)=>{
                console.log(res.data)
                axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
                axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
                window.location.reload(false);
            }).catch((err)=>{console.log(err)})
        }
        if(player2.field !=0){
            if(user.holder != ""){axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:""}).then((res)=>{}).catch((err)=>{console.log(err)})}
            statusGiver(spot2.attack1Des,"spot2")
            if(game.logMoves==0){
                axios.put(`http://localhost:8000/api/game/${game._id}`,{log1Attacker:"spot2",log1T1:spot2.attack1Type1,log1T2:spot2.attack1Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            if(game.logMoves==1){
                axios.put(`http://localhost:8000/api/game/${game._id}`,{log2Attacker:"spot2",log2T1:spot2.attack1Type1,log2T2:spot2.attack1Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            axios.put(`http://localhost:8000/api/game/${game._id}`,{p2Summon:"redb",selectDmg:spot2.attack1Damage, selectT1:spot2.attack1Type1, selectT2:spot2.attack1Type2}).then((res)=>{
            console.log(res.data)
            axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
            if(spot3.name != "p"){
                var damage= calculate(spot2.attack1Damage,spot2.attack1Type1,spot2.attack1Type2,spot3.weak1,
                    spot3.weak1Amount,spot3.weak2, spot3.weak2Amount,spot3.resist1,spot3.resist1Amount,
                    spot3.resist2,spot3.resist2Amount);
                axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{damage:damage,damageT1:spot2.attack1Type1,damageT2:spot2.attack1Type2,hp2:spot3.hp-damage}).then((res)=>{
                    console.log(res.data)
                    setTimeout(()=>{window.location.reload(false);},50)
                }).catch((err)=>{console.log(err)})
                }
                if(spot4.name != "p"){
                    var damage= calculate(spot2.attack1Damage,spot2.attack1Type1,spot2.attack1Type2,spot4.weak1,
                        spot4.weak1Amount,spot4.weak2, spot4.weak2Amount,spot4.resist1,spot4.resist1Amount,
                        spot4.resist2,spot4.resist2Amount);
                    axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{damage:damage,damageT1:spot2.attack1Type1,damageT2:spot2.attack1Type2,hp2:spot4.hp-damage}).then((res)=>{
                        console.log(res.data)
                        setTimeout(()=>{window.location.reload(false);},50)
                    }).catch((err)=>{console.log(err)})
                    }

        }).catch((err)=>{console.log(err)})
        }

    }

    if(game.round%2==0){
        if(spot4.attack1Damage==0){return}
        if(player1.field==0){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{player1pf:"redb",selectDmg:spot4.attack1Damage}).then((res)=>{
                console.log(res.data)
                axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
                axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
                window.location.reload(false);
            }).catch((err)=>{console.log(err)})
        }
        if(player1.field !=0){
            if(user.holder != ""){axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:""}).then((res)=>{}).catch((err)=>{console.log(err)})}
            statusGiver(spot4.attack1Des,"spot4")
            if(game.logMoves==0){
                axios.put(`http://localhost:8000/api/game/${game._id}`,{log1Attacker:"spot4",log1T1:spot4.attack1Type1,log1T2:spot4.attack1Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            if(game.logMoves==1){
                axios.put(`http://localhost:8000/api/game/${game._id}`,{log2Attacker:"spot4",log2T1:spot4.attack1Type1,log2T2:spot4.attack1Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            axios.put(`http://localhost:8000/api/game/${game._id}`,{p1Summon:"redb",selectDmg:spot4.attack1Damage, selectT1:spot4.attack1Type1, selectT2:spot4.attack1Type2 }).then((res)=>{
            console.log(res.data)
            axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
            if(spot1.name != "p"){
                var damage= calculate(spot4.attack1Damage,spot4.attack1Type1,spot4.attack1Type2,spot1.weak1,
                    spot1.weak1Amount,spot1.weak2, spot1.weak2Amount,spot1.resist1,spot1.resist1Amount,
                    spot1.resist2,spot1.resist2Amount);
                axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{damage:damage,damageT1:spot4.attack1Type1,damageT2:spot4.attack1Type2,hp2:spot1.hp-damage}).then((res)=>{
                    console.log(res.data)
                    setTimeout(()=>{window.location.reload(false);},50)
                }).catch((err)=>{console.log(err)})
                }
                if(spot2.name != "p"){
                    var damage= calculate(spot4.attack1Damage,spot4.attack1Type1,spot4.attack1Type2,spot2.weak1,
                        spot2.weak1Amount,spot2.weak2, spot2.weak2Amount,spot2.resist1,spot2.resist1Amount,
                        spot2.resist2,spot2.resist2Amount);
                    axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{damage:damage,damageT1:spot4.attack1Type1,damageT2:spot4.attack1Type2,hp2:spot2.hp-damage}).then((res)=>{
                        console.log(res.data)
                        setTimeout(()=>{window.location.reload(false);},50)
                    }).catch((err)=>{console.log(err)})
                    }

        }).catch((err)=>{console.log(err)})
        }

    }
}

const attack224=(e)=>{
    e.preventDefault()
    if(user.attacks<=0){
        return
    }
    if(spot2.attacked=="yes" && game.round%2!=0){
        return
    }
    if(spot4.attacked=="yes" && game.round%2==0){
        return
    }
    if(game.round%2!=0){
        if(spot2.attack2Damage==0){return}
        if(player2.field==0){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{player2pf:"redb",selectDmg:spot2.attack2Damage}).then((res)=>{
                console.log(res.data)
                axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
                axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
                window.location.reload(false);
            }).catch((err)=>{console.log(err)})
        }
        if(player2.field !=0){
            if(user.holder != ""){axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:""}).then((res)=>{}).catch((err)=>{console.log(err)})}
            statusGiver(spot2.attack2Des,"spot2")
            if(game.logMoves==0){
                axios.put(`http://localhost:8000/api/game/${game._id}`,{log1Attacker:"spot2",log1T1:spot2.attack2Type1,log1T2:spot2.attack2Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            if(game.logMoves==1){
                axios.put(`http://localhost:8000/api/game/${game._id}`,{log2Attacker:"spot2",log2T1:spot2.attack2Type1,log2T2:spot2.attack2Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            axios.put(`http://localhost:8000/api/game/${game._id}`,{p2Summon:"redb",selectDmg:spot2.attack2Damage, selectT1:spot2.attack2Type1, selectT2:spot2.attack2Type2 }).then((res)=>{
            console.log(res.data)
            axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
            if(spot3.name != "p"){
                var damage= calculate(spot2.attack2Damage,spot2.attack2Type1,spot2.attack2Type2,spot3.weak1,
                    spot3.weak1Amount,spot3.weak2, spot3.weak2Amount,spot3.resist1,spot3.resist1Amount,
                    spot3.resist2,spot3.resist2Amount);
                axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{damage:damage,damageT1:spot2.attack2Type1,damageT2:spot2.attack2Type2,hp2:spot3.hp-damage}).then((res)=>{
                    console.log(res.data)
                    setTimeout(()=>{window.location.reload(false);},50)
                }).catch((err)=>{console.log(err)})
                }
                if(spot4.name != "p"){
                    var damage= calculate(spot2.attack2Damage,spot2.attack2Type1,spot2.attack2Type2,spot4.weak1,
                        spot4.weak1Amount,spot4.weak2, spot4.weak2Amount,spot4.resist1,spot4.resist1Amount,
                        spot4.resist2,spot4.resist2Amount);
                    axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{damage:damage,damageT1:spot2.attack2Type1,damageT2:spot2.attack2Type2,hp2:spot4.hp-damage}).then((res)=>{
                        console.log(res.data)
                        setTimeout(()=>{window.location.reload(false);},50)
                    }).catch((err)=>{console.log(err)})
                    }

        }).catch((err)=>{console.log(err)})
        }

    }

    if(game.round%2==0){
        if(spot4.attack2Damage==0){return}
        if(player1.field==0){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{player1pf:"redb",selectDmg:spot4.attack2Damage}).then((res)=>{
                console.log(res.data)
                axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
                axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
                window.location.reload(false);
            }).catch((err)=>{console.log(err)})
        }
        if(player1.field !=0){
            if(user.holder != ""){axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:""}).then((res)=>{}).catch((err)=>{console.log(err)})}
            statusGiver(spot4.attack2Des,"spot4")
            if(game.logMoves==0){
                axios.put(`http://localhost:8000/api/game/${game._id}`,{log1Attacker:"spot4",log1T1:spot4.attack2Type1,log1T2:spot4.attack2Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            if(game.logMoves==1){
                axios.put(`http://localhost:8000/api/game/${game._id}`,{log2Attacker:"spot4",log2T1:spot4.attack2Type1,log2T2:spot4.attack2Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            axios.put(`http://localhost:8000/api/game/${game._id}`,{p1Summon:"redb",selectDmg:spot4.attack2Damage, selectT1:spot4.attack2Type1, selectT2:spot4.attack2Type2}).then((res)=>{
            console.log(res.data)
            axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
            
            if(spot1.name != "p"){
                var damage= calculate(spot4.attack2Damage,spot4.attack2Type1,spot4.attack2Type2,spot1.weak1,
                    spot1.weak1Amount,spot1.weak2, spot1.weak2Amount,spot1.resist1,spot1.resist1Amount,
                    spot1.resist2,spot1.resist2Amount);
                axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{damage:damage,damageT1:spot4.attack2Type1,damageT2:spot4.attack2Type2,hp2:spot1.hp-damage}).then((res)=>{
                    console.log(res.data)
                    setTimeout(()=>{window.location.reload(false);},50)
                }).catch((err)=>{console.log(err)})
                }
                if(spot2.name != "p"){
                    var damage= calculate(spot4.attack2Damage,spot4.attack2Type1,spot4.attack2Type2,spot2.weak1,
                        spot2.weak1Amount,spot2.weak2, spot2.weak2Amount,spot2.resist1,spot2.resist1Amount,
                        spot2.resist2,spot2.resist2Amount);
                    axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{damage:damage,damageT1:spot4.attack2Type1,damageT2:spot4.attack2Type2,hp2:spot2.hp-damage}).then((res)=>{
                        console.log(res.data)
                        setTimeout(()=>{window.location.reload(false);},50)
                    }).catch((err)=>{console.log(err)})
                    }

        }).catch((err)=>{console.log(err)})
    }

    }
}

const attack324=(e)=>{
    e.preventDefault()
    if(user.attacks<=0){
        return
    }
    if(spot2.attacked=="yes" && game.round%2!=0){
        return
    }
    if(spot4.attacked=="yes" && game.round%2==0){
        return
    }
    if(game.round%2!=0){
        if(spot2.attack3Damage==0){return}
        if(player2.field==0){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{player2pf:"redb",selectDmg:spot2.attack3Damage}).then((res)=>{
                console.log(res.data)
                axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
                axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
                window.location.reload(false);
            }).catch((err)=>{console.log(err)})
        }
        if(player2.field !=0){
            if(user.holder != ""){axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:""}).then((res)=>{}).catch((err)=>{console.log(err)})}
            statusGiver(spot2.attack3Des,"spot2")
            if(game.logMoves==0){
                axios.put(`http://localhost:8000/api/game/${game._id}`,{log1Attacker:"spot2",log1T1:spot2.attack3Type1,log1T2:spot2.attack3Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            if(game.logMoves==1){
                axios.put(`http://localhost:8000/api/game/${game._id}`,{log2Attacker:"spot2",log2T1:spot2.attack3Type1,log2T2:spot2.attack3Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            axios.put(`http://localhost:8000/api/game/${game._id}`,{p2Summon:"redb",selectDmg:spot2.attack3Damage, selectT1:spot2.attack3Type1, selectT2:spot2.attack3Type2 }).then((res)=>{
            console.log(res.data)
            axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
            if(spot3.name != "p"){
                var damage= calculate(spot2.attack3Damage,spot2.attack3Type1,spot2.attack3Type2,spot3.weak1,
                    spot3.weak1Amount,spot3.weak2, spot3.weak2Amount,spot3.resist1,spot3.resist1Amount,
                    spot3.resist2,spot3.resist2Amount);
                axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{damage:damage,damageT1:spot2.attack3Type1,damageT2:spot2.attack3Type2,hp2:spot3.hp-damage}).then((res)=>{
                    console.log(res.data)
                    setTimeout(()=>{window.location.reload(false);},50)
                }).catch((err)=>{console.log(err)})
                }
                if(spot4.name != "p"){
                    var damage= calculate(spot2.attack3Damage,spot2.attack3Type1,spot2.attack3Type2,spot4.weak1,
                        spot4.weak1Amount,spot4.weak2, spot4.weak2Amount,spot4.resist1,spot4.resist1Amount,
                        spot4.resist2,spot4.resist2Amount);
                    axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{damage:damage,damageT1:spot2.attack3Type1,damageT2:spot2.attack3Type2,hp2:spot4.hp-damage}).then((res)=>{
                        console.log(res.data)
                        setTimeout(()=>{window.location.reload(false);},50)
                    }).catch((err)=>{console.log(err)})
                    }

        }).catch((err)=>{console.log(err)})
        }

    }

    if(game.round%2==0){
        if(spot4.attack3Damage==0){return}
        if(player1.field==0){
  
            axios.put(`http://localhost:8000/api/game/${game._id}`,{player1pf:"redb",selectDmg:spot4.attack3Damage}).then((res)=>{
                console.log(res.data)
                axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
                axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
                window.location.reload(false);
            }).catch((err)=>{console.log(err)})
        }
        if(player1.field !=0){
            if(user.holder != ""){axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:""}).then((res)=>{}).catch((err)=>{console.log(err)})}
            statusGiver(spot4.attack3Des,"spot4")
            if(game.logMoves==0){
                axios.put(`http://localhost:8000/api/game/${game._id}`,{log1Attacker:"spot4",log1T1:spot4.attack3Type1,log1T2:spot4.attack3Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            if(game.logMoves==1){
                axios.put(`http://localhost:8000/api/game/${game._id}`,{log2Attacker:"spot4",log2T1:spot4.attack3Type1,log2T2:spot4.attack3Type2}).then((res)=>{}).catch((err)=>{console.log(err)})
            }
            axios.put(`http://localhost:8000/api/game/${game._id}`,{p1Summon:"redb",selectDmg:spot4.attack3Damage, selectT1:spot4.attack3Type1, selectT2:spot4.attack3Type2 }).then((res)=>{
            console.log(res.data)
            axios.put(`http://localhost:8000/api/user/${user._id}`,{attacks:user.attacks-1}).then((res)=>{}).catch((err)=>{console.log(err)})
            axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{attacked:"yes"}).then((res)=>{}).catch((err)=>{console.log(err)})
            if(spot1.name != "p"){
                var damage= calculate(spot4.attack3Damage,spot4.attack3Type1,spot4.attack3Type2,spot1.weak1,
                    spot1.weak1Amount,spot1.weak2, spot1.weak2Amount,spot1.resist1,spot1.resist1Amount,
                    spot1.resist2,spot1.resist2Amount);
                axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{damage:damage,damageT1:spot4.attack3Type1,damageT2:spot4.attack3Type2,hp2:spot1.hp-damage}).then((res)=>{
                    console.log(res.data)
                    setTimeout(()=>{window.location.reload(false);},50)
                }).catch((err)=>{console.log(err)})
                }
                if(spot2.name != "p"){
                    var damage= calculate(spot4.attack3Damage,spot4.attack3Type1,spot4.attack3Type2,spot2.weak1,
                        spot2.weak1Amount,spot2.weak2, spot2.weak2Amount,spot2.resist1,spot2.resist1Amount,
                        spot2.resist2,spot2.resist2Amount);
                    axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{damage:damage,damageT1:spot4.attack3Type1,damageT2:spot4.attack3Type2,hp2:spot2.hp-damage}).then((res)=>{
                        console.log(res.data)
                        setTimeout(()=>{window.location.reload(false);},50)
                    }).catch((err)=>{console.log(err)})
                    }

        }).catch((err)=>{console.log(err)})
        }

    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~attacks~~~~~~~~~~

const direct1=(e)=>{
    if(game.round%2 != 0 || user._id != player2._id){
        return
    }

    if(player1.field<=0 && game.selectDmg !=0){
        axios.put(`http://localhost:8000/api/user/${player1._id}`,{lifePoints: player1.lifePoints-game.selectDmg,emergency:user.emergency+1}).then((res)=>{
            console.log(res.data)
            axios.put(`http://localhost:8000/api/game/${game._id}`,{player1pf:"",selectDmg:0}).then((res)=>{
                window.location.reload(false);
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
    }
}

const direct2=(e)=>{
    if(game.round%2 == 0 || user._id != player1._id){
        return
    }

    if(player2.field<=0 && game.selectDmg !=0){
        axios.put(`http://localhost:8000/api/user/${player2._id}`,{lifePoints: player2.lifePoints-game.selectDmg,emergency:user.emergency+1}).then((res)=>{
            console.log(res.data)
            axios.put(`http://localhost:8000/api/game/${game._id}`,{player2pf:"",selectDmg:0}).then((res)=>{
                window.location.reload(false);
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
    }
}

const endHandeler= (e)=>{
    e.preventDefault(e);
    if(game.player1 == user._id && game.round%2==0){
        return
    }
    if(game.player2 == user._id && game.round%2!=0){
        return
    }
    if(game.turnd!="hide"){
        return
    }
     var add1Draw=0
     var add2Draw=0
     var add1Sum=0
     var add2Sum=0
     var attack1 =0
     var attack2 =0

    if(game.round==1){
        attack2=2
    }
    
    if(user._id== game.player1){
        add1Draw+=1
        if(user.summons==0){
            add1Sum+=1
        }
        if(user.attacks==1){
            attack1=1
        }
        if(user.attacks<=0){
            attack1=2
        }
    }
    if(user._id== game.player2){
        add2Draw+=1
        if(user.summons==0){
        add2Sum+=1
    }
    if(user.attacks==1){
        attack2=1
    }
    if(user.attacks<=0){
        attack2=2
    }
    }

    axios.put(`http://localhost:8000/api/game/${game._id}`,{round:game.round+1,select:"",p1Summon:"", p2Summon:"",turnd:"",timer:80}).then((res)=>{
        console.log(res.data)
        axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{attacked:""}).then((res)=>{}).catch((err)=>{console.log(err)})
        axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{attacked:""}).then((res)=>{}).catch((err)=>{console.log(err)})
        axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{attacked:""}).then((res)=>{}).catch((err)=>{console.log(err)})
        axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{attacked:""}).then((res)=>{}).catch((err)=>{console.log(err)})
        axios.put(`http://localhost:8000/api/user/${res.data.player1}`,{rounds: game.round+1,draws:player1.draws+add1Draw, summons:player1.summons+add1Sum,attacks:player1.attacks+attack1}).then((res)=>{
            console.log(res.data)
        }).catch((err)=>{console.log(err)})
        axios.put(`http://localhost:8000/api/user/${res.data.player2}`,{rounds: game.round+1, draws:player2.draws+add2Draw,summons:player2.summons+add2Sum,attacks:player2.attacks+attack2}).then((res)=>{
            console.log(res.data)
            spot1Check()
            spot2Check()
            spot3Check()
            spot4Check()
            //checks go here
            setTimeout(()=>{window.location.reload(false);},50)
            
        }).catch((err)=>{console.log(err)})
    }).catch((err)=>{console.log(err)})
}


const selectClear=(e)=>{
    
    if(game.select != "" ){
        setTimeout(()=>{
            axios.put(`http://localhost:8000/api/game/${game._id}`,{select:"",p1Summon:"", p2Summon:""}).then((res)=>{
                console.log(res.data)
                window.location.reload(false);
            }).catch((err)=>{console.log(err)})
        },50)

    }
}
const spot4Handeler=(e)=>{
    e.preventDefault();
    if(game.turnd!="hide"){
        return
    }

    if(game.select=="ExtraDraw_sp"|| game.select=="ExtraSummon_sp"||(spot4.name!="p" && game.select.includes("_sp"))){
        spellHandeler(spot4._id,game.select)
        return
    }

    if(user._id!=game.player2 && game.selectT1=="p" ){
        return
    }

    if(game.round%2!=0 && player2.field<=0 && game.selectDmg!=0){
        axios.put(`http://localhost:8000/api/user/${player2._id}`,{lifePoints: player2.lifePoints-game.selectDmg}).then((res)=>{
            console.log(res.data)
            axios.put(`http://localhost:8000/api/game/${game._id}`,{player2pf:"",selectDmg:0}).then((res)=>{
                window.location.reload(false);
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
    }
    if(game.round%2 !=0 && game.selectT1 !="p" && spot4.name != "p" && player2.field>0){
        var reveal = document.getElementById("s4hp").classList.remove("hide")
        var reveal2 = document.getElementById("s4dmg").classList.remove("hide")
        var reveal3 = document.getElementById("s4t1").classList.remove("hide")
        var reveal4 = document.getElementById("s4t2").classList.remove("hide")
        
        var status= ""
        if(game.logMoves==0){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{log1Attacked:spot4._id,log1Dmg:spot4.damage,logMoves:game.logMoves+1}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
        if(game.logMoves==1){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{log2Attacked:spot4._id,log2Dmg:spot4.damage,logMoves:game.logMoves+1}).then((res)=>{}).catch((err)=>{console.log(err)})
        }

        
        if(spot4.status != "" && spot4.status!="dead"){
            status=spot4.status
        }
        if(user.holder!="" && spot4.status==""){
            status=user.holder
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:""}).then((res)=>{}).catch((err)=>{console.log(err)})
        }


        if((spot4.hp2<=0) && spot4.status!="dead"){
            status="dead"
            axios.put(`http://localhost:8000/api/user/${player2._id}`,{field: player2.field-1,lifePoints:player2.lifePoints-100}).then((res)=>{
                console.log(res.data)
                axios.put(`http://localhost:8000/api/game/${game._id}`,{shows4:"hide"}).then((res)=>{
                    console.log(res.data)
            }).catch((err)=>{console.log(err)})
            }).catch((err)=>{console.log(err)})
        }
        axios.put(`http://localhost:8000/api/game/${game._id}`,{selectDmg:"",p1Summon:"", p2Summon:"",selectT1:"p",selectT2:"p"}).then((res)=>{
            axios.put(`http://localhost:8000/api/tempPoke/${spot4._id}`,{hp:spot4.hp2,hp2:0,damage:0,damageT1:"p",damageT2:"p",status:status}).then((res)=>{
                console.log(res.data)
                setTimeout(()=>{ window.location.reload(false);},700)
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
    }

    if(game.round%2!=0){
        return
    }
    if(game.select=="" && spot4.name !="p"){
        var reveal = document.getElementById("bigCard").classList.remove("hide")
        var reveal2 = document.getElementById("test24").classList.remove("hide")
        var reveal3 = document.getElementById("cancel").classList.remove("hide")
        return
    }

    if(user.summons==0){
        alert("you have 0 summons to use  :(")
        return
    }
    if(game.select.includes("_l")){
        
        if(user.field<2){
            alert("you must tribute 2 pokemon")
            return
        }
        axios.put(`http://localhost:8000/api/game/${game._id}`,{spot3:"",shows3:"hide"}).then((res)=>{
            console.log(res.data)
            axios.delete(`http://localhost:8000/api/tempPoke/${spot3._id}`).then((res)=>{
                console.log(res.data)
                
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
    }
    
    
    var counter= 0;
    var penalty =0;
    var add=0
    
    if(game.select.includes("_b")){
        add=1
        user.field= user.field+1

        if(spot4.name!="p"){
            axios.delete(`http://localhost:8000/api/tempPoke/${spot4._id}`).then((res)=>{}).catch((err)=>{console.log(err)})
            user.field=user.field-1
            counter=1
            if(user.discards==5){
                alert("you have reach the discard limit any futher will cost 100 lp")
            }
            if (user.discards>=6){
                
                penalty=100
            }
        }
    }


    axios.get(`http://localhost:8000/api/pokemon/${game.select}`).then((res)=>{
        console.log(res.data)
        
        if(!(game.select.includes("_b"))){
            if(spot4.name=="p"){
                return
            }
            
                if(res.data[0].prev != spot4.name && !(game.select.includes("_l"))){
                    alert("You must tribute "+res.data[0].prev)
                    window.location.reload(false);
                    
                    return
                }
                    
            if(game.select.includes("_l")){
                user.field= user.field-1
            }
           
        }

        axios.post("http://localhost:8000/api/tempPoke",{
            name:res.data[0].name, type1:res.data[0].type1, type2:res.data[0].type2,hp:res.data[0].hp,prev:res.data[0].prev,
            attack1:res.data[0].attack1,attack1Type1:res.data[0].attack1Type1,attack1Type2:res.data[0].attack1Type2,attack1Des:res.data[0].attack1Des,
            attack1Damage:res.data[0].attack1Damage, attack2:res.data[0].attack2, attack2Type1:res.data[0].attack2Type1,attack2Type2:res.data[0].attack2Type2,attack2Des:res.data[0].attack2Des,
            attack2Damage:res.data[0].attack2Damage,attack3:res.data[0].attack3, attack3Type1:res.data[0].attack3Type1, attack3Type2:res.data[0].attack3Type2,
            attack3Des:res.data[0].attack3Des, attack3Damage: res.data[0].attack3Damage,weak1:res.data[0].weak1, weak1Amount:res.data[0].weak1Amount,weak2:res.data[0].weak2,
            weak2Amount:res.data[0].weak2Amount, resist1:res.data[0].resist1, resist1Amount:res.data[0].resist1Amount, resist2:res.data[0].resist2, resist2Amount:res.data[0].resist2Amount,
            damageT1:"p",damageT2:"p"
            }).then((res)=>{
                axios.put(`http://localhost:8000/api/user/${user._id}`,{field:user.field,stage1s:user.stage1s-add,summons:user.summons-1,discards:user.discards+counter,lifePoints:user.lifePoints-penalty}).then((res)=>{
                    console.log(res.data)
                }).catch((err)=>{console.log(err)})
            console.log(res.data)
            for(let i=0; i<user.hand.length; i++){
                if(res.data.name==user.hand[i]){
                    user.hand.splice(i,1)
                    break;
                }
            }
            user.hand = user.hand.filter((h)=>{return h!=null})
                axios.put(`http://localhost:8000/api/user/${user._id}`,{hand:user.hand}).then((res)=>{
            
        }).catch((err)=>{console.log(err)})
            axios.put(`http://localhost:8000/api/game/${game._id}`,{spot4:res.data._id,shows4:""}).then((res)=>{
                console.log(res.data)
            }).catch((err)=>console.log(err))
        }).catch((err)=>{console.log(err)})

    }).catch((err)=>{console.log(err)})
}

const spot3Handeler=(e)=>{
    e.preventDefault();
    if(game.turnd!="hide"){
        return
    }

    if(game.select=="ExtraDraw_sp"|| game.select=="ExtraSummon_sp"||(spot3.name!="p" && game.select.includes("_sp"))){
        spellHandeler(spot3._id,game.select)
        return
    }

    if(user._id!=game.player2 && game.selectT1=="p" ){
        return
    }

    if(game.round%2!=0 && player2.field<=0 && game.selectDmg!=0){
        axios.put(`http://localhost:8000/api/user/${player2._id}`,{lifePoints: player2.lifePoints-game.selectDmg}).then((res)=>{
            console.log(res.data)
            axios.put(`http://localhost:8000/api/game/${game._id}`,{player2pf:"",selectDmg:0}).then((res)=>{
                window.location.reload(false);
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
    }

    if(game.round%2 !=0 && game.selectT1 !="p" && spot3.name != "p" && player2.field>0){
        var reveal = document.getElementById("s3hp").classList.remove("hide")
        var reveal2 = document.getElementById("s3dmg").classList.remove("hide")
        var reveal3 = document.getElementById("s3t1").classList.remove("hide")
        var reveal4 = document.getElementById("s3t2").classList.remove("hide")
        
        var status= ""
        if(game.logMoves==0){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{log1Attacked:spot3._id,log1Dmg:spot3.damage,logMoves:game.logMoves+1}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
        if(game.logMoves==1){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{log2Attacked:spot3._id,log2Dmg:spot3.damage,logMoves:game.logMoves+1}).then((res)=>{}).catch((err)=>{console.log(err)})
        }

        if(spot3.status != "" && spot3.status!="dead"){
            status=spot3.status
        }
        if(user.holder!="" && spot3.status==""){
            status=user.holder
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:""}).then((res)=>{}).catch((err)=>{console.log(err)})
        }

        if(spot3.hp2<=0 && spot3.status!="dead"){
            status="dead"
            axios.put(`http://localhost:8000/api/user/${player2._id}`,{field: player2.field-1,lifePoints:player2.lifePoints-100}).then((res)=>{
                console.log(res.data)
                axios.put(`http://localhost:8000/api/game/${game._id}`,{shows3:"hide"}).then((res)=>{
                    console.log(res.data)
            }).catch((err)=>{console.log(err)})
            }).catch((err)=>{console.log(err)})
        }
        axios.put(`http://localhost:8000/api/game/${game._id}`,{selectDmg:"",p1Summon:"", p2Summon:"",selectT1:"p",selectT2:"p"}).then((res)=>{
            axios.put(`http://localhost:8000/api/tempPoke/${spot3._id}`,{hp:spot3.hp2,hp2:0,damage:0,damageT1:"p",damageT2:"p",status:status}).then((res)=>{
                console.log(res.data)
                setTimeout(()=>{ window.location.reload(false);},700)
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
    }

    if(game.round%2!=0){
        return
    }
    if(game.select=="" && spot3.name !="p"){
        var reveal = document.getElementById("bigCard").classList.remove("hide")
        var reveal2 = document.getElementById("test13").classList.remove("hide")
        var reveal3 = document.getElementById("cancel").classList.remove("hide")
        return
    }
    if(user.summons==0){
        alert("you have 0 summons to use  :(")
        return
    }

    if(game.select.includes("_l")){
        
        if(user.field<2){
            alert("you must tribute 2 pokemon")
            return
        }
        axios.put(`http://localhost:8000/api/game/${game._id}`,{spot4:"",shows4:"hide"}).then((res)=>{
            console.log(res.data)
            axios.delete(`http://localhost:8000/api/tempPoke/${spot4._id}`).then((res)=>{
                console.log(res.data)
                
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
    }
   

    var counter= 0;
    var penalty =0;
    var add=0
    if(game.select.includes("_b")){
        add=1
        user.field= user.field+1
        if(spot3.name!="p"){
            axios.delete(`http://localhost:8000/api/tempPoke/${spot3._id}`).then((res)=>{}).catch((err)=>{console.log(err)})
            user.field= user.field-1
            counter=1
            if(user.discards==5){
                alert("you have reach the discard limit any futher will cost 100 lp")
            }
            if (user.discards>=6){
                
                penalty=100
            }
        }
    }
 

    axios.get(`http://localhost:8000/api/pokemon/${game.select}`).then((res)=>{

        if(!(game.select.includes("_b"))){
            if(spot3.name=="p"){
                return
            }
            
                if(res.data[0].prev != spot3.name && !(game.select.includes("_l"))){
                    alert("You must tribute "+res.data[0].prev)
                    window.location.reload(false);
                    
                    return
                }
                    
           
                if(game.select.includes("_l")){
                    user.field= user.field-1
                }
        }
        
        axios.post("http://localhost:8000/api/tempPoke",{
            name:res.data[0].name, type1:res.data[0].type1, type2:res.data[0].type2,hp:res.data[0].hp,prev:res.data[0].prev,
            attack1:res.data[0].attack1,attack1Type1:res.data[0].attack1Type1,attack1Type2:res.data[0].attack1Type2,attack1Des:res.data[0].attack1Des,
            attack1Damage:res.data[0].attack1Damage, attack2:res.data[0].attack2, attack2Type1:res.data[0].attack2Type1,attack2Type2:res.data[0].attack2Type2, attack2Des:res.data[0].attack2Des,
            attack2Damage:res.data[0].attack2Damage,attack3:res.data[0].attack3, attack3Type1:res.data[0].attack3Type1, attack3Type2:res.data[0].attack3Type2,
            attack3Des:res.data[0].attack3Des, attack3Damage: res.data[0].attack3Damage,weak1:res.data[0].weak1, weak1Amount:res.data[0].weak1Amount,weak2:res.data[0].weak2,
            weak2Amount:res.data[0].weak2Amount, resist1:res.data[0].resist1, resist1Amount:res.data[0].resist1Amount, resist2:res.data[0].resist2, resist2Amount:res.data[0].resist2Amount,
            damageT1:"p",damageT2:"p"
            }).then((res)=>{
                axios.put(`http://localhost:8000/api/user/${user._id}`,{field:user.field,stage1s:user.stage1s-add,summons:user.summons-1,discards:user.discards+counter,lifePoints:user.lifePoints-penalty}).then((res)=>{
                    console.log(res.data)
                }).catch((err)=>{console.log(err)})
            console.log(res.data)
            for(let i=0; i<user.hand.length; i++){
                if(res.data.name==user.hand[i]){
                    user.hand.splice(i,1)
                    break;
                }
            }
            user.hand = user.hand.filter((h)=>{return h!=null})
                axios.put(`http://localhost:8000/api/user/${user._id}`,{hand:user.hand}).then((res)=>{
            
        }).catch((err)=>{console.log(err)})
            axios.put(`http://localhost:8000/api/game/${game._id}`,{spot3:res.data._id,shows3:""}).then((res)=>{
                console.log(res.data)
            }).catch((err)=>console.log(err))
        }).catch((err)=>{console.log(err)})

    }).catch((err)=>{console.log(err)})
}

const spot2Handeler=(e)=>{
    e.preventDefault();
    if(game.turnd!="hide"){
        return
    }
    if(game.select=="ExtraDraw_sp"|| game.select=="ExtraSummon_sp"||(spot2.name!="p" && game.select.includes("_sp"))){
        spellHandeler(spot2._id,game.select)
        return
    }

    if(user._id!=game.player1 && game.selectT1=="p" ){
        return
    }
    if(game.round%2==0 && player1.field<=0 && game.selectDmg!=0){
        axios.put(`http://localhost:8000/api/user/${player1._id}`,{lifePoints: player1.lifePoints-game.selectDmg}).then((res)=>{
            console.log(res.data)
            axios.put(`http://localhost:8000/api/game/${game._id}`,{player1pf:"",selectDmg:0}).then((res)=>{
                window.location.reload(false);
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
    }

    if(game.round%2 ==0 && game.selectT1 !="p" && spot2.name != "p" && player1.field>0){
        var reveal = document.getElementById("s2hp").classList.remove("hide")
        var reveal2 = document.getElementById("s2dmg").classList.remove("hide")
        var reveal3 = document.getElementById("s2t1").classList.remove("hide")
        var reveal4 = document.getElementById("s2t2").classList.remove("hide")
        
        var status= ""
        if(game.logMoves==0){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{log1Attacked:spot2._id,log1Dmg:spot2.damage,logMoves:game.logMoves+1}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
        if(game.logMoves==1){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{log2Attacked:spot2._id,log2Dmg:spot2.damage,logMoves:game.logMoves+1}).then((res)=>{}).catch((err)=>{console.log(err)})
        }

        if(spot2.status != "" && spot2.status!="dead"){
            status=spot2.status
        }
        if(user.holder!="" && spot2.status==""){
            status=user.holder
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:""}).then((res)=>{}).catch((err)=>{console.log(err)})
        }

        if(spot2.hp2<=0 && spot2.status!="dead"){
            status="dead"
            axios.put(`http://localhost:8000/api/user/${player1._id}`,{field: player1.field-1,lifePoints:player1.lifePoints-100}).then((res)=>{
                console.log(res.data)
                axios.put(`http://localhost:8000/api/game/${game._id}`,{shows2:"hide"}).then((res)=>{
                    console.log(res.data)
            }).catch((err)=>{console.log(err)})
            }).catch((err)=>{console.log(err)})
        }
        axios.put(`http://localhost:8000/api/game/${game._id}`,{selectDmg:"",p1Summon:"", p2Summon:"",selectT1:"p",selectT2:"p"}).then((res)=>{
            axios.put(`http://localhost:8000/api/tempPoke/${spot2._id}`,{hp:spot2.hp2,hp2:0,damage:0,damageT1:"p",damageT2:"p",status:status}).then((res)=>{
                console.log(res.data)
                setTimeout(()=>{ window.location.reload(false);},700)
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
    }

    if(game.round%2==0){
        return
    }
    if(game.select=="" && spot2.name !="p"){
        var reveal = document.getElementById("bigCard").classList.remove("hide")
        var reveal2 = document.getElementById("test24").classList.remove("hide")
        var reveal3 = document.getElementById("cancel").classList.remove("hide")
        return
    }

    if(user.summons==0){
        alert("you have 0 summons to use  :(")
        return
    }
    if(game.select.includes("_l")){
        
        if(user.field<2){
            alert("you must tribute 2 pokemon")
            return
        }
        axios.put(`http://localhost:8000/api/game/${game._id}`,{spot1:"",shows1:"hide"}).then((res)=>{
            console.log(res.data)
            axios.delete(`http://localhost:8000/api/tempPoke/${spot1._id}`).then((res)=>{
                console.log(res.data)
                
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
    }
    

    

    var counter= 0;
    var penalty =0;
    var add=0

    if(game.select.includes("_b")){
        add=1
        user.field= user.field+1
        if(spot2.name!="p"){
            axios.delete(`http://localhost:8000/api/tempPoke/${spot2._id}`).then((res)=>{}).catch((err)=>{console.log(err)})
            user.field= user.field-1
            counter=1
            if(user.discards==5){
                alert("you have reach the discard limit any futher will cost 100 lp")
            }
            if (user.discards>=6){
                
                penalty=100
            }
        }
    }
 


    axios.get(`http://localhost:8000/api/pokemon/${game.select}`).then((res)=>{

        if(!(game.select.includes("_b"))){
            if(spot2.name=="p"){
                return
            }
            
                if(res.data[0].prev != spot2.name && !(game.select.includes("_l")) ){
                    alert("You must tribute "+res.data[0].prev)
                    window.location.reload(false);
                    
                    return
                }
                    
           
                if(game.select.includes("_l")){
                    user.field= user.field-1
                }
        }
        
        axios.post("http://localhost:8000/api/tempPoke",{
            name:res.data[0].name, type1:res.data[0].type1, type2:res.data[0].type2,hp:res.data[0].hp,prev:res.data[0].prev,
            attack1:res.data[0].attack1,attack1Type1:res.data[0].attack1Type1,attack1Type2:res.data[0].attack1Type2,attack1Des:res.data[0].attack1Des,
            attack1Damage:res.data[0].attack1Damage, attack2:res.data[0].attack2, attack2Type1:res.data[0].attack2Type1,attack2Type2:res.data[0].attack2Type2,attack2Des:res.data[0].attack2Des,
            attack2Damage:res.data[0].attack2Damage,attack3:res.data[0].attack3, attack3Type1:res.data[0].attack3Type1, attack3Type2:res.data[0].attack3Type2,
            attack3Des:res.data[0].attack3Des, attack3Damage: res.data[0].attack3Damage,weak1:res.data[0].weak1, weak1Amount:res.data[0].weak1Amount,weak2:res.data[0].weak2,
            weak2Amount:res.data[0].weak2Amount, resist1:res.data[0].resist1, resist1Amount:res.data[0].resist1Amount, resist2:res.data[0].resist2, resist2Amount:res.data[0].resist2Amount,
            damageT1:"p",damageT2:"p"
            }).then((res)=>{

                axios.put(`http://localhost:8000/api/user/${user._id}`,{field:user.field,stage1s:user.stage1s-add,summons:user.summons-1,discards:user.discards+counter,lifePoints:user.lifePoints-penalty}).then((res)=>{
                    console.log(res.data)
                }).catch((err)=>{console.log(err)})
            console.log(res.data)
            for(let i=0; i<user.hand.length; i++){
                if(res.data.name==user.hand[i]){
                    user.hand.splice(i,1)
                    break;
                }
            }
            user.hand = user.hand.filter((h)=>{return h!=null})
                axios.put(`http://localhost:8000/api/user/${user._id}`,{hand:user.hand}).then((res)=>{
                    console.log(res.data)
            
        }).catch((err)=>{console.log(err)})
            
            
            axios.put(`http://localhost:8000/api/game/${game._id}`,{spot2:res.data._id,shows2:""}).then((res)=>{
                console.log(res.data)
            }).catch((err)=>console.log(err))
        }).catch((err)=>{console.log(err)})

    }).catch((err)=>{console.log(err)})
}

const spot1Handeler=(e)=>{
    e.preventDefault();
    if(game.turnd!="hide"){
        return
    }
    
    if(game.select=="ExtraDraw_sp"|| game.select=="ExtraSummon_sp"||(spot1.name!="p" && game.select.includes("_sp"))){
        spellHandeler(spot1._id,game.select)
        return
    }

    if(user._id!=game.player1 && game.selectT1=="p" ){
        
        return
    }

    if(game.round%2==0 && player1.field<=0 && game.selectDmg!=0){
        axios.put(`http://localhost:8000/api/user/${player1._id}`,{lifePoints: player1.lifePoints-game.selectDmg}).then((res)=>{
            console.log(res.data)
            axios.put(`http://localhost:8000/api/game/${game._id}`,{player1pf:"",selectDmg:0}).then((res)=>{
                window.location.reload(false);
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
    }

    if(game.round%2 ==0 && game.selectT1 !="p" && spot1.name != "p" && player1.field>0){
        var reveal = document.getElementById("s1hp").classList.remove("hide")
        var reveal2 = document.getElementById("s1dmg").classList.remove("hide")
        var reveal3 = document.getElementById("s1t1").classList.remove("hide")
        var reveal4 = document.getElementById("s1t2").classList.remove("hide")
        
        var status= ""
        

        if(game.logMoves==0){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{log1Attacked:spot1._id,log1Dmg:spot1.damage,logMoves:game.logMoves+1}).then((res)=>{}).catch((err)=>{console.log(err)})
        }
        if(game.logMoves==1){
            axios.put(`http://localhost:8000/api/game/${game._id}`,{log2Attacked:spot1._id,log2Dmg:spot1.damage,logMoves:game.logMoves+1}).then((res)=>{}).catch((err)=>{console.log(err)})
        }

        if(spot1.status != "" && spot1.status!="dead"){
            status=spot1.status
        }
        if(user.holder!="" && spot1.status==""){
            status=user.holder
            axios.put(`http://localhost:8000/api/user/${user._id}`,{holder:""}).then((res)=>{}).catch((err)=>{console.log(err)})
        }

        if(spot1.hp2<=0 && spot1.status!="dead"){
            status="dead"
            axios.put(`http://localhost:8000/api/user/${player1._id}`,{field: player1.field-1,lifePoints:player1.lifePoints-100}).then((res)=>{
                console.log(res.data)
                axios.put(`http://localhost:8000/api/game/${game._id}`,{shows1:"hide"}).then((res)=>{
                        console.log(res.data)
                }).catch((err)=>{console.log(err)})
            }).catch((err)=>{console.log(err)})
        }
        axios.put(`http://localhost:8000/api/game/${game._id}`,{selectDmg:"",p1Summon:"", p2Summon:"",selectT1:"p",selectT2:"p"}).then((res)=>{
            axios.put(`http://localhost:8000/api/tempPoke/${spot1._id}`,{hp:spot1.hp2,hp2:0,damage:0,damageT1:"p",damageT2:"p",status:status}).then((res)=>{
                console.log(res.data)
                setTimeout(()=>{ window.location.reload(false);},700)
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
    }
    
    if(game.round%2==0){
        return
    }

    if(game.select=="" && spot1.name !="p"){
        var reveal = document.getElementById("bigCard").classList.remove("hide")
        var reveal2 = document.getElementById("test13").classList.remove("hide")
        var reveal3 = document.getElementById("cancel").classList.remove("hide")
        return
    }

    if(user.summons==0){
        alert("you have 0 summons to use  :(")
        return
    }

    if(game.select.includes("_l")){
        
        if(user.field<2){
            alert("you must tribute 2 pokemon")
            return
        }
        axios.put(`http://localhost:8000/api/game/${game._id}`,{spot2:"",shows2:"hide"}).then((res)=>{
            console.log(res.data)
            axios.delete(`http://localhost:8000/api/tempPoke/${spot2._id}`).then((res)=>{
                console.log(res.data)
                
            }).catch((err)=>{console.log(err)})
        }).catch((err)=>{console.log(err)})
    }
    

   
    var counter= 0;
    var penalty =0;
    var add=0
    if(game.select.includes("_b")){
        user.field= user.field+1
        add=1
        if(spot1.name!="p"){
            axios.delete(`http://localhost:8000/api/tempPoke/${spot1._id}`).then((res)=>{}).catch((err)=>{console.log(err)})
            user.field= user.field-1
            counter=1
            if(user.discards==5){
                alert("you have reach the discard limit any futher will cost 100 lp")
            }
            if (user.discards>=6){
                
                penalty=100
            }
        }
    }



    axios.get(`http://localhost:8000/api/pokemon/${game.select}`).then((res)=>{
        
        if(!(game.select.includes("_b"))){
            if(spot1.name=="p"){
                return
            }
                console.log(game.select)
                if(res.data[0].prev != spot1.name && !(game.select.includes("_l"))){
                    alert("You must tribute "+res.data[0].prev)
                    window.location.reload(false);
                    
                    return
                }
                    
           
                if(game.select.includes("_l")){
                    user.field= user.field-1
                }
        }

        axios.post("http://localhost:8000/api/tempPoke",{
            name:res.data[0].name, type1:res.data[0].type1, type2:res.data[0].type2,hp:res.data[0].hp,prev:res.data[0].prev,
            attack1:res.data[0].attack1,attack1Type1:res.data[0].attack1Type1,attack1Type2:res.data[0].attack1Type2,attack1Des:res.data[0].attack1Des,
            attack1Damage:res.data[0].attack1Damage, attack2:res.data[0].attack2, attack2Type1:res.data[0].attack2Type1,attack2Type2:res.data[0].attack2Type2, attack2Des:res.data[0].attack2Des,
            attack2Damage:res.data[0].attack2Damage,attack3:res.data[0].attack3, attack3Type1:res.data[0].attack3Type1, attack3Type2:res.data[0].attack3Type2,
            attack3Des:res.data[0].attack3Des, attack3Damage: res.data[0].attack3Damage,weak1:res.data[0].weak1, weak1Amount:res.data[0].weak1Amount,weak2:res.data[0].weak2,
            weak2Amount:res.data[0].weak2Amount, resist1:res.data[0].resist1, resist1Amount:res.data[0].resist1Amount, resist2:res.data[0].resist2, resist2Amount:res.data[0].resist2Amount,
            damageT1:"p",damageT2:"p"
            }).then((res)=>{
                axios.put(`http://localhost:8000/api/user/${user._id}`,{field:user.field,stage1s:user.stage1s-add,summons:user.summons-1,discards:user.discards+counter,lifePoints:user.lifePoints-penalty}).then((res)=>{
                    console.log(res.data)
                }).catch((err)=>{console.log(err)})
                console.log(res.data)
            
            for(let i=0; i<user.hand.length; i++){
                if(res.data.name==user.hand[i]){
                    user.hand.splice(i,1)
                    break;
                }
            }
            user.hand = user.hand.filter((h)=>{return h!=null})
                axios.put(`http://localhost:8000/api/user/${user._id}`,{hand:user.hand}).then((res)=>{
                    console.log(res.data)
            
        }).catch((err)=>{console.log(err)})
            
            axios.put(`http://localhost:8000/api/game/${game._id}`,{spot1:res.data._id,shows1:""}).then((res)=>{
                console.log(res.data)
            }).catch((err)=>console.log(err))
        }).catch((err)=>{console.log(err)})

    }).catch((err)=>{console.log(err)})
}

const handSelect=(e,name)=>{
    e.preventDefault()
    if(game.turnd!="hide"){
        return
    }

    if(name.includes("_sp")){
        axios.put(`http://localhost:8000/api/game/${game._id}`,{select:name,p1Summon:"greenb",p2Summon:"greenb"}).then((res)=>{
            console.log(res.data)
            window.location.reload(false);
        }).catch((err)=>{console.log(err)})
    }

    if(user._id==player1._id && game.round%2!=0){
        axios.put(`http://localhost:8000/api/game/${game._id}`,{select:name,p1Summon:"greenb"}).then((res)=>{
            console.log(res.data)
            window.location.reload(false);
        }).catch((err)=>{console.log(err)})
    }

    if(user._id==player2._id && game.round%2==0){
        axios.put(`http://localhost:8000/api/game/${game._id}`,{select:name,p2Summon:"greenb"}).then((res)=>{
            console.log(res.data)
            window.location.reload(false);
        }).catch((err)=>{console.log(err)})
    }
}

const emergency=(e)=>{
    e.preventDefault()
    if(user.tempDeck.length==0){
        return
    }
    if(user.emergency<=0){
        return
    }
    if(user.hand.length>=8){
        alert("delete cards to draw")
        return
    }
    if(user.stage1s<=0){
        alert("You do not have anymore basic stage pokemon")
        return
    }
    if(game.turnd!="hide"){
        return
    }

    for(let i=0; i<user.tempDeck.length; i++){
        if(user.tempDeck[i].includes("_b")){
            user.hand.push(user.tempDeck[i])
            user.tempDeck.splice(i,1)
            break;
        }
    }
    user.tempDeck = user.tempDeck.filter((h)=>{return h!=null})
    axios.put(`http://localhost:8000/api/user/${user._id}`,{hand:user.hand, tempDeck:user.tempDeck,emergency:user.emergency-1}).then((res)=>{
        console.log(res)
        setTimeout(()=>{ window.location.reload(false);},200)
    }).catch((err)=>{console.log(err)})
}

const deleteCard=(e,poke)=>{
    e.preventDefault()
    if(game.turnd!="hide"){
        return
    }

    for(let i=0; i<user.hand.length; i++){
        if(poke==user.hand[i]){
            user.hand.splice(i,1)
            break;
        }
        
    }
    user.hand = user.hand.filter((h)=>{return h!=null})

    if(poke.includes("_b")){
        user.stage1s= user.stage1s-1
    }
   
    axios.put(`http://localhost:8000/api/user/${user._id}`,{stage1s:user.stage1s, hand: user.hand}).then((res)=>{
        console.log(res.data)
      
        setTimeout(()=>{ window.location.reload(false);},200)
    }).catch((err)=>{console.log(err)})
}

const draw=(e)=>{
    e.preventDefault()
    if(user.draws==0){
        return
    }
    if(game.turnd!="hide"){
        return
    }
    
    if(deckLen==0)
        return;
    console.log(user.hand.length)
    if(user.hand.length>=8){
        alert("delete cards to draw")
        return
    }
  
    
    setTimeout(()=>{ 
        var num= getRandom(0, user.tempDeck.length-1)
        var hCheck= user.hand.length
        var d= user.draws
        user.hand.push(user.tempDeck[num])
        user.hand=user.hand.filter((h)=>{return h!=null})
        user.tempDeck.splice(num,1)
        user.tempDeck = user.tempDeck.filter((h)=>{return h!=null})



        axios.put(`http://localhost:8000/api/user/${user._id}`,{tempDeck:user.tempDeck, hand:user.hand, draws:user.draws-1}).then((res)=>{
            console.log(res.data)
            setUser(res.data)
            setHand(res.data.hand)
            if(res.data.hand.length==hCheck){
                alert("try drawing again")
                axios.put(`http://localhost:8000/api/user/${user._id}`,{draws:d}).then((res)=>{window.location.reload(false);}).catch((err)=>console.log(err))
            }
            setDeckLen(res.data.tempDeck.length)
            
            setTimeout(()=>{ window.location.reload(false);},350)
        }).catch((err)=>{console.log(err)})
    },230)
 
}




function createPreview(name,type1,type2,hp,attack1,attack1Type1,attack1Type2,attack1Damage,attack2,attack2Type1,attack2Type2,
    attack2Damage,attack3, attack3Type1,attack3Type2,attack3Damage,weak1,weak1Amount,weak2,weak2Amount,resist1,resist1Amount,
    resist2, resist2Amount
    ){
    //800 300
    var preview 
    if(type1 !="p"){
        preview=    `
    <div id="bye"  class="${type1}bg idk mar">
    <div style="width:400; height: 55;  display:"flex";justify-content:"space-around";align-items:"center";flex-wrap:"wrap";"class="${type1}bg">
        <h6 class="text highlightCard">${name}</h6>
        
            <h6 class="text highlightCard">Hp: ${hp}</h6>
            <img class="cardtype3" src=${require(`../photos/symbols/${type1}.png`)}/>
            <img class="cardtype3" src=${require(`../photos/symbols/${type2}.png`)}/>
        
    </div>
    <div  class="${name} fix ${type1}bg">


    </div> 
    <div class="plz ${type1}bg" >
        <div style="display:"flex";justify-content:"space-around";align-items:"center";">
            <h6 class="text highlightCard">${attack1}  ${attack1Damage}</h6> 
            <img class="cardtype3" src=${require(`../photos/symbols/${attack1Type1}.png`)}/> 
            <img style="margin-right: 100;" class="cardtype3" src=${require(`../photos/symbols/${attack1Type2}.png`)}/>
        </div>
        <div style="display:"flex";justify-content:"space-around"; align-items:"center";" >
            <h6 class="text highlightCard">${attack2}  ${attack2Damage}</h6> 
            <img class="cardtype3" src=${require(`../photos/symbols/${attack2Type1}.png`)}/> 
            <img style="margin-right: 100;" class="cardtype3" src=${require(`../photos/symbols/${attack2Type2}.png`)}/>
        </div>
        <div style="display:"flex";justify-content:"space-around"; alignItems:"center";" >
            <h6 class="text highlightCard">${attack3}  ${attack3Damage}</h6> 
            <img class="cardtype3" src=${require(`../photos/symbols/${attack3Type1}.png`)}/> 
            <img style="margin-right: 100;" class="cardtype3" src=${require(`../photos/symbols/${attack3Type2}.png`)}/>
        </div>

        </div>
    
    <div style="width:400;height:55;  display:"flex"; justify-content:"space-around";align-items:"center"; flex-wrap:"wrap"; class="${type1}bg"">
        <h8 class="text highlightCard">Weakness:</h8>
        <img class="cardtype3" src=${require(`../photos/symbols/${weak1}.png`)}/>
        <h8 class="text highlightCard" >x${weak1Amount}</h8>
        <img class="cardtype3" src=${require(`../photos/symbols/${weak2}.png`)}/>
        <h8 class="text highlightCard">x${weak2Amount}</h7>
        <h7 class="text highlightCard">Resist:</h8>
        <img class="cardtype3" src=${require(`../photos/symbols/${resist1}.png`)}/>
        <h8 class="text highlightCard">-${resist1Amount}</h8>
        <img class="cardtype3" src=${require(`../photos/symbols/${resist2}.png`)}/>
        <h8 class="text highlightCard">-${resist2Amount}</h8>
        
    </div>
     <p> *Refresh Page If Stuck </p>
</div>
    
    `
    }

    if(type1=="p"){
        preview= `
        <div id="bye"  class="${type1}bg idk">
        <div style="width:400; height: 55;  display:"flex";justify-content:"space-around";align-items:"center";flex-wrap:"wrap";"class="${type1}bg">
            <h6 class="text highlightCard">${name}</h6>
            
                
               
            
        </div>
        <div  class="${name} fix ${type1}bg">
    
    
        </div> 
        <div class="plz ${type1}bg" >
            <div style="display:"flex";justify-content:"space-around";align-items:"center";">
                <h6 class="text highlightCard">${attack1}  ${attack1Damage}</h6> 
                
            </div>
            <div style="display:"flex";justify-content:"space-around"; align-items:"center";" >
                
            </div>
            <div style="display:"flex";justify-content:"space-around"; alignItems:"center";" >
                
            </div>
    
            </div>
        
        <div style="width:400;height:55;  display:"flex"; justify-content:"space-around";align-items:"center"; flex-wrap:"wrap"; class="${type1}bg"">
           
            
        </div>
         <p> *Refresh Page If Stuck </p>
    </div>
        
        `
    }
    


    return preview
        }

        const onHoverHandlerf=(e,poke)=>{  //preview maker
            e.preventDefault()
                
            if(poke!=undefined){
                
            

            axios.get(`http://localhost:8000/api/tempPoke/${poke}`).then((res)=>{
                
                console.log()
            var newPreview = document.getElementById("previewId");
            
            newPreview.innerHTML=createPreview(res.data.name,res.data.type1,res.data.type2,res.data.hp,res.data.attack1,res.data.attack1Type1,
                res.data.attack1Type2, res.data.attack1Damage,res.data.attack2, res.data.attack2Type1,res.data.attack2Type2,res.data.attack2Damage,
                res.data.attack3, res.data.attack3Type1, res.data.attack3Type2, res.data.attack3Damage, res.data.weak1,res.data.weak1Amount,res.data.weak2,
                res.data.weak2Amount,res.data.resist1, res.data.resist1Amount, res.data.resist2, res.data.resist2Amount
                )+newPreview.innerHTML;
            }).catch((err)=>{console.log(err)})
           /* setTimeout(()=>{var newPreview= document.getElementById("bye").remove();},7500)*/
            }

                
        }
        const mouseLeavef=(e,poke)=>{
            e.preventDefault()
            setTimeout(()=>{
                if(poke!=undefined){
                    var newPreview= document.getElementById("bye").remove();
                    }
            },300)
            /*if(poke!=undefined){
            var newPreview= document.getElementById("bye").remove();
            }*/
        }

        const onHoverHandlerh=(e,poke,index)=>{  //preview maker
            e.preventDefault()
            
            var handy= document.getElementById(poke+index);
            var close = document.getElementById("close"+index).classList.remove("hide")
            handy.classList.remove("text")
            handy.classList.add("text2")

            axios.get(`http://localhost:8000/api/pokemon/${poke}`).then((res)=>{
                
            var newPreview = document.getElementById("previewId");
            
            newPreview.innerHTML=createPreview(res.data[0].name,res.data[0].type1,res.data[0].type2,res.data[0].hp,res.data[0].attack1,res.data[0].attack1Type1,
                res.data[0].attack1Type2, res.data[0].attack1Damage,res.data[0].attack2, res.data[0].attack2Type1,res.data[0].attack2Type2,res.data[0].attack2Damage,
                res.data[0].attack3, res.data[0].attack3Type1, res.data[0].attack3Type2, res.data[0].attack3Damage, res.data[0].weak1,res.data[0].weak1Amount,res.data[0].weak2,
                res.data[0].weak2Amount,res.data[0].resist1, res.data[0].resist1Amount, res.data[0].resist2, res.data[0].resist2Amount
                )+newPreview.innerHTML;
            }).catch((err)=>{console.log(err)})
            /*    setTimeout(()=>{var newPreview= document.getElementById("bye").remove();},7500)*/
        }
        const mouseLeaveh=(e,poke,index)=>{
            e.preventDefault()
            setTimeout(()=>{
                var handy= document.getElementById(poke+index);
            var close = document.getElementById("close"+index).classList.add("hide")
            handy.classList.remove("text2")
            handy.classList.add("text")
             var newPreview= document.getElementById("bye").remove();
        },300)
            
        }




        const cancelHandler=(e)=>{      //cancel
            e.preventDefault()
            window.location.reload(false);
            
        }   

        const whitebggive=(e,att,card)=>{
            e.preventDefault()
            var move= document.getElementById(att);
            move.classList.remove("highlightCard")
            move.classList.remove("text")
            move.classList.add("whitebg")
            move.classList.add("text2")
            
        }

        const whitebgtake=(e,att)=>{
            e.preventDefault()
            var move= document.getElementById(att)
            move.classList.remove("whitebg")
            move.classList.remove("text2")
            move.classList.add("highlightCard")
            move.classList.add("text")
            
        }

        function randomAlert(){
            alert("works fine")
        }

        const turnsHandler=(e)=>{
            e.preventDefault();
            if(game.round%2 !=0 && user._id != player1._id){
                return
            }
            if(game.round%2 ==0 && user._id != player2._id){
                return
            }

            if(game.logMoves==2){
                if(game.log2Attacker=="spot1" || game.log2Attacker=="spot3"){
                    axios.put(`http://localhost:8000/api/game/${game._id}`,{showo13:"",showBig:""}).then((res)=>{
                        console.log(res.data)
                        alert("Attack Log (click card to continue)")
                        axios.put(`http://localhost:8000/api/tempPoke/${game.log2Attacked}`,{damage:game.log2Dmg,damageT1:game.log2T1,damageT2:game.log2T2}).then((res)=>{
                            console.log(res.data)
                        
                        }).catch((err)=>(console.log(err)))
  
                    }).catch((err)=>{console.log(err)})
                    
                }
                if(game.log2Attacker=="spot2" || game.log2Attacker=="spot4"){
                    axios.put(`http://localhost:8000/api/game/${game._id}`,{showo24:"",showBig:""}).then((res)=>{
                        console.log(res.data)
                        alert("Attack Log (click card to continue)")
                        axios.put(`http://localhost:8000/api/tempPoke/${game.log2Attacked}`,{damage:game.log2Dmg,damageT1:game.log2T1,damageT2:game.log2T2}).then((res)=>{
                            console.log(res.data)
                        }).catch((err)=>(console.log(err)))

                    }).catch((err)=>{console.log(err)})
                }
            }

            if(game.logMoves==1){
                if(game.log1Attacker=="spot1" || game.log1Attacker=="spot3"){
                    axios.put(`http://localhost:8000/api/game/${game._id}`,{showo13:"",showBig:""}).then((res)=>{
                        console.log(res.data)
                        alert("Attack Log (click card to continue)")
                        axios.put(`http://localhost:8000/api/tempPoke/${game.log1Attacked}`,{damage:game.log1Dmg,damageT1:game.log1T1,damageT2:game.log1T2}).then((res)=>{
                            console.log(res.data)
                        }).catch((err)=>(console.log(err)))

                    }).catch((err)=>{console.log(err)})
                }
                if(game.log1Attacker=="spot2" || game.log1Attacker=="spot4"){
                    axios.put(`http://localhost:8000/api/game/${game._id}`,{showo24:"",showBig:""}).then((res)=>{
                        console.log(res.data)
                        alert("Attack Log (click card to continue)")
                        axios.put(`http://localhost:8000/api/tempPoke/${game.log1Attacked}`,{damage:game.log1Dmg,damageT1:game.log1T1,damageT2:game.log1T2}).then((res)=>{
                            console.log(res.data)
                        }).catch((err)=>(console.log(err)))
  
                    }).catch((err)=>{console.log(err)})
                }
            }

            axios.put(`http://localhost:8000/api/game/${game._id}`,{turnd:"hide"}).then((res)=>{
                console.log(res.data)
                window.location.reload(false);
            }).catch((err)=>{console.log(err)})
        }

        const opponentHandeler=(e)=>{
            e.preventDefault();

            if(game.logMoves==2){
                if(game.log2Attacker=="spot1" || game.log2Attacker=="spot3"){
                    var hide= document.getElementById("bigCard2").classList.add("hide")

                    if(game.log2Attacked==spot1._id){
                        var reveal2 = document.getElementById("s1dmg").classList.remove("hide")
                        var reveal3 = document.getElementById("s1t1").classList.remove("hide")
                        var reveal4 = document.getElementById("s1t2").classList.remove("hide")

                    }

                    if(game.log2Attacked==spot2._id){
                        var reveal2 = document.getElementById("s2dmg").classList.remove("hide")
                        var reveal3 = document.getElementById("s2t1").classList.remove("hide")
                        var reveal4 = document.getElementById("s2t2").classList.remove("hide")

                        
                    }

                    if(game.log2Attacked==spot3._id){
                        var reveal2 = document.getElementById("s3dmg").classList.remove("hide")
                        var reveal3 = document.getElementById("s3t1").classList.remove("hide")
                        var reveal4 = document.getElementById("s3t2").classList.remove("hide")

                    }

                    if(game.log2Attacked==spot4._id){
                        var reveal2 = document.getElementById("s4dmg").classList.remove("hide")
                        var reveal3 = document.getElementById("s4t1").classList.remove("hide")
                        var reveal4 = document.getElementById("s4t2").classList.remove("hide")
                        if(spot4.hp<=0){
                            axios.delete(`http://localhost:8000/api/tempPoke/${spot4._id}`).then((res)=>{
                            setSpot4({ name:"p",
                            damageT1:"p",
                            damageT2:"p"
                            })
                        }).catch((err)=>{console.log(err)})
                        }
                    }
                    if(spot4.hp<=0){
                        axios.delete(`http://localhost:8000/api/tempPoke/${spot4._id}`).then((res)=>{
                        setSpot4({ name:"p",
                        damageT1:"p",
                        damageT2:"p"
                        })
                        axios.put(`http://localhost:8000/api/game/${game._id}`,{spot4:""}).then((res)=>{}).catch((err)=>{})
                    }).catch((err)=>{console.log(err)})
                    }
                    if(spot3.hp<=0){
                        axios.delete(`http://localhost:8000/api/tempPoke/${spot3._id}`).then((res)=>{
                        setSpot3({ name:"p",
                        damageT1:"p",
                        damageT2:"p"
                        })
                        axios.put(`http://localhost:8000/api/game/${game._id}`,{spot3:""}).then((res)=>{}).catch((err)=>{})
                    }).catch((err)=>{console.log(err)})
                    }
                    if(spot2.hp<=0){
                        axios.delete(`http://localhost:8000/api/tempPoke/${spot2._id}`).then((res)=>{
                        setSpot2({ name:"p",
                        damageT1:"p",
                        damageT2:"p"
                        })
                        axios.put(`http://localhost:8000/api/game/${game._id}`,{spot2:""}).then((res)=>{}).catch((err)=>{})
                    }).catch((err)=>{console.log(err)})
                    }
                    if(spot1.hp<=0){
                        axios.delete(`http://localhost:8000/api/tempPoke/${spot1._id}`).then((res)=>{
                        setSpot1({ name:"p",
                        damageT1:"p",
                        damageT2:"p"
                        })
                        axios.put(`http://localhost:8000/api/game/${game._id}`,{spot1:""}).then((res)=>{}).catch((err)=>{})
                    }).catch((err)=>{console.log(err)})
                    }
                    axios.put(`http://localhost:8000/api/tempPoke/${game.log1Attacked}`,{damage:game.log1Dmg,damageT1:game.log1T1,damageT2:game.log1T2}).then((res)=>{
                        console.log(res.data)
                    }).catch((err)=>(console.log(err)))
                    axios.put(`http://localhost:8000/api/game/${game._id}`,{logMoves: game.logMoves-1,showo13:"hide",showo24:""}).then((res)=>{
                            console.log(res.data)
                            setTimeout(()=>{ window.location.reload(false);},700)
                        }).catch((err)=>console.log(err))
                }

                if(game.log2Attacker=="spot2" || game.log2Attacker=="spot4"){
                    var hide= document.getElementById("bigCard2").classList.add("hide")

                    if(game.log2Attacked==spot1._id){
                        var reveal2 = document.getElementById("s1dmg").classList.remove("hide")
                        var reveal3 = document.getElementById("s1t1").classList.remove("hide")
                        var reveal4 = document.getElementById("s1t2").classList.remove("hide")
  
                    }

                    if(game.log2Attacked==spot2._id){
                        var reveal2 = document.getElementById("s2dmg").classList.remove("hide")
                        var reveal3 = document.getElementById("s2t1").classList.remove("hide")
                        var reveal4 = document.getElementById("s2t2").classList.remove("hide")
       
                    }

                    if(game.log2Attacked==spot3._id){
                        var reveal2 = document.getElementById("s3dmg").classList.remove("hide")
                        var reveal3 = document.getElementById("s3t1").classList.remove("hide")
                        var reveal4 = document.getElementById("s3t2").classList.remove("hide")
     
                    }

                    if(game.log2Attacked==spot4._id){
                        var reveal2 = document.getElementById("s4dmg").classList.remove("hide")
                        var reveal3 = document.getElementById("s4t1").classList.remove("hide")
                        var reveal4 = document.getElementById("s4t2").classList.remove("hide")

                    }
                    if(spot4.hp<=0){
                        axios.delete(`http://localhost:8000/api/tempPoke/${spot4._id}`).then((res)=>{
                        setSpot4({ name:"p",
                        damageT1:"p",
                        damageT2:"p"
                        })
                        axios.put(`http://localhost:8000/api/game/${game._id}`,{spot4:""}).then((res)=>{}).catch((err)=>{})
                    }).catch((err)=>{console.log(err)})
                    }
                    if(spot3.hp<=0){
                        axios.delete(`http://localhost:8000/api/tempPoke/${spot3._id}`).then((res)=>{
                        setSpot3({ name:"p",
                        damageT1:"p",
                        damageT2:"p"
                        })
                        axios.put(`http://localhost:8000/api/game/${game._id}`,{spot3:""}).then((res)=>{}).catch((err)=>{})
                    }).catch((err)=>{console.log(err)})
                    }
                    if(spot2.hp<=0){
                        axios.delete(`http://localhost:8000/api/tempPoke/${spot2._id}`).then((res)=>{
                        setSpot2({ name:"p",
                        damageT1:"p",
                        damageT2:"p"
                        })
                        axios.put(`http://localhost:8000/api/game/${game._id}`,{spot2:""}).then((res)=>{}).catch((err)=>{})
                    }).catch((err)=>{console.log(err)})
                    }
                    if(spot1.hp<=0){
                        axios.delete(`http://localhost:8000/api/tempPoke/${spot1._id}`).then((res)=>{
                        setSpot1({ name:"p",
                        damageT1:"p",
                        damageT2:"p"
                        })
                        axios.put(`http://localhost:8000/api/game/${game._id}`,{spot1:""}).then((res)=>{}).catch((err)=>{})
                    }).catch((err)=>{console.log(err)})
                    }
                    axios.put(`http://localhost:8000/api/tempPoke/${game.log1Attacked}`,{damage:game.log1Dmg,damageT1:game.log1T1,damageT2:game.log1T2}).then((res)=>{
                        console.log(res.data)
                    }).catch((err)=>(console.log(err)))
                    axios.put(`http://localhost:8000/api/game/${game._id}`,{logMoves: game.logMoves-1,showo13:"",showo24:"hide"}).then((res)=>{
                            console.log(res.data)
                            setTimeout(()=>{ window.location.reload(false);},700)
                        }).catch((err)=>console.log(err))
                }
            }

            if(game.logMoves==1){
                if(game.log1Attacker=="spot1" || game.log1Attacker=="spot3"){
                    var hide= document.getElementById("bigCard2").classList.add("hide")

                    if(game.log1Attacked==spot1._id){
                        var reveal2 = document.getElementById("s1dmg").classList.remove("hide")
                        var reveal3 = document.getElementById("s1t1").classList.remove("hide")
                        var reveal4 = document.getElementById("s1t2").classList.remove("hide")

                    }

                    if(game.log1Attacked==spot2._id){
                        var reveal2 = document.getElementById("s2dmg").classList.remove("hide")
                        var reveal3 = document.getElementById("s2t1").classList.remove("hide")
                        var reveal4 = document.getElementById("s2t2").classList.remove("hide")
 
                    }

                    if(game.log1Attacked==spot3._id){
                        var reveal2 = document.getElementById("s3dmg").classList.remove("hide")
                        var reveal3 = document.getElementById("s3t1").classList.remove("hide")
                        var reveal4 = document.getElementById("s3t2").classList.remove("hide")

                    }

                    if(game.log1Attacked==spot4._id){
                        var reveal2 = document.getElementById("s4dmg").classList.remove("hide")
                        var reveal3 = document.getElementById("s4t1").classList.remove("hide")
                        var reveal4 = document.getElementById("s4t2").classList.remove("hide")
    
                    }
                    if(spot4.hp<=0){
                        axios.delete(`http://localhost:8000/api/tempPoke/${spot4._id}`).then((res)=>{
                        setSpot4({ name:"p",
                        damageT1:"p",
                        damageT2:"p"
                        })
                        axios.put(`http://localhost:8000/api/game/${game._id}`,{spot4:""}).then((res)=>{}).catch((err)=>{})
                    }).catch((err)=>{console.log(err)})
                    }
                    if(spot3.hp<=0){
                        axios.delete(`http://localhost:8000/api/tempPoke/${spot3._id}`).then((res)=>{
                        setSpot3({ name:"p",
                        damageT1:"p",
                        damageT2:"p"
                        })
                        axios.put(`http://localhost:8000/api/game/${game._id}`,{spot3:""}).then((res)=>{}).catch((err)=>{})
                    }).catch((err)=>{console.log(err)})
                    }
                    if(spot2.hp<=0){
                        axios.delete(`http://localhost:8000/api/tempPoke/${spot2._id}`).then((res)=>{
                        setSpot2({ name:"p",
                        damageT1:"p",
                        damageT2:"p"
                        })
                        axios.put(`http://localhost:8000/api/game/${game._id}`,{spot2:""}).then((res)=>{}).catch((err)=>{})
                    }).catch((err)=>{console.log(err)})
                    }
                    if(spot1.hp<=0){
                        axios.delete(`http://localhost:8000/api/tempPoke/${spot1._id}`).then((res)=>{
                        setSpot1({ name:"p",
                        damageT1:"p",
                        damageT2:"p"
                        })
                        axios.put(`http://localhost:8000/api/game/${game._id}`,{spot1:""}).then((res)=>{}).catch((err)=>{})
                    }).catch((err)=>{console.log(err)})
                    }

                    axios.put(`http://localhost:8000/api/game/${game._id}`,{logMoves: game.logMoves-1,showo13:"hide",showBig:"hide"}).then((res)=>{
                            console.log(res.data)
                            setTimeout(()=>{ window.location.reload(false);},700)
                        }).catch((err)=>console.log(err))
                }

                if(game.log1Attacker=="spot2" || game.log1Attacker=="spot4"){
                    var hide= document.getElementById("test24o").classList.add("hide")
                    if(game.log1Attacked==spot1._id){
                        var reveal2 = document.getElementById("s1dmg").classList.remove("hide")
                        var reveal3 = document.getElementById("s1t1").classList.remove("hide")
                        var reveal4 = document.getElementById("s1t2").classList.remove("hide")
 
                    }

                    if(game.log1Attacked==spot2._id){
                        var reveal2 = document.getElementById("s2dmg").classList.remove("hide")
                        var reveal3 = document.getElementById("s2t1").classList.remove("hide")
                        var reveal4 = document.getElementById("s2t2").classList.remove("hide")
    
                    }

                    if(game.log1Attacked==spot3._id){
                        var reveal2 = document.getElementById("s3dmg").classList.remove("hide")
                        var reveal3 = document.getElementById("s3t1").classList.remove("hide")
                        var reveal4 = document.getElementById("s3t2").classList.remove("hide")
     
                    }

                    if(game.log1Attacked==spot4._id){
                        var reveal2 = document.getElementById("s4dmg").classList.remove("hide")
                        var reveal3 = document.getElementById("s4t1").classList.remove("hide")
                        var reveal4 = document.getElementById("s4t2").classList.remove("hide")
            
                    }
                    if(spot4.hp<=0){
                        axios.delete(`http://localhost:8000/api/tempPoke/${spot4._id}`).then((res)=>{
                        setSpot4({ name:"p",
                        damageT1:"p",
                        damageT2:"p"
                        })
                        axios.put(`http://localhost:8000/api/game/${game._id}`,{spot4:""}).then((res)=>{}).catch((err)=>{})
                    }).catch((err)=>{console.log(err)})
                    }
                    if(spot3.hp<=0){
                        axios.delete(`http://localhost:8000/api/tempPoke/${spot3._id}`).then((res)=>{
                        setSpot3({ name:"p",
                        damageT1:"p",
                        damageT2:"p"
                        })
                        axios.put(`http://localhost:8000/api/game/${game._id}`,{spot3:""}).then((res)=>{}).catch((err)=>{})
                    }).catch((err)=>{console.log(err)})
                    }
                    if(spot2.hp<=0){
                        axios.delete(`http://localhost:8000/api/tempPoke/${spot2._id}`).then((res)=>{
                        setSpot2({ name:"p",
                        damageT1:"p",
                        damageT2:"p"
                        })
                        axios.put(`http://localhost:8000/api/game/${game._id}`,{spot2:""}).then((res)=>{}).catch((err)=>{})
                    }).catch((err)=>{console.log(err)})
                    }
                    if(spot1.hp<=0){
                        axios.delete(`http://localhost:8000/api/tempPoke/${spot1._id}`).then((res)=>{
                        setSpot1({ name:"p",
                        damageT1:"p",
                        damageT2:"p"
                        })
                        axios.put(`http://localhost:8000/api/game/${game._id}`,{spot1:""}).then((res)=>{}).catch((err)=>{})
                    }).catch((err)=>{console.log(err)})
                    }
                    axios.put(`http://localhost:8000/api/game/${game._id}`,{logMoves: game.logMoves-1,showo24:"hide",showBig:"hide"}).then((res)=>{
                            console.log(res.data)
                            setTimeout(()=>{ window.location.reload(false);},700)
                        }).catch((err)=>console.log(err))
                }
            }
        }

        const surrenderHandeler=(e)=>{
            e.preventDefault();
            if(game.turnd!="hide"){
                return
            }

            if(game.round%2 !=0 && user._id != player1._id){
                return
            }

            if(game.round%2 ==0 && user._id != player2._id){
                return
            }
            var reveal2 = document.getElementById("surr").classList.remove("hide")
        }

        const yesButton=(e)=>{
            e.preventDefault()
            var person = (id!=user._id)?id:id2
            axios.put(`http://localhost:8000/api/user/${id}`,{winner:person,loser:user._id,reason:"Player has surrendered"}).then((res)=>{
                
                axios.put(`http://localhost:8000/api/user/${id2}`,{winner:person,loser:user._id,reason:"Player has surrendered"}).then((res)=>{
                    navi(`/win/${res.data.game}`)
                }).catch((err)=>{console.log(err)})
            }).catch((err)=>{console.log(err)})
        }


    return(//start of jsx
        <div >
            <div onClick={(e)=>{selectClear(e)}} className="main" style={{backgroundColor:"darkslategrey",width:1800, height:960, borderStyle:"double", borderColor:"black"}}> 
                <img className="icon" src={require("../photos/symbols/poke.png")}/>
                <div onClick={(e)=>{direct2(e)}} className={game.player2pf} id="player2" onMouseEnter={(e)=>{
                    e.preventDefault()
                     var player= document.getElementById("player2").classList.add("bordergiver")
                }} onMouseLeave={(e)=>{
                    e.preventDefault()
                    var player= document.getElementById("player2").classList.remove("bordergiver")
                }} style={{display:"flex",flexWrap:"wrap",backgroundColor:"darkslategrey",width:300,height:330,position:"relative",left:1490, top: 25}}>{/* player 2 pic*/}
                <img className="fit" src={require(`../photos/pictures/${player2.profilePic}`)}/>
                    <div style={{display:"flex", position:"relative", left:40}}>
                    <p className="text"><span style={{color:"gold"}}>{player2.username}:</span>  {player2.lifePoints}</p><p className="text hide">-100</p>
                    </div>
                </div>
                <div style={{backgroundColor:"darkslategrey",width:600,height:250,position:"relative",left:860,bottom:230, display:"flex"}}>
                <div className={game.p2Summon} id="spot3" onMouseLeave={(e)=>{ mouseLeavef(e,spot3._id)
                    var spot= document.getElementById("spot3").classList.remove("bordergiver");
            }} onMouseEnter={(e)=>{ onHoverHandlerf(e,spot3._id)
                    var spot= document.getElementById("spot3").classList.add("bordergiver");
                }} onClick={(e)=>{spot3Handeler(e)}} style={{backgroundColor:"darkslategrey",width:300, height:250}}>  {/* player 2 poke1*/}
                        {game.round>0?
                            <img className={game.shows3} src={require(`../photos/gifs/${spot3.name}.gif`)}/>:
                            <p></p>
                        }
                        
                        <div style={{display:"flex", flexWrap:"wrap",position:"relative", left:100}}> <p id="s3hp" className="text hide">{spot3.hp2+spot3.damage}</p><p id="s3dmg" className={`${spot3.damageT1} hide`}>-{spot3.damage}</p>  <img id="s3t1" className="shrink hide " src={require(`../photos/symbols/${spot3.damageT1}.png`)}/><img id="s3t2" className="shrink hide" src={require(`../photos/symbols/${spot3.damageT2}.png`)}/><p id="s3heal" className="text hide" style={{color:"yellowgreen"}}>{spot3.heal}</p> <p style={{flexBasis:175}} className="text">{spot3.status}</p></div>
                    </div> 
                    <div className={game.p2Summon} id="spot4" onMouseLeave={(e)=>{ mouseLeavef(e,spot4._id)
                        var spot= document.getElementById("spot4").classList.remove("bordergiver");
                    }} onMouseEnter={(e)=>{  onHoverHandlerf(e,spot4._id)
                        var spot= document.getElementById("spot4").classList.add("bordergiver");
                    }} onClick={(e)=>{spot4Handeler(e)}} style={{backgroundColor:"darkslategrey",width:300, height:250}}>    {/* player 2 poke2*/}
                        {game.round>0?
                        <img className={game.shows4} src={require(`../photos/gifs/${spot4.name}.gif`)}/>:
                        <p></p>
                    }
                        <div style={{display:"flex", flexWrap:"wrap",position:"relative", left:100}}> <p id="s4hp" className="text hide ">{spot4.hp2+spot4.damage}</p><p id="s4dmg" className={`${spot4.damageT1} hide`}>-{spot4.damage}</p>  <img id="s4t1" className="shrink hide" src={require(`../photos/symbols/${spot4.damageT1}.png`)}/><img id="s4t2" className="shrink hide" src={require(`../photos/symbols/${spot4.damageT2}.png`)}/><p id="s4heal" className="text hide" style={{color:"yellowgreen"}}>{spot4.heal}</p> <p style={{flexBasis:175}} className="text ">{spot4.status}</p></div>
                    </div>
                </div>
                
                <div style={{backgroundColor:"darkslategrey",width:600,height:250,position:"relative", left:340,top:30,display:"flex"}}>
                    <div className={game.p1Summon} id="spot1" onMouseLeave={(e)=>{ mouseLeavef(e,spot1._id)
                        var spot= document.getElementById("spot1").classList.remove("bordergiver");
                    }} onMouseEnter={(e)=>{  onHoverHandlerf(e,spot1._id)
                        var spot= document.getElementById("spot1").classList.add("bordergiver");
                    }} onClick={(e)=>{spot1Handeler(e)}} style={{backgroundColor:"darkslategrey",width:300, height:250}}>  {/* player 1 poke1*/}
                    {game.round>0?
                    <img className={`flip ${game.shows1}`}src={require(`../photos/gifs/${spot1.name}.gif`)}/>:
                    <p></p>
                }
                        
                        <div  style={{display:"flex", flexWrap:"wrap",position:"relative", left:100}}> <p id="s1hp" className="text hide">{spot1.hp2+spot1.damage}</p><p id="s1dmg" className={`${spot1.damageT1} hide`}>-{spot1.damage}</p>  <img id="s1t1" className="shrink hide" src={require(`../photos/symbols/${spot1.damageT1}.png`)}/><img id="s1t2" className="shrink hide" src={require(`../photos/symbols/${spot1.damageT2}.png`)}/><p id="s1heal" className="text hide" style={{color:"yellowgreen"}}>{spot1.heal}</p> <p style={{flexBasis:175}} className="text ">{spot1.status}</p></div>
                    </div> 
                    <div className={game.p1Summon} id="spot2" onMouseLeave={(e)=>{ mouseLeavef(e,spot2._id)
                        var spot= document.getElementById("spot2").classList.remove("bordergiver");
                    }} onMouseEnter={(e)=>{ onHoverHandlerf(e,spot2._id)
                        var spot= document.getElementById("spot2").classList.add("bordergiver");
                    }} onClick={(e)=>{spot2Handeler(e)}} style={{backgroundColor:"darkslategrey",width:300, height:250}}>    {/* player 1 poke2*/}
                        {game.round>0?
                        <img className={`flip ${game.shows2}`} src={require(`../photos/gifs/${spot2.name}.gif`)}/>:
                        <p></p>
                    }
                        
                        <div style={{display:"flex", flexWrap:"wrap",position:"relative", left:100}}> <p id="s2hp" className="text hide">{spot2.hp2+spot2.damage}</p><p id="s2dmg" className={`${spot2.damageT1} hide`}>-{spot2.damage}</p>  <img id="s2t1" className="shrink hide" src={require(`../photos/symbols/${spot2.damageT1}.png`)}/><img id="s2t2" className="shrink hide" src={require(`../photos/symbols/${spot2.damageT2}.png`)}/><p id="s2heal" className="text hide" style={{color:"yellowgreen"}}>{spot2.heal}</p> <p style={{flexBasis:175}} className="text">{spot2.status}</p></div>
                    </div>
                    
                </div>
                
                <div onClick={(e)=>{direct1(e)}} className={game.player1pf} id="player1" onMouseEnter={(e)=>{
                    var player= document.getElementById("player1").classList.add("bordergiver")
                }} onMouseLeave={(e)=>{
                    var player= document.getElementById("player1").classList.remove("bordergiver")
                }} style={{display:"flex",flexWrap:"wrap",backgroundColor:"darkslategrey",width:300,height:330,position:"relative", top:-208, bottom:100, left:10}}>{/* player 1 pic*/}
                <img className="fit" src={require(`../photos/pictures/${player1.profilePic}`)}/>
                    
                     
                    <div style={{display:"flex", position:"relative", left:40 }}>
                       
                        <p className="text"><span style={{color:"gold"}}>{player1.username}:</span>  {player1.lifePoints}</p><p className="text hide">-100</p>
                    </div>
                    
                </div>
                <div style={{position:"fixed", bottom:870,left:500}}>
                    <h4>Last Spell Used</h4>
                    <p><b>{player1.username}:<span style={{color:"white"}}> {player1.lastUsed}</span></b>                                 <b>{player2.username}:<span style={{color:"white"}}> {player2.lastUsed}</span></b>   </p>
                </div>

                <table className="hand">
                    <tr>
                        <th style={{color:"gold"}} className="text">Hand</th> {/* hand */}
                    </tr>
                    {
                        hand.map((hand,index)=>{return(
                    <tr   >
                        <td style={{display:"flex"}} id={hand+index} className="text"   onMouseLeave={(e)=>{mouseLeaveh(e,hand,index)}} onMouseEnter={(e)=>{onHoverHandlerh(e,hand,index)}}>
                            <p onClick={(e)=>{handSelect(e,hand)}}>{hand}</p> <button style={{position: "relative", left: 20,width:10, height:10}} id={`close${index}`}  type="button" class="btn-close hide" aria-label="Close" onClick={(e)=>{deleteCard(e,hand)}}></button>
                            </td>
                    </tr>)})}
                </table>
                <button style={{marginTop:5,marginLeft:5}} onClick={(e)=>{endHandeler(e)}} type="button" className="btn btn-outline-primary end">End Turn </button>
                <div style={{display:"flex"}} className="draws"> 
                <button onClick={(e)=>{draw(e)}} className="btn btn-outline-dark">Draw +{user.draws}({deckLen})</button>
                <button style={{marginRight:3, marginLeft:3}} onClick={(e)=>{emergency(e)}} className="btn btn-outline-danger">Emergency Draw +{user.emergency}</button>
                <button onClick={(e)=>{surrenderHandeler(e)}} className="btn btn-outline-warning" >Surrender</button>
                </div>

                <div id="previewId"  className="preview idk flexy" >
                
                </div>
                {game.round>0?
                <div id="turnd" className={game.turnd} style={{height:175,width:400, backgroundColor:"white"}}>
                    <div style={{height:25,width:400,backgroundColor:"black"}}></div>
                    {(game.round%2==0)?
                    <h2>{player2.username}'s turn</h2>:
                    <h2>{player1.username}'s turn</h2>
                }
                    <button onClick={(e)=>{turnsHandler(e)}} className="btn btn-dark">OK</button>
                </div>:
                <p></p>}
                <div id="surr" className="hide"  style={{height:175,width:300, backgroundColor:"white"}}>
                    <div style={{height:25,width:300,backgroundColor:"black"}}></div>
                    <h3>Are you sure?</h3>
                    <button className="btn btn-danger" onClick={(e)=>{yesButton(e)}}>yes</button><button className="btn btn-dark" onClick={(e)=>{
                        e.preventDefault();
                        window.location.reload(false);
                    }}>no</button>
                </div>

                <div id="bigCard"  style={{height:960, width:2000}} className="cardHolder hide ">
                <div id="test13" style={{height:900, width:600}} className={`${test13.type1}bg hide`}> {/*------------------------------------------------------------------------------------------------big card */}
                        <div style={{width:600, height: 75,  display:"flex",justifyContent:"space-around", alignItems:"center", flexWrap:"wrap"}} className={`${test13.type1}bg`}>
                            <h2 className="text highlightCard">{test13.name}</h2>
                            
                                <h2 className="text highlightCard">Hp: {test13.hp}</h2>
                                <img className="cardtype" src={require(`../photos/symbols/${test13.type1}.png`)}/>
                                <img className="cardtype" src={require(`../photos/symbols/${test13.type2}.png`)}/>
                            
                        </div>
                        <div style={{width:550, height:750}} className={`${test13.name} ${test13.type1}bg`}>
                            <div style={{position: "relative", top: 450}}>
                            <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}}>
                                <h3 id="attack113" onClick={(e)=>{attack113(e)}} onMouseLeave={(e)=>{whitebgtake(e,"attack113")}} onMouseEnter={(e)=>{whitebggive(e,"attack113","test13")}} className="text highlightCard">{test13.attack1}  {test13.attack1Damage}</h3> 
                                <img className="cardtype3" src={require(`../photos/symbols/${test13.attack1Type1}.png`)}/> 
                                <img style={{marginRight: 100}} className="cardtype3" src={require(`../photos/symbols/${test13.attack1Type2}.png`)}/>
                            </div>
                            <p className="text outline"> {test13.attack1Des} </p>
                            <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}} >
                                <h3 id="attack213" onClick={(e)=>{attack213(e)}} onMouseLeave={(e)=>{whitebgtake(e,"attack213")}} onMouseEnter={(e)=>{whitebggive(e,"attack213","test13")}} className="text highlightCard">{test13.attack2}  {test13.attack2Damage}</h3> 
                                <img className="cardtype3" src={require(`../photos/symbols/${test13.attack2Type1}.png`)}/> 
                                <img style={{marginRight: 100}} className="cardtype3" src={require(`../photos/symbols/${test13.attack2Type2}.png`)}/>
                            </div>
                            <p className="text outline">{test13.attack2Des} </p>
                            <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}} >
                                <h3 id="attack313" onClick={(e)=>{attack313(e)}} onMouseLeave={(e)=>{whitebgtake(e,"attack313")}} onMouseEnter={(e)=>{whitebggive(e,"attack313","test13")}} className="text highlightCard">{test13.attack3}  {test13.attack3Damage}</h3> 
                                <img className="cardtype3" src={require(`../photos/symbols/${test13.attack3Type1}.png`)}/> 
                                <img style={{marginRight: 100}} className="cardtype3" src={require(`../photos/symbols/${test13.attack3Type2}.png`)}/>
                            </div>
                            <p className="text outline">{test13.attack3Des} </p>
                            </div>
 
                        </div>
                        
                        <div style={{width:600,height:75,  display:"flex", justifyContent:"space-around",alignItems:"center", flexWrap:"wrap"}} className={`${test13.type1}bg`}>
                            <h5 className="text highlightCard">Weakness:</h5>
                            <img className="cardtype2" src={require(`../photos/symbols/${test13.weak1}.png`)}/>
                            <h5 className="text highlightCard">x{test13.weak1Amount}</h5>
                            <img className="cardtype2" src={require(`../photos/symbols/${test13.weak2}.png`)}/>
                            <h5 className="text highlightCard">x{test13.weak2Amount}</h5>
                            <h5 className="text highlightCard">Resist:</h5>
                            <img className="cardtype2" src={require(`../photos/symbols/${test13.resist1}.png`)}/>
                            <h5 className="text highlightCard">-{test13.resist1Amount}</h5>
                            <img className="cardtype2" src={require(`../photos/symbols/${test13.resist2}.png`)}/>
                            <h5 className="text highlightCard">-{test13.resist2Amount}</h5>
                            <h5 className="text highlightCard">Prev:{test13.prev}</h5>
                        </div>

                    </div>  {/*------------------------------------------------------------------------------------------------big card */}
                    <div id="test24" style={{height:900, width:600}} className={`${test24.type1}bg hide`}> {/*------------------------------------------------------------------------------------------------big card */}
                        <div style={{width:600, height: 75,  display:"flex",justifyContent:"space-around", alignItems:"center", flexWrap:"wrap"}} className={`${test24.type1}bg`}>
                            <h2 className="text highlightCard">{test24.name}</h2>
                            
                                <h2 className="text highlightCard">Hp: {test24.hp}</h2>
                                <img className="cardtype" src={require(`../photos/symbols/${test24.type1}.png`)}/>
                                <img className="cardtype" src={require(`../photos/symbols/${test24.type2}.png`)}/>
                            
                        </div>
                        <div style={{width:550, height:750}} className={`${test24.name} ${test24.type1}bg`}>
                            <div style={{position: "relative", top: 450}}>
                            <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}}>
                                <h3 id="attack124" onClick={(e)=>{attack124(e)}} onMouseLeave={(e)=>{whitebgtake(e,"attack124")}} onMouseEnter={(e)=>{whitebggive(e,"attack124","test24")}} className="text highlightCard">{test24.attack1}  {test24.attack1Damage}</h3> 
                                <img className="cardtype3" src={require(`../photos/symbols/${test24.attack1Type1}.png`)}/> 
                                <img style={{marginRight: 100}} className="cardtype3" src={require(`../photos/symbols/${test24.attack1Type2}.png`)}/>
                            </div>
                            <p className="text outline"> {test24.attack1Des} </p>
                            <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}} >
                                <h3 id="attack224" onClick={(e)=>{attack224(e)}} onMouseLeave={(e)=>{whitebgtake(e,"attack224")}} onMouseEnter={(e)=>{whitebggive(e,"attack224","test24")}}className="text highlightCard">{test24.attack2}  {test24.attack2Damage}</h3> 
                                <img className="cardtype3" src={require(`../photos/symbols/${test24.attack2Type1}.png`)}/> 
                                <img style={{marginRight: 100}} className="cardtype3" src={require(`../photos/symbols/${test24.attack2Type2}.png`)}/>
                            </div>
                            <p className="text outline">{test24.attack2Des} </p>
                            <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}} >
                                <h3 id="attack324" onClick={(e)=>{attack324(e)}} onMouseLeave={(e)=>{whitebgtake(e,"attack324")}} onMouseEnter={(e)=>{whitebggive(e,"attack324","test24")}} className="text highlightCard">{test24.attack3}  {test24.attack3Damage}</h3> 
                                <img className="cardtype3" src={require(`../photos/symbols/${test24.attack3Type1}.png`)}/> 
                                <img style={{marginRight: 100}} className="cardtype3" src={require(`../photos/symbols/${test24.attack3Type2}.png`)}/>
                            </div>
                            <p className="text outline">{test24.attack3Des} </p>
                            </div>
 
                        </div>
                        
                        <div style={{width:600,height:75,  display:"flex", justifyContent:"space-around",alignItems:"center", flexWrap:"wrap"}} className={`${test24.type1}bg`}>
                            <h5 className="text highlightCard">Weakness:</h5>
                            <img className="cardtype2" src={require(`../photos/symbols/${test24.weak1}.png`)}/>
                            <h5 className="text highlightCard">x{test24.weak1Amount}</h5>
                            <img className="cardtype2" src={require(`../photos/symbols/${test24.weak2}.png`)}/>
                            <h5 className="text highlightCard">x{test24.weak2Amount}</h5>
                            <h5 className="text highlightCard">Resist:</h5>
                            <img className="cardtype2" src={require(`../photos/symbols/${test24.resist1}.png`)}/>
                            <h5 className="text highlightCard">-{test24.resist1Amount}</h5>
                            <img className="cardtype2" src={require(`../photos/symbols/${test24.resist2}.png`)}/>
                            <h5 className="text highlightCard">-{test24.resist2Amount}</h5>
                            <h5 className="text highlightCard">Prev:{test24.prev}</h5>
                        </div>

                    </div>  {/*------------------------------------------------------------------------------------------------big card */}
 

                 {/*  <button>Hi</button>*/} 
                </div>
                {game.round>0?
                <div id="bigCard2"  style={{height:960, width:2000}} className={`cardHolder ${game.showBig} `}>
                <div id="test13o" onClick={(e)=>{opponentHandeler(e)}} style={{height:900, width:600}} className={`${test13o.type1}bg ${game.showo13}`}> {/*------------------------------------------------------------------------------------------------big card */}
                        <div style={{width:600, height: 75,  display:"flex",justifyContent:"space-around", alignItems:"center", flexWrap:"wrap"}} className={`${test13o.type1}bg`}>
                            <h2 className="text highlightCard">{test13o.name}</h2>
                            
                                <h2 className="text highlightCard">Hp: {test13o.hp}</h2>
                                <img className="cardtype" src={require(`../photos/symbols/${test13o.type1}.png`)}/>
                                <img className="cardtype" src={require(`../photos/symbols/${test13o.type2}.png`)}/>
                            
                        </div>
                        <div style={{width:550, height:750}} className={`${test13o.name } ${test13o.type1}bg`}>
                            <div style={{position: "relative", top: 450}}>
                            <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}}>
                                <h3 className="text highlightCard">{test13o.attack1}  {test13o.attack1Damage}</h3> 
                                <img className="cardtype3" src={require(`../photos/symbols/${test13o.attack1Type1}.png`)}/> 
                                <img style={{marginRight: 100}} className="cardtype3" src={require(`../photos/symbols/${test13o.attack1Type2}.png`)}/>
                            </div>
                            <p className="text outline"> {test13o.attack1Des} </p>
                            <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}} >
                                <h3 className="text highlightCard">{test13o.attack2}  {test13o.attack2Damage}</h3> 
                                <img className="cardtype3" src={require(`../photos/symbols/${test13o.attack2Type1}.png`)}/> 
                                <img style={{marginRight: 100}} className="cardtype3" src={require(`../photos/symbols/${test13o.attack2Type2}.png`)}/>
                            </div>
                            <p className="text outline">{test13o.attack2Des} </p>
                            <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}} >
                                <h3 className="text highlightCard">{test13o.attack3}  {test13o.attack3Damage}</h3> 
                                <img className="cardtype3" src={require(`../photos/symbols/${test13o.attack3Type1}.png`)}/> 
                                <img style={{marginRight: 100}} className="cardtype3" src={require(`../photos/symbols/${test13o.attack3Type2}.png`)}/>
                            </div>
                            <p className="text outline">{test13o.attack3Des} </p>
                            </div>
 
                        </div>
                        
                        <div style={{width:600,height:75,  display:"flex", justifyContent:"space-around",alignItems:"center", flexWrap:"wrap"}} className={`${test13o.type1}bg`}>
                            <h5 className="text highlightCard">Weakness:</h5>
                            <img className="cardtype2" src={require(`../photos/symbols/${test13o.weak1}.png`)}/>
                            <h5 className="text highlightCard">x{test13o.weak1Amount}</h5>
                            <img className="cardtype2" src={require(`../photos/symbols/${test13o.weak2}.png`)}/>
                            <h5 className="text highlightCard">x{test13o.weak2Amount}</h5>
                            <h5 className="text highlightCard">Resist:</h5>
                            <img className="cardtype2" src={require(`../photos/symbols/${test13o.resist1}.png`)}/>
                            <h5 className="text highlightCard">-{test13o.resist1Amount}</h5>
                            <img className="cardtype2" src={require(`../photos/symbols/${test13o.resist2}.png`)}/>
                            <h5 className="text highlightCard">-{test13o.resist2Amount}</h5>
                            <h5 className="text highlightCard">Prev:{test13o.prev}</h5>
                        </div>

                    </div>  {/*------------------------------------------------------------------------------------------------big card */}
                    <div id="test24o" onClick={(e)=>{opponentHandeler(e)}} style={{height:900, width:600}} className={`${test24o.type1}bg ${game.showo24} `}> {/*------------------------------------------------------------------------------------------------big card */}
                        <div style={{width:600, height: 75,  display:"flex",justifyContent:"space-around", alignItems:"center", flexWrap:"wrap"}} className={`${test24o.type1}bg`}>
                            <h2 className="text highlightCard">{test24o.name}</h2>
                            
                                <h2 className="text highlightCard">Hp: {test24o.hp}</h2>
                                <img className="cardtype" src={require(`../photos/symbols/${test24o.type1}.png`)}/>
                                <img className="cardtype" src={require(`../photos/symbols/${test24o.type2}.png`)}/>
                            
                        </div>
                        <div style={{width:550, height:750}} className={`${test24o.name} ${test24o.type1}bg`}>
                            <div style={{position: "relative", top: 450}}>
                            <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}}>
                                <h3 className="text highlightCard">{test24o.attack1}  {test24o.attack1Damage}</h3> 
                                <img className="cardtype3" src={require(`../photos/symbols/${test24o.attack1Type1}.png`)}/> 
                                <img style={{marginRight: 100}} className="cardtype3" src={require(`../photos/symbols/${test24o.attack1Type2}.png`)}/>
                            </div>
                            <p className="text outline"> {test24o.attack1Des} </p>
                            <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}} >
                                <h3 className="text highlightCard">{test24o.attack2}  {test24o.attack2Damage}</h3> 
                                <img className="cardtype3" src={require(`../photos/symbols/${test24o.attack2Type1}.png`)}/> 
                                <img style={{marginRight: 100}} className="cardtype3" src={require(`../photos/symbols/${test24o.attack2Type2}.png`)}/>
                            </div>
                            <p className="text outline">{test24o.attack2Des} </p>
                            <div style={{display:"flex",justifyContent:"space-around", alignItems:"center"}} >
                                <h3 className="text highlightCard">{test24o.attack3}  {test24o.attack3Damage}</h3> 
                                <img className="cardtype3" src={require(`../photos/symbols/${test24o.attack3Type1}.png`)}/> 
                                <img style={{marginRight: 100}} className="cardtype3" src={require(`../photos/symbols/${test24o.attack3Type2}.png`)}/>
                            </div>
                            <p className="text outline">{test24o.attack3Des} </p>
                            </div>
 
                        </div>
                        
                        <div style={{width:600,height:75,  display:"flex", justifyContent:"space-around",alignItems:"center", flexWrap:"wrap"}} className={`${test24o.type1}bg`}>
                            <h5 className="text highlightCard">Weakness:</h5>
                            <img className="cardtype2" src={require(`../photos/symbols/${test24o.weak1}.png`)}/>
                            <h5 className="text highlightCard">x{test24o.weak1Amount}</h5>
                            <img className="cardtype2" src={require(`../photos/symbols/${test24o.weak2}.png`)}/>
                            <h5 className="text highlightCard">x{test24o.weak2Amount}</h5>
                            <h5 className="text highlightCard">Resist:</h5>
                            <img className="cardtype2" src={require(`../photos/symbols/${test24o.resist1}.png`)}/>
                            <h5 className="text highlightCard">-{test24o.resist1Amount}</h5>
                            <img className="cardtype2" src={require(`../photos/symbols/${test24o.resist2}.png`)}/>
                            <h5 className="text highlightCard">-{test24o.resist2Amount}</h5>
                            <h5 className="text highlightCard">Prev:{test24o.prev}</h5>
                        </div>

                    </div>  {/*------------------------------------------------------------------------------------------------big card */}
                </div>:
                <p></p>
                }
                
                <button id="use1" className="use1 hide adjust"> <img className="adjustb" src={require("../photos/symbols/button.jpg")}/> </button>

                <button onMouseEnter={(e)=>{
                    e.preventDefault()
                    var cancel= document.getElementById("cancel").classList.remove("cancel");
                    var newcancel= document.getElementById("cancel").classList.add("buttonhover");
                }} onClick={(e)=>{cancelHandler(e)}}  onMouseLeave={(e)=>{
                    e.preventDefault()
                    var cancel= document.getElementById("cancel").classList.remove("buttonhover");
                    var newcancel= document.getElementById("cancel").classList.add("cancel");
                }}id="cancel" className="cancel hide">Cancel</button>
            </div>
        </div>
    )
}

export default GameRoom;