
const inquirer = require("inquirer");
let randomAttackVal;
let player1;
let zombie;
let userGuess;

// create constructor function for making new player
function Player(name, power) {
    this.name = name;
    this.power = power;
    this.hp = 20;
}

// create protoype methods for player and opponent 
Player.prototype.attack = function (enemy, damage) {
    console.log("YOU ATTACKED THE ZOMBIE!!")
    console.log(`THe Zombie lost ${randomAttackVal} HP.`)
    return enemy.hp -= damage;
}

Player.prototype.getAttacked = function (damage) {
    console.log("THE ZOMBIE ATTACKED YOU!!")
    console.log(`You lost ${randomAttackVal} HP.`)
    return this.hp -= damage;
    
}

Player.prototype.print = function () {
    console.log(`===========================
CURRENT PLAYER STATS
Player Name: ${this.name}
Player Power: ${this.power}
Player Hp: ${this.hp}
==============================`)
}

// function to make new player
function createPlayer() {
    inquirer.prompt([
        {
            type: "confirm",
            message: `Welcome to Zombie Apocalypse! Here are the rules:
1.) Create your Player
2.) For each round, pick a number between 1 and 5
3.) If you guess the random number for each round, you will inflict damage on the zombie!
4.) If you guess incorrectlty, the zombie will inflict damage on you!
5.) Whoever runs out of HP first is the loser!
PRESS Y FOR YES AND HIT ENTER WHEN YOU ARE READY TO MAKE YOUR PLAYER`,
            name: "rules"
        },
        {
            type: "input",
            message: "What is your player name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your power",
            name: "power"
        },
        {
            type: "confirm",
            message: "READY FOR BATTLE?",
            name: "cofirm"
        }
    ]).then(function (answer) {
        player1 = new Player(answer.name, answer.power);
        console.log(`${player1.name}, Your player has been created`);
        player1.print();
        zombie = new Player("Zombie", "Flesh Eating Madness");
        console.log("Zombie created!");
        zombie.print();
        playGame(answer);
    })
}
// either ends game or plays another round depeneding on if anyone is dead yet
function playGame(answer) {
    if (player1.hp > 0 && zombie.hp > 0) {
        playRound(answer);
    }
    else if (player1.hp <= 0 || zombie.hp <= 0) {
        endGame();
    }
}
// picks random number and sees who gets damaged
function playRound(answer) {
    inquirer.prompt([
        {
            type: "input",
            message: "Pick a number between 1 and 5 to battle!",
            name: "guess"
        }
    ]).then(function (answer) {
        randomAttackVal = Math.floor(Math.random() * 5) + 1;
        console.log(`=============================
The random number for this round was: ${randomAttackVal}
You guessed: ${answer.guess}
=========================`);
        if (answer.guess === randomAttackVal) {
            player1.attack(zombie, randomAttackVal);
            player1.print();
            zombie.print();
        }
        else if (answer.guess !== randomAttackVal) {
            player1.getAttacked(randomAttackVal);
            player1.print();
            zombie.print();
        }
        // make playgGame recursive
        playGame();
    })
}

function endGame() {
    if (player1.hp <= 0) {
        console.log("GAME OVER! THE ZOMBIE ATE YOUR FACE OFF!")
        playAgain();
    }
    else if (zombie.hp <= 0) {
        console.log("GAME OVER! YOU WON! THE ZOMBIE IS DEFEATED!")
        playAgain();
    }
}

function playAgain() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Play Again?",
            name: "playAgain"
        }
    ]).then(function (answer) {
        if (answer.playAgain) {
            createPlayer();
        }
        else {
            endGameFinal()
        }
    })
}

function endGameFinal() {
    console.log("Goodbye!")
}

// we only have to call one funtion to make the whole thing work!
createPlayer();








