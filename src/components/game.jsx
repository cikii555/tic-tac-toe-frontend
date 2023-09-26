import React, { useState } from 'react';
import  Button  from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Game()  {
    const [data, setData] = useState({ username: '', password: '' });
    /*state = { 
        start:false,
        players: 0,
        gameType: ''

     } */
    
    const redirectToBoard = ()=>{
        
     }
    const redirectToMultiPlayer = () =>{

     }
    const redirectToJoinGame = ()=>{

     }
    
        return(<div>
          
            <Button onClick={redirectToBoard}>Singleplayer </Button>
            <Button onClick="">Multiplayer</Button>
            <Button >Join game</Button>
        </div>) ;
    
}
 
export default Game;