/**
 * > Load page; Set up board
 * > Wait for player throw
 * >> Player selects throw
 * >> Computer selects throw
 * >> Compare throws
 * >> Update game state, update game UI
 */

// A couple of enums (The most powerful data structure)

const participants = {
    player: 0,
    computer: 1,
    tie: 2,
}

class GameUI {
    lastPlayerThrow; lastComputerThrow;
    roundCounterContainer; roundCount; maxRounds;
    roundWinner;
    playerScore; computerScore; tieScore;

    constructor() {
        this.lastPlayerThrow = document.getElementById("last-player-throw");
        this.lastComputerThrow = document.getElementById("last-computer-throw");
        this.roundCounterContainer = document.getElementById("round-counter-container");
        this.roundCount = document.getElementById("round-count");
        this.maxRounds = document.getElementById("max-rounds");
        this.roundWinner = document.getElementById("round-winner");
        this.playerScore = document.getElementById("player-score");
        this.computerScore = document.getElementById("computer-score");
        this.tieScore = document.getElementById("tie-score");
    }
    setLastPlayerThrow = (playerThrow) => 
        this.lastPlayerThrow.innerText = playerThrow;
    setLastComputerThrow = (computerThrow) =>
        this.lastComputerThrow.innerText = computerThrow;
    
    setFreePlay = () => {
        this.roundCounterContainer.innerText = "Free Play"
    }
    setRoundCount = (roundCount) =>
        this.roundCount.innerText = roundCount;
    setMaxRounds = (maxRounds) =>
        this.maxRounds.innerText = maxRounds;

    setRoundWinner = (roundWinner) =>
        this.roundWinner.innerText = roundWinner;

    setPlayerScore = (playerScore) =>
        this.playerScore.innerText = playerScore;
    setComputerScore = (computerScore) =>
        this.computerScore.innerText = computerScore;
    setTieScore = (tieScore) =>
        this.tieScore.innerText = tieScore;
}

// > Game statistics
class Game {
    lastPlayerThrow; lastComputerThrow;
    roundCount; maxRounds;
    roundWinner;
    playerScore; computerScore; tieScore;
    userInterface;
    throws = {
        rock: 0,
        paper: 1,
        scissors: 2,
    };
    participants = {
        player: 0,
        computer: 1,
        tie: 2,
    }
    isFreePlay;

    // Game Defaults
    constructor() {
        this.lastPlayerThrow = "No throw";
        this.lastComputerThrow = "No throw";
        this.roundCount = 0;
        this.maxRounds = 5;
        this.roundWinner = "na";
        this.playerScore = 0;
        this.computerScore = 0;
        this.tieScore = 0;
        this.isFreePlay = false;

        this.userInterface = new GameUI();
        this.incrementRoundCount();
        this.userInterface.setMaxRounds(this.maxRounds);
    }

    incrementRoundCount = () => {
        this.roundCount += 1;
        this.userInterface.setRoundCount(this.roundCount);
    }

    setLastThrows = (playerThrow, computerThrow) => {
        let isPlayerThrowSet = false, isComputerThrowSet = false;
        Object.keys(this.throws).forEach( throwName => {
            // For exiting quicker if throws are already set.
            if(isPlayerThrowSet && isComputerThrowSet) return;

            // Set last throws, and set 
            if(playerThrow == this.throws[throwName]) {
                this.lastPlayerThrow = throwName;
                isPlayerThrowSet = true;
            }
            if(computerThrow == this.throws[throwName]) {
                this.lastComputerThrow = throwName;
                isComputerThrowSet = true;
            }
            // For faster exit
        });

        // Update UI
        this.userInterface.setLastPlayerThrow(this.lastPlayerThrow);
        this.userInterface.setLastComputerThrow(this.lastComputerThrow);
    }

    determineRoundWinner(playerThrow, computerThrow) {
        // Will update this function to use forEach() in the future
        let thisRoundWinner = "na"

        // Determine winner off of computer's throw
        if(computerThrow == this.throws.rock) {
            switch(playerThrow) {
                case this.throws.rock:
                    thisRoundWinner = participants.tie;
                    break;
                case this.throws.paper:
                    thisRoundWinner = participants.player;
                    break;
                case this.throws.scissors:
                    thisRoundWinner = participants.computer;
                    break;
                default: 
                    alert("Player: Invalid Throw");
                    thisRoundWinner = -1;
                    break;
            }
        }
        else if(computerThrow == this.throws.paper) {
            switch(playerThrow) {
                case this.throws.rock:
                    thisRoundWinner = participants.computer;
                    break;
                case this.throws.paper:
                    thisRoundWinner = participants.tie;
                    break;
                case this.throws.scissors:
                    thisRoundWinner = participants.player;
                    break;
                default: 
                    alert("Player: Invalid Throw");
                    thisRoundWinner = -1;
                    break;
            }
        }
        else if (computerThrow == this.throws.scissors) {
            switch(playerThrow) {
                case this.throws.rock:
                    thisRoundWinner = participants.player;
                    break;
                case this.throws.paper:
                    thisRoundWinner = participants.computer;
                    break;
                case this.throws.scissors:
                    thisRoundWinner = participants.tie;
                    break;
                default:
                    alert("Player: Invalid Throw");
                    thisRoundWinner = -1;
                    break;
            }
        }
        else {
            alert("Player: Invalid Throw");
            thisRoundWinner = -1;
        }

        Object.keys(participants).forEach(participant => {
            if(thisRoundWinner == participants[participant]) {
                this.roundWinner = participant;
                this.userInterface.setRoundWinner(participant);

                switch (participant) {
                    case "player":
                        this.playerScore += 1;
                        this.userInterface.setPlayerScore(this.playerScore);
                        break;
                    case "computer":
                        this.computerScore += 1;
                        this.userInterface.setComputerScore(this.computerScore);
                    case "tie":
                        this.tieScore += 1;
                        this.userInterface.setTieScore(this.tieScore);
                        break;
                }

                return;
            }
        });
    }

    determineGameWinner() {
        if (this.playerScore > this.computerScore && this.playerScore > this.tieScore) {
            document.getElementById("game-winner").innerText = "Player";
        } else if (this.computerScore > this.playerScore && this.computerScore > this.tieScore) {
            document.getElementById("game-winner").innerText = "Computer";
        } else {
            document.getElementById("game-winner").innerText = "Tie";
        }
        document.getElementById("announcer").showModal();
        document.getElementById("close-announcer").addEventListener("click", () => {
            document.getElementById("announcer").close();
        });
        document.getElementById("reset-game").addEventListener("click", () => window.location.reload());
        this.setFreePlay();
        this.userInterface.setFreePlay();
    }

    setFreePlay = () => {
        this.isFreePlay = true;
    }

    playRound = (playerThrow) => {
        if(!this.isFreePlay) {
            this.incrementRoundCount();
        }
        let computerThrow = Math.floor(Math.random() * Object.keys(this.throws).length);
        this.setLastThrows(playerThrow, computerThrow);
        this.determineRoundWinner(playerThrow, computerThrow);

        if (this.roundCount >= this.maxRounds && !this.isFreePlay) {
            this.determineGameWinner();
        }
    }
}

export { Game }