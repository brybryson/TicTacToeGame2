document.addEventListener('DOMContentLoaded', function () {
    // Function to play button click sound and show custom alert
    function playButtonClickAndSound() {
        playButtonClickSound();
        playAlertSound();
        showCustomAlert();
        // Delay the redirection to allow time for other actions
        setTimeout(redirectToMechanicsPage, 500);
    }

    // Function to play button click sound
    function playButtonClickSound() {
        var clickSound = document.getElementById('clickSound');
        clickSound.currentTime = 0; // Reset sound to beginning
        clickSound.play();
    }

    // Function to play alert sound
    function playAlertSound() {
        var audio = new Audio('alert-sound.mp3');
        audio.play();
    }

    // Your existing code for showCustomAlert and hideCustomAlert
    function showCustomAlert() {
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('customAlert').style.display = 'block';
    }

    function hideCustomAlert() {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('customAlert').style.display = 'none';
    }

    // Function to redirect to mechanics-2.html
    function redirectToMechanicsPage() {
        // Redirect to mechanics-2.html
        window.location.href = "mechanics-2.html";
    }

    // Add event listeners to all buttons
    var buttons = document.querySelectorAll('button');
    buttons.forEach(function (button) {
        button.addEventListener('click', playButtonClickAndSound);
    });
});
