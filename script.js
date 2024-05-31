// confirm script connection: 
// function SubmitButton(){
//     prompt("Write to web: ");
// };

// Game Spec: I want you to create a simple guess the number type game. It should choose a random number between 1 and 100, then challenge the player to guess the number in 10 turns. After each turn, the player should be told if they are right or wrong, and if they are wrong, whether the guess was too low or too high. It should also tell the player what numbers they previously guessed. The game will end once the player guesses correctly, or once they run out of turns. When the game ends, the player should be given an option to start playing again.


// Solving Problem 
// 1. Generate a random number between 1 and 100.
let randomNumber = Math.floor(Math.random() * 100) + 1;

// Get documents and Constants 
const container = document.querySelector('.container')
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit"); 
const guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;


// 2. Record the turn number the player is on. Start it on 1.
function checkGuess(){
    const userGuess = guessField.value;
    if (guessCount === 1) {
        guesses.textContent = "Previous guesses: ";
    }
    guesses.textContent = `${guesses.textContent} ${userGuess}`

    if (userGuess === randomNumber) {
        lastResult.textContent = "Congratulations! You got it right!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver();
    } else if (guessCount === 10){
        lastResult.textContent = "GAME OVER!";
        lowOrHi.textContent = `Actual guess: ${randomNumber}`;
        setGameOver();
    } else {
        lastResult.textContent = "Wrong!";
        lastResult.style.backgroundColor = "red";
        if (userGuess < randomNumber){
            lowOrHi.textContent = "Last guess was too low!";
        } else if (userGuess > randomNumber){
            lowOrHi.textContent = "Last guess was too high!";
        }
    }
    guessCount++;
    guessField.value = "";
    guessField.focus();
};

guessSubmit.addEventListener("click", checkGuess);


function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.textContent = "Start new game";
    container.appendChild(resetButton);
    resetButton.addEventListener("click", resetGame);
  }


  function resetGame() {
    guessCount = 1;
  
    const resetParas = document.querySelectorAll(".resultParas p");
    for (const resetPara of resetParas) {
      resetPara.textContent = "";
    }
  
    resetButton.parentNode.removeChild(resetButton);
  
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();
  
    lastResult.style.backgroundColor = "white";
  
    randomNumber = Math.floor(Math.random() * 100) + 1;
  }