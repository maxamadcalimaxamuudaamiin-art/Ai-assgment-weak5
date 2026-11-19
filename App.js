// Choices stored in an array
const choices = ["rock", "paper", "scissors"];

// Emoji lookup for display
const emojis = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️"
};

// Object tracking the current score
const score = {
  player: 0,
  computer: 0
};

// DOM elements
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const turnEl = document.getElementById("turn-indicator");
const resultEl = document.getElementById("result");
const playerHandEl = document.getElementById("player-hand");
const computerHandEl = document.getElementById("computer-hand");
const choiceButtons = document.querySelectorAll(".choice-btn");
const resetBtn = document.getElementById("reset-btn");

// Pick a random choice from the array
function getComputerChoice() {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

// Decide the winner using if/else conditionals
function getWinner(player, computer) {
  if (player === computer) {
    return "tie";
  } else if (player === "rock") {
    if (computer === "scissors") {
      return "player";
    } else {
      return "computer";
    }
  } else if (player === "paper") {
    if (computer === "rock") {
      return "player";
    } else {
      return "computer";
    }
  } else {
    // player is scissors
    if (computer === "paper") {
      return "player";
    } else {
      return "computer";
    }
  }
}

function setButtonsDisabled(disabled) {
  choiceButtons.forEach(function (btn) {
    btn.disabled = disabled;
  });
}

function updateScore() {
  playerScoreEl.textContent = score.player;
  computerScoreEl.textContent = score.computer;
}

function playRound(playerChoice) {
  // Player's turn is over, now it's the computer's turn
  setButtonsDisabled(true);
  resultEl.textContent = "\u00A0";
  resultEl.className = "result";
  playerHandEl.textContent = emojis[playerChoice];
  computerHandEl.textContent = "❔";

  turnEl.textContent = "Computer is choosing...";
  turnEl.classList.add("computer-turn");

  playerHandEl.classList.add("shake");
  computerHandEl.classList.add("shake");

  // Short delay so the computer's turn feels real
  setTimeout(function () {
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);

    computerHandEl.textContent = emojis[computerChoice];
    playerHandEl.classList.remove("shake");
    computerHandEl.classList.remove("shake");

    if (winner === "player") {
      score.player++;
      resultEl.textContent = "You win this round! 🎉";
      resultEl.classList.add("win");
    } else if (winner === "computer") {
      score.computer++;
      resultEl.textContent = "Computer wins this round! 🤖";
      resultEl.classList.add("lose");
    } else {
      resultEl.textContent = "It's a tie! 🤝";
      resultEl.classList.add("tie");
    }

    updateScore();

    // Back to the player's turn
    turnEl.textContent = "Your turn! Pick one.";
    turnEl.classList.remove("computer-turn");
    setButtonsDisabled(false);
  }, 700);
}

// Wire up the buttons
choiceButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    playRound(btn.dataset.choice);
  });
});

// Reset the game
resetBtn.addEventListener("click", function () {
  score.player = 0;
  score.computer = 0;
  updateScore();
  playerHandEl.textContent = "❔";
  computerHandEl.textContent = "❔";
  resultEl.textContent = "\u00A0";
  resultEl.className = "result";
  turnEl.textContent = "Your turn! Pick one.";
  turnEl.classList.remove("computer-turn");
  setButtonsDisabled(false);
});