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
    let playerWin = 0;
    let computerWin = 1;
    let tie = 2;

    switch (computerSelection) {
        case "rock":
            if(playerSelection == "paper") {
                return playerWin;
            }
            else if(playerSelection == computerSelection) {
                return tie;
            }
            else {
                return computerWin ;
            }
        case "paper":
            if(playerSelection == "scissors") {
                return playerWin;
            }
            else if(playerSelection == computerSelection) {
                return tie
            }
            else {
                return computerWin;
            }
        case "scissors":
            if(playerSelection == "rock") {
                return playerWin
            }
            else if(playerSelection == computerSelection) {
                return tie
            }
            else {
                return computerWin
            }
        default:
            break;
    }
}

function checkWin(winCondition, player) {

}

function game() {
    const winCondition = 3;
    let playerScore = 0;
    let computerScore = 0;
    let roundCount = 0;
    let tiesCount = 0;
    for (;;) {
        let playerSelection = prompt("Throw").toLowerCase();
        let computerSelection = getComputerChoice();
        roundCount += 1;
        console.log("\nRound " + roundCount);
        if(playRound(playerSelection, computerSelection) == 0) {
            playerScore += 1;
            if (playerScore >= winCondition) {
                console.log(`\nPlayer won ${playerScore} to ${computerScore}\nTies: ${tiesCount}`);
                break;
            }
            continue;
        } else if(playRound(playerSelection, computerSelection) == 1) {
            computerScore =+ 1;
            if (computerScore >= winCondition) {
                console.log(`\Computer won ${computerScore} to ${playerScore}\nTies: ${tiesCount}`);
                break;
            }
            continue;
        } else if(playRound(playerSelection, computerSelection) == 2) {
            tiesCount += 1;
            continue;
        }
    }


}