let confettiTriggered = false;
let particles = []; // Moved the particles array outside of the function to clear it properly

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("tic-tac-toe");
    const cells = [];

    let currentPlayer = "X";
    let gameBoard = Array.from({ length: 30 }, () => "");
    let playerXScore = 0;
    let playerOScore = 0;

    // Create the Tic-Tac-Toe grid
    for (let i = 0; i < 30; i++) {
        const cell = document.createElement("div");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        cells.push(cell);
        board.appendChild(cell);
    }


function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (gameBoard[index] === "" && !checkWinner()) {
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        // Add class to set color based on the player
        cells[index].classList.add(currentPlayer.toLowerCase());

       if (gameBoard.every(cell => cell !== "")) {
            showNotification("IT'S A TIE!");
            // Reset the board for a new game
            resetBoard();
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            playAgainstBot();
            checkWinner();
        }

        
    }
}
function updateScores() {
    const playerXScoreElement = document.getElementById("player-x-score");
    const playerOScoreElement = document.getElementById("player-o-score");

    // Assuming you have variables playerXScore and playerOScore, update the content:
    playerXScoreElement.querySelector('.score-value').textContent = playerXScore;
    playerOScoreElement.querySelector('.score-value').textContent = playerOScore;

    // Check if either player has won
    if (playerXScore === 5 || playerOScore === 5) {
        showNotification(`Final Score: X (${playerXScore}) - O (${playerOScore})`);
        // You might want to add a play again logic or redirect to a new game.
        // Reset the scores to 0 for a new game
        playerXScore = 0;
        playerOScore = 0;
        updateScores();
    }
}


    // Function to show notification
    function showNotification(message) {
        const notificationContainer = document.getElementById("notification-container");
        const notificationContent = document.getElementById("notification-content");
        const overlay = document.getElementById("overlay");

        notificationContent.textContent = message;
        notificationContainer.style.display = "block";
        overlay.style.display = "block";

        // Show the "Play Again" button
        const playAgainBtn = document.getElementById("play-again-btn");
        playAgainBtn.style.display = "block";
    }

        // Function to play again (reset the game)
    function playAgain() {
        // Reset the game state, hide notification, and hide the "Play Again" button
        gameBoard = Array.from({ length: 30 }, () => "");
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("x", "o");
            cell.style.backgroundColor = "";


            //RESET
            playerXScore = 0;
            playerOScore = 0;
         
        });

        const notificationContainer = document.getElementById("notification-container");
        const playAgainBtn = document.getElementById("play-again-btn");
        const overlay = document.getElementById("overlay");

        notificationContainer.style.display = "none";
        playAgainBtn.style.display = "none";
        overlay.style.display = "none";

        // Redirect to landing.html
        // playAgainBtn.href = "landing.html"; 
    }


    // Function to check if the player or bot wins
    // ETO BRI ANG SAGOT
    function checkWinner() {
       const winningCombos = [
            [0, 1, 2, 3, 4, 5,], [6, 7, 8, 9, 10, 11], [12, 13, 14, 15, 16, 17], // horizontal 1
            [18, 19, 20, 21, 22, 23], [24, 25, 26, 27, 28, 29], // horizontal 2
            [0, 6, 12, 18, 24], [1, 7, 13, 19, 25], [2, 8, 14, 20, 26], [3, 9, 15, 21, 27], [4, 10, 16, 22, 28], [5, 11, 17, 23, 29], [1, 6], [0, 7, 14, 21, 28], [12, 19, 26], [6, 13, 20, 27], [18, 25], [18, 13, 8, 3], [12, 7, 2], [24, 19, 14, 9, 4], [5, 10, 15, 20, 25], [11, 16, 21, 26],
            [17, 22, 27,], [23, 28], [1, 8, 15, 22, 29], [23, 16, 9, 2], [17, 10, 3], [11, 4] // vertical
        ];
            
        for (const combo of winningCombos) {
            if (isComboWin(combo)) {
                highlightWinningCells(combo);

                const winningPlayer = currentPlayer === "X" ? "O" : "X";

                if (winningPlayer === "X") {
                    playerXScore++;
                    highlightWinningCells(combo);
                } else {
                    playerOScore++;
                    highlightWinningCells(combo);
                }

                updateScores();

                if (playerXScore === 5 || playerOScore === 5) {
                showNotification(`Game Over! X (${playerXScore}) - O (${playerOScore})`);
                activateConfetti();
                }

                setTimeout(() => {
                    resetBoard();
                }, 1000);
                return true;
            }
            // Move the score update here
     
        }
  

        return false;
    }

    function isComboWin(combo) {
        const values = combo.map(index => gameBoard[index]);
        return values.every(value => value !== "" && value === values[0]);
    }

    // Function to highlight winning cells
    function highlightWinningCells(winningCombo) {
        for (const index of winningCombo) {
            cells[index].style.backgroundColor = "lightgreen";
        }
    }
// Function to play against the bot

let botCanMove = true;

