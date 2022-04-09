ScrollReveal().reveal('.sequenced', {interval: 150, delay: 200, origin:'top', distance: '300px', duration: 1000})

// DICE
let dice = document.getElementById('dice')
let diceContainer = document.getElementById('dice-container')

// BUTTONS

let buttonNewGame = document.getElementById('new-game')
let buttonRollDice = document.getElementById('roll-dice')
let buttonSendPoints = document.getElementById('send-points')

// PLAYERS 

    // PLAYER 1
let playerOneTitleHTML = document.getElementById('player-1-span')
let playerOneGlobalScoreHTML = document.getElementById('player-1-global-score')
let playerOneCurrentScoreHTML = document.getElementById('player-1-current-score')

    // PLAYER 2
let playerTwoTitleHTML = document.getElementById('player-2-span')
let playerTwoGlobalScoreHTML = document.getElementById('player-2-global-score')
let playerTwoCurrentScoreHTML = document.getElementById('player-2-current-score')

// INITIATE VARIABLES
let activePlayer
let playerEnemy

// WINNER BOX
let winnerBox = document.getElementById('winner-box')
let winnerId = document.getElementById('winner-id')

// FUNCTION GET RANDOM NUMBER 0-6
function randomExcluded(min, max, excluded) {
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
}
// FUNCTION RANDOM PLAYER
function randomPlayer() {
    var j = Math.floor(Math.random() * 2)
    var randomPlayer = players[j]
    return randomPlayer
}
// PLAYER CONSTRUCTOR 
class Player {
    constructor(id, globalScore, currentScore, isActive, playerTitleHTML, playerGlobalHTML, playerCurrentHTML, playerEnemy) {
        this.id = id
        this.globalScore = globalScore
        this.currentScore = currentScore
        this.isActive = isActive
        this.playerTitleHTML = playerTitleHTML
        this.playerGlobalHTML = playerGlobalHTML
        this.playerCurrentHTML = playerCurrentHTML
        this.playerEnemy = playerEnemy
    }

    setActive() {
        this.isActive = true
        this.playerTitleHTML.style.transform = 'scale(1.3)'
        this.playerTitleHTML.style.color = 'rgb(150,150,150)'
    }

    setNotActive() {
        this.isActive = false
        this.playerTitleHTML.style.transform = 'scale(1)'
        this.playerTitleHTML.style.color = 'black'
    }
}

// PLAYER ENTITIES
let playerOne = new Player(1, 0, 0, false, playerOneTitleHTML, playerOneGlobalScoreHTML, playerOneCurrentScoreHTML)
let playerTwo = new Player(2, 0, 0, false, playerTwoTitleHTML, playerTwoGlobalScoreHTML, playerTwoCurrentScoreHTML)
playerOne.playerEnemy = playerTwo
playerTwo.playerEnemy = playerOne
let players = [playerOne, playerTwo]

// FUNCTION START GAME
function startGame() {
    activePlayer = randomPlayer()
    activePlayer.setActive()
    buttonNewGame.disabled = true
}

buttonNewGame.addEventListener('click', () => {
    startGame()
})

// FUNCTION ROLL DICE

function rollDice() {
    if (activePlayer.isActive === true) {
        // ROLL DICE
        let diceNb = randomExcluded(0, 6, 0)
        // DELAY
        setTimeout(() => {
            dice.style.backgroundImage = 'url(../img/dice-' + diceNb + '.png)'              
        }, 500);
        // DICE ANIMATION
        diceContainer.animate([
            {transform: 'translateX(-50%) translateY(-50%) scale(1) rotate(0deg)'},
            {transform: 'translateX(-50%) translateY(-50%) scale(1.3) rotate(90deg)'},
            {transform: 'translateX(-50%) translateY(-50%) scale(0) rotate(180deg)'},
            {transform: 'translateX(-50%) translateY(-50%) scale(1.3) rotate(270deg)'},
            {transform: 'translateX(-50%) translateY(-50%) scale(1) rotate(360deg)'}
        ], {
            duration: 1000,
            iterations: 1,
            easing: 'ease-in-out'
        })
        if(diceNb !== 1) {
            activePlayer.currentScore += diceNb
            activePlayer.playerCurrentHTML.innerText = activePlayer.currentScore
        } else {
            activePlayer.currentScore = 0
            activePlayer.playerCurrentHTML.innerText = activePlayer.currentScore
            activePlayer.setNotActive()
            activePlayer = activePlayer.playerEnemy
            activePlayer.setActive()
        }
    }
}

buttonRollDice.addEventListener('click', () => {
    rollDice()
})

// FUNCTION SEND POINTS

function sendPoints() {
    if (activePlayer.isActive === true && activePlayer.currentScore > 0) {

        activePlayer.globalScore += activePlayer.currentScore
        activePlayer.currentScore = 0
        activePlayer.playerCurrentHTML.innerText = activePlayer.currentScore
        activePlayer.playerGlobalHTML.innerText = activePlayer.globalScore
        
        if(activePlayer.globalScore >= 100) {
            ScrollReveal().reveal('.winner-box')
            winnerId.innerText = activePlayer.id
            winnerBox.style.display = 'flex'
            buttonNewGame.disabled = true
            buttonRollDice.disabled = true
            buttonSendPoints.disabled = true
        } else {
            activePlayer.setNotActive()
            activePlayer = activePlayer.playerEnemy
            activePlayer.setActive()
        }
    }
}

buttonSendPoints.addEventListener('click', () => {
    sendPoints()
})

// FUNCTION RELOAD PAGE

function reloadPage() {
    location.reload()
}

