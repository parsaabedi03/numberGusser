let randomNumber = Math.floor(Math.random() * 100) + 1;

const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const priviousGuessesShow = document.querySelector(".priviousGuesses");
const previousGuessesList = document.getElementById("previousGuessesList");
const resultMessage = document.getElementById("resultMessage");
const resetGame = document.getElementById("resetGame");

let record = 1;
const priviousGuesses = [];

const handleClick = () => {
  resultMessage.classList.remove("d-none");
  guessInput.focus();
  if (
    guessInput.value === "" ||
    guessInput.value <= 1 ||
    guessInput.value >= 100
  ) {
    alert("Please enter a number between 1 and 100.");
    return;
  }

  if (record > 9) {
    guessInput.disabled = true;
    guessButton.disabled = true;
    resultMessage.textContent = `Game over! You've exceeded the maximum number of attempts. The correct number was ${randomNumber}.`;
    resetGame.classList.remove("d-none");
  } else if (randomNumber == guessInput.value) {
    resultMessage.textContent = `Congratulations! You've guessed the number ${randomNumber} in ${record} attempts.`;
    resultMessage.classList.remove("d-none");
    guessInput.disabled = true;
    guessButton.disabled = true;
    resetGame.classList.remove("d-none");
    return;
  } else if (randomNumber > guessInput.value) {
    resultMessage.textContent = "Your guess is too low.";
  } else {
    resultMessage.textContent = "Your guess is too high.";
  }

  record++;
  priviousGuessesShow.classList.remove("d-none");
  priviousGuesses.push(guessInput.value);
  handlePriviousGuesses();
  guessInput.value = "";
};

const handlePriviousGuesses = () => {
  previousGuessesList.innerHTML = "";
  priviousGuesses.forEach((guess) => {
    const listItem = document.createElement("li");
    listItem.textContent = guess;
    previousGuessesList.appendChild(listItem);
  });
};

const handleResetGame = () => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  guessInput.focus();
  guessInput.value = "";
  guessInput.disabled = false;
  guessButton.disabled = false;
  resultMessage.classList.add("d-none");
  priviousGuessesShow.classList.add("d-none");
  previousGuessesList.innerHTML = "";
  record = 1;
  priviousGuesses.length = 0;
  resetGame.classList.add("d-none");
};

resetGame.addEventListener("click", handleResetGame);
guessButton.addEventListener("click", handleClick);