function playAgainstBot() {
    // Function to handle the bot move
    function makeBotMove(botMove) {

        //check if d bot can move
        if (!botCanMove){
            return;
        }
        botCanMove = false;
        gameBoard[botMove] = currentPlayer;
        cells[botMove].textContent = currentPlayer;

        // Add class to set color based on the player
        cells[botMove].classList.add(currentPlayer.toLowerCase());

            currentPlayer = currentPlayer === "X" ? "O" : "X";
            setTimeout(() => {
                botCanMove = true;
                playAgainstBot();  // Continue playing against the bot after a delay
            },200);
        
    }

    if (currentPlayer === "O" && !checkWinner()) {
        let emptyCells = gameBoard.reduce((acc, cell, index) => {
            if (cell === "") {
                acc.push(index);
            }
            return acc;
        }, []);

        // Define an array of winning combinations to check
        const winningCombos = [
            [0, 1, 2, 3, 4, 5,], [6, 7, 8, 9, 10, 11], [12, 13, 14, 15, 16, 17], // horizontal 1
            [18, 19, 20, 21, 22, 23], [24, 25, 26, 27, 28, 29], // horizontal 2
            [0, 6, 12, 18, 24], [1, 7, 13, 19, 25], [2, 8, 14, 20, 26], [3, 9, 15, 21, 27], [4, 10, 16, 22, 28], [5, 11, 17, 23, 29], [1, 6], [0, 7, 14, 21, 28], [12, 19, 26], [6, 13, 20, 27], [18, 25], [18, 13, 8, 3], [12, 7, 2], [24, 19, 14, 9, 4], [5, 10, 15, 20, 25], [11, 16, 21, 26],
            [17, 22, 27,], [23, 28], [1, 8, 15, 22, 29], [23, 16, 9, 2], [17, 10, 3], [11, 4] // vertical
        ];

        // Check for potential winning moves by the user and block them
        for (const combo of winningCombos) {
            const userCells = combo.filter(index => gameBoard[index] === "X");
            const emptyCellInCombo = combo.find(index => gameBoard[index] === "");

            if (userCells.length === combo.length - 1 && emptyCellInCombo !== undefined) {
                // User is about to win, block the move
                const botMove = emptyCellInCombo;
                setTimeout(() => makeBotMove(botMove), 200);
                return;
            }
        }

        // Define an array of conditions to check
        const conditions = [
            { player: "X", from: 4, to: 11 },
            { player: "X", from: 11, to: 4 },
            { player: "X", from: 18, to: 25 },
            { player: "X", from: 25, to: 18 },
            { player: "X", from: 23, to: 28 },
            { player: "X", from: 28, to: 23 },
            { player: "X", from: 1, to: 6 },
            { player: "X", from: 6, to: 1 },
        ];

        // Check if any of the conditions is met
        const conditionMet = conditions.some(({ player, from, to }) => gameBoard[from] === player && gameBoard[to] === "");

        if (conditionMet) {
            // If condition is met, execute the corresponding move after a delay
            const matchingCondition = conditions.find(({ player, from, to }) => gameBoard[from] === player && gameBoard[to] === "");
            const botMove = matchingCondition.to;
            setTimeout(() => makeBotMove(botMove), 200);
        } else {
            // Bot makes a random move after a 200ms delay
            setTimeout(() => {
                const botMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                makeBotMove(botMove);
            }, 200);
        }
    }
}

// Initialize the game
playAgainstBot();
    
    let confettiTriggered = false;
    // Function to activate confetti effect
    function activateConfetti() {
        // Check if confetti has already been triggered
        if (confettiTriggered) {
            return;
        }

        // Set the flag to true to indicate confetti has been triggered
        confettiTriggered = true;

         // Clear the particles array before initializing confetti
         particles = [];
    
        // Get the confetti canvas element
        const confettiCanvas = document.getElementById("canvas");

        // Set the confetti canvas to visible
        confettiCanvas.style.display = "block";
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;

        // Execute confetti animation
        initConfetti();
        render();
}
function resetBoard() {
    gameBoard = Array.from({ length: 30 }, () => "");
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
        cell.style.backgroundColor = "";
    });
}
// Define the confetti particles array
let particles = [];

// Function to initialize confetti
function initConfetti() {
    // Create confetti particles and add them to the particles array
    for (let i = 0; i < 200; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,   // Random X position
            y: Math.random() * -100,  // Start from top and move downwards
            size: (Math.random() * 10) + 1,          // Random particle size (at least 15px)
            color: getRandomColor(),                // Random color
            speed: Math.random() * 5 + 1            // Random speed
    
        });
    }
}

// Function to render confetti particles
function render() {
    // Your rendering logic here, update particle positions, etc.
    // This is a simple example, you might need to adjust it based on your confetti library
    const confettiCanvas = document.getElementById("canvas");
    const context = confettiCanvas.getContext("2d");

    // Clear the canvas
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Draw and update each confetti particle
    particles.forEach((particle) => {
        context.beginPath();
        context.fillStyle = particle.color;
        context.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
        context.fill();

        // Update particle position for the next frame
        particle.y += particle.speed; // Move downwards

        // Reset particle position if it goes off the screen
        if (particle.y > window.innerHeight) {
            particle.y = Math.random() * -100; // Start from top again
        }
    });

    // Request the next animation frame
    requestAnimationFrame(render);
}

// Function to get a random color
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
});
