import React, { useEffect, useState } from "react";
import "../RockPaperScissor.css";
import ScoreCounter from "./ScoreCounter";

function RockPaperScissor(){
    //setting values
    const [userMove, setUserMove] = useState(null);
    const [computerMove, setComputerMove] = useState(null);
    const [outcome, setOutcome] = useState(null);
    const [criminal, setCriminal] = useState([]);
    const [userPic, setUserPic] = useState("");
    const [enemyPic, setEnemyPic] = useState("");
    const [userScore, setUserScore] = useState(0);
    const [enemyScore, setEnemyScore] = useState(0);
    const [winCondition, setWinCondition] = useState("play")
    const [userWinAnimation, setUserWinAnimation] = useState(false)
    const [enemyWinAnimation, setEnemyWinAnimation] = useState(false)
    const [winText, setWinText] = useState(false)
    const [lossText, setLossText] = useState(false)
    const choices = ["rock", "paper", "scissors"];
    let parsedMugshot = criminal.mugshot;

    //fetching data
    useEffect(() => {
        fetch("http://localhost:3000/items/" + window.location.search.slice(2))
        .then(r => r.json())
        .then(data => {
            setCriminal(data)
        })
    }, []);

    useEffect(()=> {
        fetch(`http://localhost:3000/items/${criminal.id}`,{
            method: "DELETE"
        })
        .then(r => r.json())
        .then((data) => {
            data.filter((item) => item.id !== criminal.id)
        })
    }, [winText])

    //sets both choices to state
    function handleChoice(choice){
        setUserMove(choice);
        computerChoice();
    };

    //changes the state of our win condition
    useEffect(() => {
        if(userScore === 5) {
            setWinCondition("win")
        } else if(enemyScore === 5) {
            setWinCondition("loss")
        }
    }, [userScore, enemyScore])

    let buttons = []
    if (winCondition !== "play") {
        buttons = [ (<button disabled className="buttons" onClick={() => handleChoice("rock")}>Rock</button>),
                    (<button disabled className="buttons" onClick={() => handleChoice("paper")}>Paper</button>),
                    (<button disabled className="buttons" onClick={() => handleChoice("scissors")}>Scissors</button>)]
    } else {
        buttons = [ (<button className="buttons" onClick={() => handleChoice("rock")}>Rock</button>),
                    (<button className="buttons" onClick={() => handleChoice("paper")}>Paper</button>),
                    (<button className="buttons" onClick={() => handleChoice("scissors")}>Scissors</button>)]
    }

    
    const winReact = (
        <div>
            <img id="fireball1" src="https://i.gifer.com/origin/a0/a07ad08920f303f655251b1a0b353b86_w200.gif"/>
            <img id="fireball2" src="https://i.gifer.com/origin/a0/a07ad08920f303f655251b1a0b353b86_w200.gif"/>
            <img id="fireball3" src="https://i.gifer.com/origin/a0/a07ad08920f303f655251b1a0b353b86_w200.gif"/>
        </div>
    )

    const loseReact = (
        <div>
            <img id="fireball5" src="https://i.gifer.com/origin/a0/a07ad08920f303f655251b1a0b353b86_w200.gif"/>
            <img id="fireball6" src="https://i.gifer.com/origin/a0/a07ad08920f303f655251b1a0b353b86_w200.gif"/>
        </div>
    )

    useEffect(() => {
        if(winCondition === "win") {
            console.log("winner")
        } else if(winCondition === "loss") {
            console.log("loser")
        }
    }, [winCondition])


    //updates computer move state with a random choice
    function computerChoice(){
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
        setComputerMove(randomChoice);
    };
    //determining the outcome of the turns
    useEffect(() => {
        whoWins();
    }, [computerMove, userMove]);
    //handles which picture to show for user depending on which button was clicked
    useEffect(() => {
        if(userMove === 'scissors'){
            setUserPic("https://www.freeiconspng.com/uploads/scissors-icon-6.png");
        } else if(userMove === 'paper') {
            setUserPic("https://www.freeiconspng.com/uploads/note-paper-letter-blank-page-scroll-icon-25.png");
        } else if(userMove == 'rock') {
            setUserPic("https://www.freeiconspng.com/uploads/rock-icon-11.png");
        }
    }, [userMove]);
    //handles which picture to show for the enemy depending on which move was done
    useEffect(() => {
        if(computerMove === 'scissors'){
            setEnemyPic("https://www.freeiconspng.com/uploads/scissors-icon-6.png");
        } else if(computerMove === 'paper') {
            setEnemyPic("https://www.freeiconspng.com/uploads/note-paper-letter-blank-page-scroll-icon-25.png");
        } else if(computerMove == 'rock') {
            setEnemyPic("https://www.freeiconspng.com/uploads/rock-icon-11.png");
        }
    }, [computerMove]);

    const winnerInfo = (
        <div className="win-text">
            <h2 className="win-h2">WIN</h2>
            <p className="win-p">You've caught and blown up the suspect, thanks for keeping the streets clean!</p>
        </div>
    )

    const loserInfo = (
        <div className="loss-text">
            <h2 className="loss-h2">LOSS</h2>
            <p className="loss-p">The roles have been reversed! The suspect put you in handcuffs, and blew you up! nice job...</p>
        </div>
    )

    useEffect(() => {
        if(winCondition === "win"){
            setUserWinAnimation(true)
            setWinText(true)
        } else if(winCondition === "loss"){
            setEnemyWinAnimation(true)
            setLossText(true)
        }
    }, [winCondition])

    //determinges the outcomes
    function whoWins(){
        switch(userMove + computerMove){
            case 'scissorspaper':
            case 'rockscissors':
            case 'paperrock':
                setUserScore(userScore + 1)
                break
            case 'paperscissors':
            case 'scissorsrock':
            case 'rockpaper':
                setEnemyScore(enemyScore + 1)
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

    if (criminal.mugshot === "") {
        parsedMugshot = "https://cdn.modrinth.com/placeholder.svg"
    }

    //html
    return(
        <div className="rps-container panel">
            <div id="player-cards">
                <div className="enemy-card panel">
                    <h5 className="h5s">Suspect: </h5>
                    <p>{criminal.name}</p>
                    <p><strong>STATUS: </strong>ARMED AND DANGEROUS</p>
                    <img id="enemy-pic" src={parsedMugshot}/>
                    {userWinAnimation ? winReact : null}
                </div>
                <div className="user-card panel">
                    <h5 className="h5s" id="good-title">Server of Justice(YOU): </h5>
                    <p><strong>STATUS: </strong>dashing, strong, single, dog-lover</p>
                    <img id="detective-pic" src="https://images.pexels.com/photos/7319346/pexels-photo-7319346.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
                    {enemyWinAnimation ? loseReact : null}
                </div>
            </div>
            <div className="main-content-stuff panel">
                <div id="instructions" className="instruction-stuff panel">
                    <h2 className="instructions-text">Instructions: </h2>
                    <p>
                        You've been assigned a dangerous case, and you've caught the suspect, put them in handcuffs, but there's one more step: beat them in a game of rock, paper, scissors, or else YOU might end up in the backseat of a cop car.
                    </p>
                </div>
                <div className="gameboard-container">
                    <ScoreCounter isRed={false} points={userScore}/>
                    <div className="gameboard panel">
                        <img className="enemy-hand" src="https://www.freeiconspng.com/uploads/hands-png-hand-image-photo-35.png"/>
                        <img className="move-enemy" src={enemyPic}/>
                        {winText ? winnerInfo : null}
                        {lossText ? loserInfo : null}
                        <img className="move-user" src={userPic}/>
                        <img className ="user-hand" src="https://www.freeiconspng.com/uploads/hands-png-hand-image-photo-35.png"/>
                    </div>
                    <ScoreCounter isRed={true} points={enemyScore}/>
                </div>
                <div className="button-container panel">
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default RockPaperScissor