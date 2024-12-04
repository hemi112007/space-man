/*-------------------------------- Constants --------------------------------*/
const words = [
    { word: "python", hint: "programming language" },
    { word: "guitar", hint: "a musical instrument" },
    { word: "aim", hint: "a purpose or intention" },
    { word: "venus", hint: "planet of our solar system" },
    { word: "gold", hint: "a yellow precious metal" },
    { word: "ebay", hint: "online shopping site" },
    { word: "golang", hint: "programming language" },
    { word: "coding", hint: "related to programming" },
    { word: "matrix", hint: "science fiction movie" },
    { word: "avatar", hint: "epic science fiction film" },
    { word: "email", hint: "related to exchanging message" },
    { word: "google", hint: "famous search engine" },
    { word: "tesla", hint: "unit of magnetic flux density" },
    { word: "mars", hint: "planet of our solar system" },
    { word: "html", hint: "markup language for the web" }
]

/*---------------------------- Variables (state) ----------------------------*/
let word;
let guessedWord;
let lives = 6;
let correctGuesses = []

/*------------------------ Cached Element References ------------------------*/
const hint = document.getElementById("hint")
const wordDisplay = document.getElementById("word")
const livesDisplay = document.getElementById("lives")
const lettersDisplay = document.getElementById("letters")
const restartButton = document.getElementById("restart")
const messageContainer = document.getElementById("message-container")

/*-------------------------------- Functions --------------------------------*/

function startGame() {
    let randomIndex = Math.floor(Math.random() * words.length);
    word = words[randomIndex].word
    guessedWord = []
    correctGuesses = []
    
    lives = 6
    livesDisplay.textContent = lives
    
    hint.textContent = "Hint: " + words[randomIndex].hint

    for (let i = 0; i < word.length; i++) {
        guessedWord.push("_")
    }
    wordDisplay.textContent = guessedWord.join(" ")

    lettersDisplay.innerHTML = ""
    for (let i = 97; i <= 122; i++) {
        let button = document.createElement("button")
        button.textContent = String.fromCharCode(i)
        button.onclick = handleGuess
        lettersDisplay.appendChild(button)
    }

    messageContainer.textContent = "Earthling. The symbols of the cosmos are encrypted. Will you decipher their meaning?"
}

function handleGuess(event) {
    let letter = event.target.textContent
    
    if (correctGuesses.includes(letter)) {
        return;
    }

    correctGuesses.push(letter)

    if (word.includes(letter)) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) {
                guessedWord[i] = letter
            }
        }
        wordDisplay.textContent = guessedWord.join(" ")

        if (guessedWord.join("") === word) {
            winGame()
        }
    } else {
        lives--;
        livesDisplay.textContent = lives;
        
        if (lives === 0) {
            loseGame()
        }
    }
}

function disableButtons() {
    let buttons = lettersDisplay.getElementsByTagName("button")
    for (let button of buttons) {
        button.disabled = true
    }
}

function winGame() {
    messageContainer.textContent = "Congratulations Earthlings, you passed our test and survived world domination!";
    disableButtons();
}

function loseGame() {
    messageContainer.textContent = "Hahaha we knew your species wouldn't make it, prepare for annihilation!";
    disableButtons();
}

/*----------------------------- Event Listeners -----------------------------*/

restartButton.addEventListener("click", startGame)

document.addEventListener("DOMContentLoaded", function () {
    startGame()
})
