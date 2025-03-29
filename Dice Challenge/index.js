function getRandomDiceImage() {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    return {
        number: randomNumber,
        image: "images/dice" + randomNumber + ".png"
    };
}

function rollDice() {
    let player1 = getRandomDiceImage();
    let player2 = getRandomDiceImage();

    document.getElementById("img1").src = player1.image;
    document.getElementById("img2").src = player2.image;

    let winnerText = document.getElementById("winner-text");

    if (player1.number > player2.number) {
        winnerText.textContent = "🚩 Player 1 Wins!";
    } else if (player1.number < player2.number) {
        winnerText.textContent = "Player 2 Wins! 🚩";
    } else {
        winnerText.textContent = "It's a Draw! 🎲";
    }
}

document.getElementById("roll-dice").addEventListener("click", rollDice);
