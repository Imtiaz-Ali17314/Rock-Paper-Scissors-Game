let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetBtn = document.querySelector("#reset-btn");

// Optimized winning logic mapping
const winMap = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper"
};

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * 3)];
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `Win! ✨ ${userChoice.toUpperCase()} beats ${compChoice}`;
    msg.style.backgroundColor = "#10b981";
    msg.style.boxShadow = "0 0 20px rgba(16, 185, 129, 0.4)";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `Loss 💀 ${compChoice.toUpperCase()} beats ${userChoice}`;
    msg.style.backgroundColor = "#ef4444";
    msg.style.boxShadow = "0 0 20px rgba(239, 68, 68, 0.4)";
  }
};

const playGame = (userChoice) => {
  // Visual feedback on click
  const clickedElement = document.getElementById(userChoice);
  clickedElement.style.transform = "scale(0.95)";
  setTimeout(() => (clickedElement.style.transform = ""), 150);

  const compChoice = genCompChoice();

  // Show reset button on first move
  if (resetBtn.classList.contains("hidden")) {
    resetBtn.classList.remove("hidden");
  }

  if (userChoice === compChoice) {
    msg.innerText = "It's a Draw! 🤝 Try again.";
    msg.style.backgroundColor = "#f59e0b";
    msg.style.boxShadow = "0 0 20px rgba(245, 158, 11, 0.4)";
  } else {
    const userWin = winMap[userChoice] === compChoice;
    showWinner(userWin, userChoice, compChoice);
  }
};

const resetGame = () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = "0";
  compScorePara.innerText = "0";
  msg.innerText = "Choose Your Move";
  msg.style.backgroundColor = "var(--bg-card)";
  msg.style.boxShadow = "none";
  resetBtn.classList.add("hidden");
};

resetBtn.addEventListener("click", resetGame);

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
