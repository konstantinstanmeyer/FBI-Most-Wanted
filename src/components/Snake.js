import { useEffect, useState } from "react";
import soundChaChing from "../assets/cha-ching.mp3"


// Math Functions
const rand = (max) => parseInt(Math.random() * max); // random int between 0 and max
const mod = (num, val) => ((num % val) + val) % val; // modulus operator, what % should be.
// Game Variables
const GameScreenSize = "30rem"
const GameSize = 15
const gUnit = (num) => `calc((${GameScreenSize}/${GameSize})*${num})`

// Takes 2 callbacks, success and failure
// upon player scoring 7 points, calls "success" callback.
// upon player dying calls "failure" callback
// Also takes an image url, which is used as the texture of the snake's "apples"

// Code based roughly on my pureJS snake script
// https://github.com/CodeF53/personal-site/tree/main/snake
function Snake({texture, suspectBounty, suspectName, success, failure, close}) {
    const [facing, setFacing] = useState("")
    const [snake, setSnake] = useState([{x:parseInt(GameSize/2), y:parseInt(GameSize/2)}])
    const [apple, setApple] = useState({x:rand(GameSize), y:rand(GameSize)})
    const [score, setScore] = useState(0)
    
    const [gameState, setGameState] = useState("play")

    function setGameVars() {
        setGameState("play")
        setFacing("")
        setSnake([{x:parseInt(GameSize/2), y:parseInt(GameSize/2)}])
        setApple({x:rand(GameSize), y:rand(GameSize)})
        setScore(0)
    }
    
    // add movement listeners and game clock when first rendered
    useEffect(() => {
        // WASD and Arrow Keys
        // prevent user from backing snake into itself, which would lead to instant death
        function handleGameInput(e) {
            switch(e.code) {
                case "KeyW":
                case "ArrowUp":
                    if (facing !== "down")
                        setFacing("up")
                    break;
                
                case "KeyA":
                case "ArrowLeft":
                    if (facing !== "right")
                        setFacing("left")
                    break;
                
                case "KeyD":    
                case "ArrowRight":
                    if (facing !== "left")
                        setFacing("right")
                    break;
                
                case "KeyS":
                case "ArrowDown":
                    if (facing !== "up")
                        setFacing("down")
                    break;
                
                // linter gets mad without default case
                default:
                    break;
            }
        } 

        // Move snake, do collision, that sort of thing
        function gameTick() {
            if (facing !== "" && gameState === "play") {
                const oldHeadPos = snake[snake.length-1]
                switch (facing) {
                    case "up":
                        setSnake([...snake, {x:mod(oldHeadPos.x,  GameSize), y:mod(oldHeadPos.y-1,GameSize)}])
                        break;
                    case "left":
                        setSnake([...snake, {x:mod(oldHeadPos.x-1,GameSize), y:mod(oldHeadPos.y,  GameSize)}])
                        break;
                    case "right":
                        setSnake([...snake, {x:mod(oldHeadPos.x+1,GameSize), y:mod(oldHeadPos.y,  GameSize)}])
                        break;
                    case "down":
                        setSnake([...snake, {x:mod(oldHeadPos.x,  GameSize), y:mod(oldHeadPos.y+1,GameSize)}])
                        break;
                    // linter gets mad without default case
                    default:
                        break;
                }
                const headPos = snake[snake.length-1]

                // check if successfully ate apple 
                if (headPos.x === apple.x && headPos.y === apple.y) {
                    // put apple in new position
                    setScore(score=>score+1)
                    console.log(`apple consumed, score: ${score}`)
                    if (score >= 6) {
                        setGameState("win")
                    }
                    // make sure the apple isn't overlapping snake
                    let invalidApplePos = true;
                    let newApplePos;
                    while (invalidApplePos) {
                        invalidApplePos = false
                        newApplePos = {x:rand(GameSize), y:rand(GameSize)}
                        // make sure snake isn't overlapping apple
                        for (let i = 0; i < snake.length; i++) {
                            if (snake[i].x === newApplePos.x && snake[i].y === newApplePos.y) {
                                invalidApplePos = true
                            }
                        }
                    }
                    setApple(newApplePos)
                } else {
                    // if didnt eat apple, keep length the same.
                    setSnake(snake=>snake.slice(1))
                }
                // check for overlaps
                for (let i = 0; i < snake.length-1; i++) {
                    if (headPos.x === snake[i].x && headPos.y === snake[i].y) {
                        setGameState("die") // die
                        failure()
                    }
                }
            }   
        }      

        if (gameState === "play") {
            document.body.addEventListener("keydown", handleGameInput)
            const gameTimeoutID = setTimeout(gameTick, 100);

            return () => {
                document.body.removeEventListener("keydown", handleGameInput)
                clearTimeout(gameTimeoutID)
            }
        }
    }, [snake, setSnake, apple, score, facing, gameState, setGameState])

    const snakeComponents = snake.map((snakePart)=>{
        return (
            <div className="snaketile snakepart" style={{left:gUnit(snakePart.x), top:gUnit(snakePart.y)}}></div>
        )
    });

    const appleComponent = (<img 
        className="snaketile snakeapple" src={texture} alt="the criminal sent to the snake pit"
        style={{left:gUnit(apple.x), top:gUnit(apple.y)}}>
    </img>)


    let textOverlay;
    if (gameState === "win") {
        textOverlay = (
            <div id="snakeTextOverlay">
                <h2>Suspect Terminated!</h2>
                <p>Justice is Served</p>
                <button className="snakeBountyButton snakeButton" onClick={()=>{new Audio(soundChaChing).play(); close(); success()}}>
                    <p>Collect<br/>Bounty</p>
                </button>
            </div>
        )
    } else if (gameState === "die") {
        textOverlay = (
            <div id="snakeTextOverlay">
                <h2>You Failed!</h2>
                <p>$1000 has been added to Suspect's bounty</p>
                <div className="snakeFailedButtons">
                    <button className="snakeButton" onClick={setGameVars}>
                        <p>Play<br/>Again</p>
                    </button>
                    <button className="snakeButton" onClick={close}>
                        <p>Give<br/>Up</p>
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="panel">
            <h1>Hunting {suspectName} for a bounty of ${suspectBounty}</h1>
            <p><strong>How To Play:</strong> use WASD or the arrow keys to change the direction the snake moves, eat apples to expand, win on eating 7 apples, dont hit yourself </p>
            <h2>Score: {score}</h2>
            <div id="snakeGame">
                {appleComponent}
                {snakeComponents}
                {textOverlay}
            </div>
        </div>
    )
}

export default Snake