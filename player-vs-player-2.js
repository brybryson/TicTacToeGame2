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

            if (checkWinner()) {
                // A player has won, handle the scoring, and check for the game over condition
                updateScores();

                if (playerXScore === 5 || playerOScore === 5) {
                    showNotification(`Game Over! X (${playerXScore}) - O (${playerOScore})`);
                    activateConfetti();
                } else {
                    // Delay the board reset by 1 second
                    setTimeout(() => {
                        resetBoard();
                    }, 1000);
                }
            } else if (gameBoard.every(cell => cell !== "")) {
                // It's a tie, reset the board
                resetBoard();
            } else {
                // Switch to the next player
                currentPlayer = currentPlayer === "X" ? "O" : "X";
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
            showNotification(`Game Over! Final Score: X (${playerXScore}) - O (${playerOScore})`);
            activateConfetti();
            // You might want to add a play again logic or redirect to a new game.
            // Reset the scores to 0 for a new game
            playerXScore = 0;
            playerOScore = 0;
            updateScores();
        }
    }
    // Function to show notification
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
        });

        const notificationContainer = document.getElementById("notification-container");
        const playAgainBtn = document.getElementById("play-again-btn");
        const overlay = document.getElementById("overlay");

        notificationContainer.style.display = "none";
        playAgainBtn.style.display = "none";
        overlay.style.display = "none";
    }

     // ETO BRI ANG SAGOT
     function checkWinner() {
        const winningCombos = [
            [0, 1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11], [12, 13, 14, 15, 16, 17], // horizontal 1
            [18, 19, 20, 21, 22, 23], [24, 25, 26, 27, 28, 29], // horizontal 2
            [0, 6, 12, 18, 24], [1, 7, 13, 19, 25], [2, 8, 14, 20, 26], [3, 9, 15, 21, 27], [4, 10, 16, 22, 28], [5, 11, 17, 23, 29], [1, 6], [0, 7, 14, 21, 28], [12, 19, 26], [6, 13, 20, 27], [18, 25], [18, 13, 8, 3], [12, 7, 2], [24, 19, 14, 9, 4], [5, 10, 15, 20, 25], [11, 16, 21, 26],
            [17, 22, 27], [23, 28], [1, 8, 15, 22, 29], [23, 16, 9, 2], [17, 10, 3], [11, 4] // vertical
        ];

        for (const combo of winningCombos) {
            if (isComboWin(combo)) {
                highlightWinningCells(combo);

                const winningPlayer = currentPlayer === "X" ? "O" : "X";

                if (winningPlayer === "X") {
                    playerXScore++;
                } else {
                    playerOScore++;
                }

                updateScores();

                if (playerXScore === 5 || playerOScore === 5) {
                    showNotification(`Game Over! Final Score: X (${playerXScore}) - O (${playerOScore})`);
                    activateConfetti();
                }

                setTimeout(() => {
                    resetBoard();
                }, 1000);
                return true;
            }
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

    function resetBoard() {
        gameBoard = Array.from({ length: 30 }, () => "");
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("x", "o");
            cell.style.backgroundColor = "";
        });
    }

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
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
});

// function redirectToTicTacToePlayer() {
// Redirect to tic-tac-toe.html
// window.location.href = 'tic-tac-toe.html';
// }

function redirectToIndex() {
// Redirect to index.html
window.location.href = 'index.html';
}