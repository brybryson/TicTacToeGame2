// Event listener for "Easy AI" button
document.getElementById('easy-ai').addEventListener('click', function (event) {
    // Prevent the default behavior of the link
    event.preventDefault();

    // Show the notification with redirection to "ai-easy-game-2.html"
    showNotification('AI difficulty: Easy', 'ai-easy-game-2.html');
});

// Event listener for "Difficult AI" button
document.getElementById('difficult-ai').addEventListener('click', function (event) {
    // Prevent the default behavior of the link
    event.preventDefault();

    // Show the notification with redirection to "ai-difficult-game-3.html"
    showNotification('AI difficulty: Difficult', 'ai-difficult-game-3.html');
});

// Event listener for "Expert AI" button
document.getElementById('expert-ai').addEventListener('click', function (event) {
    // Prevent the default behavior of the link
    event.preventDefault();

    // Show the notification with redirection to "ai-expert-game-2.html"
    showNotification('AI difficulty: Expert', 'ai-expert-game-2.html');
});

// Function to show the notification with dynamic href attribute
function showNotification(message, redirectURL) {
    document.getElementById('notification-content').textContent = message;
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('notification').style.display = 'block';

    // Update the href attribute of the "Play" button
    document.getElementById('play-link').setAttribute('href', redirectURL);

    // Event listener for "Play" button in the notification
    document.getElementById('play-button').addEventListener('click', function () {
        // Redirect to the specified URL or perform other actions
        window.location.href = redirectURL;
    });
}

// Event listener for "Play" button in the notification (moved outside the showNotification function)
document.getElementById('play-button').addEventListener('click', function () {
    // Redirect to "ai-easy-game-2.html" or perform other actions
    window.location.href = "ai-easy-game-2.html";
});

// Event listener for "Cancel" button in the notification
document.getElementById('cancel-btn').addEventListener('click', function () {
    // Hide the notification on cancel
    hideNotification();
});
