import React, { useEffect, useState } from "react";
import "../RockPaperScissor.css";

function RockPaperScissor(){
    //setting values
    const [userMove, setUserMove] = useState(null);
    const [computerMove, setComputerMove] = useState(null);
    const [outcome, setOutcome] = useState(null)
    const [criminal, setCriminal] = useState([])
    const [userPic, setUserPic] = useState("")
    const [enemyPic, setEnemyPic] = useState("")
    const choices = ["rock", "paper", "scissors"]

    //fetching data
    useEffect(() => {
        fetch("http://localhost:3000/items")
        .then(r => r.json())
        .then(data => {            
            setCriminal(data[Math.floor(Math.random() * (7))])
        })
    }, [])

    //setting user score
    function handleUserScore(newScore){
        setUserScore(newScore)
    }

    //setting enemy score
    function handleEnemyScore(newScore){
        setEnemyScore(newScore)
    }

    //sets both choices to state
    function handleChoice(choice){
        setUserMove(choice);
        computerChoice();
    }
    //updates computer move state with a random choice
    function computerChoice(){
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
        setComputerMove(randomChoice);
    }
    //determining the outcome of the turns
    useEffect(() => {
        whoWins();
    }, [computerMove, userMove])
    //handles which picture to show for user depending on which button was clicked
    useEffect(() => {
        if(userMove === 'scissors'){
            setUserPic("https://www.freeiconspng.com/uploads/scissors-icon-6.png")
        } else if(userMove === 'paper') {
            setUserPic("https://www.freeiconspng.com/uploads/note-paper-letter-blank-page-scroll-icon-25.png")
        } else if(userMove == 'rock') {
            setUserPic("https://www.freeiconspng.com/uploads/rock-icon-11.png")
        }
    }, [userMove])
    //handles which picture to show for the enemy depending on which move was done
    useEffect(() => {
        if(computerMove === 'scissors'){
            setEnemyPic("https://www.freeiconspng.com/uploads/scissors-icon-6.png")
        } else if(computerMove === 'paper') {
            setEnemyPic("https://www.freeiconspng.com/uploads/note-paper-letter-blank-page-scroll-icon-25.png")
        } else if(computerMove == 'rock') {
            setEnemyPic("https://www.freeiconspng.com/uploads/rock-icon-11.png")
        }
    }, [computerMove])
    //determinges the outcomes
    function whoWins(){
        switch(userMove + computerMove){
            case 'scissorspaper':
            case 'rockscissors':
            case 'paperrock':
                setOutcome('YOU WON')
                break
            case 'paperscissors':
            case 'scissorsrock':
            case 'rockpaper':
                setOutcome('YOU LOST')
                break
            case 'rockrock':
            case 'paperpaper':
            case 'scissorsscissors':
                setOutcome('DRAW')
                break
            default: // linter gets mad without a default case
                break
        }
    }

    let parsedMugshot = criminal.mugshot;
    if (criminal.mugshot === "") {
        parsedMugshot = "https://cdn.modrinth.com/placeholder.svg"
    }
    //html
    return(
        <div className="rps-container panel">
            <div id="player-cards">
                <div className="enemy-card panel cardski">
                    <h5 className="h5s">Suspect: </h5>
                    <p>{criminal.name}</p>
                    <p><strong>STATUS: </strong>ARMED AND DANGEROUS</p>
                    <img id="enemy-pic" src={parsedMugshot}/>
                </div>
                <div className="user-card panel cardski">
                    <h5 className="h5s" id="good-title">Server of Justice(YOU): </h5>
                    <p><strong>STATUS: </strong>dashing, strong, single, dog-lover</p>
                    <img id="detective-pic" src="https://images.pexels.com/photos/7319346/pexels-photo-7319346.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
                </div>
            </div>
            <div className="main-content-stuff panel">
                <div id="instructions" className="instruction-stuff panel">
                    <h2 className="instructions-text">Instructions: </h2>
                    <p>
                        You've been assigned a dangerous case, and you've caught the suspect, put them in handcuffs, but there's one more step: beat them in a game of rock, paper, scissors, or else YOU might end up in the backseat of a cop car.
                    </p>
                </div>
                <div className="gameboard panel">
                    <img className="enemy-hand" src="https://www.freeiconspng.com/uploads/hands-png-hand-image-photo-35.png"/>
                    <img className="move-enemy" src={enemyPic}/>
                    <h1>{outcome}</h1>
                    <img className="move-user" src={userPic}/>
                    <img className ="user-hand" src="https://www.freeiconspng.com/uploads/hands-png-hand-image-photo-35.png"/>
                </div>
                <div className="button-container panel">
                    <button className="buttons" onClick={() => handleChoice("rock")}>Rock</button>
                    <button className="buttons" onClick={() => handleChoice("paper")}>Paper</button>
                    <button className="buttons" onClick={() => handleChoice("scissors")}>Scissors</button>
                </div>
            </div>
        </div>
    )
}

export default RockPaperScissor