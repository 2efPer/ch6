import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Play from "./Play";


import '../css/App.scss';


  
export default function Game({accountId,contract}) {

    const [myPick, setMyPick] = useState("");
    const [housePick, setHousePick] = useState("");
    const [gameScore, setGameScore] = useState(0);

    function newHousePick() {
        const choices = ["rock", "paper", "scissors"];
        const randomChoice = choices[Math.floor((Math.random()*3))];
        setHousePick(randomChoice);
    }

    useEffect(() => {
        newHousePick();
    },[setMyPick]);

    return (
         <Router>
             <div className="wrapper">
            <Header score={gameScore} accountId={accountId} contract={contract}/>

            <Switch className="main">
                <Route path="/play">
                    <Play mine={myPick} house={housePick} score={gameScore} setScore={setGameScore} setHousePick={newHousePick}/>
                </Route>

                <Route path="/">
                    <Home setPick={setMyPick} />
                </Route>
                
            </Switch>
            </div>
           
        </Router>
    )
}
