/**
 *      Computer selects a throw.
 *      Player selects a throw.
 *      Compare throws.
 *      Determine Winner.
 */

const throws = ["rock", "paper", "scissors"];

function getComputerChoice() {
    return throws[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
    console.log("Player throws " + playerSelection);
    console.log("Computer throws " + computerSelection);
    let winner;
    switch (computerSelection) {
        case "rock":
            if(playerSelection == "paper") winner = "Player won with paper"
            else if(playerSelection == computerSelection) winner = "Tie"
            else winner = "Computer won with rock" 
            break;
        case "paper":
            if(playerSelection == "scissors") winner = "Player won with scissors"
            else if(playerSelection == computerSelection) winner = "Tie"
            else winner = "Computer won with paper"
            break;
        case "scissors":
            if(playerSelection == "rock") winner = "Player won with rock"
            else if(playerSelection == computerSelection) winner = "Tie"
            else winner = "Computer won with scissors"
            break;
        default:
            break;
    }

    return winner;
}

function game() {
    const rounds = 5;
    for (let i = 0; i < rounds; i++) {
        let playerSelection = prompt("Throw").toLowerCase();
        let computerSelection = getComputerChoice();        
        console.log(playRound(playerSelection, computerSelection));
    }


}