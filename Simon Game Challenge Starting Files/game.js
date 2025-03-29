let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// Start the game when a key is pressed
document.addEventListener("keydown", function () {
    if (!started) {
        document.getElementById("level-title").innerText = "Level " + level;
        nextSequence();
        started = true;
    }
});

// Detect button clicks
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function () {
        let userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    });
});

// Generate the next sequence
function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById("level-title").innerText = "Level " + level;

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    setTimeout(() => {
        playSequence();
    }, 500);
}

// Play the sequence for the player
function playSequence() {
    gamePattern.forEach((color, index) => {
        setTimeout(() => {
            animatePress(color);
            playSound(color);
        }, index * 600);
    });
}

// Check the player's answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        playSound("wrong");
        document.body.classList.add("game-over");
        document.getElementById("level-title").innerText = "Game Over! Press Any Key to Restart";

        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 200);

        startOver();
    }
}

// Play sound based on color
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Animate button press
function animatePress(currentColor) {
    let button = document.getElementById(currentColor);
    button.classList.add("pressed");
    setTimeout(() => {
        button.classList.remove("pressed");
    }, 100);
}

// Reset the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
