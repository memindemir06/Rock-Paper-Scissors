// This is an app lets you play a rock paper scissors with computer whose
// responses are randomly generated. The game is designed
// to be refreshed after selected turn count. Hope you enjoy. 😊

const input = document.querySelector(".inp");
const button = document.querySelector(".btn");
const count = document.querySelector("#count");
const resultList = document.querySelector(".results");
const resultBoard = document.querySelector(".board");
const restartButton = document.querySelector(".restart");
let global_gameCount = 0;
let global_winner = 0;

//EVENT LISTENER
button.addEventListener("click", (event) => {
  // Prevent form from submitting
  event.preventDefault();
  // Get the response from input and check validity
  const response = input.value.match(/^(rock|paper|scissors)$/i)
    ? input.value.toLowerCase()
    : null;
  // If response is valid call the play the game
  if (response) {
    if (resultList.classList[1] !== ".no-write") myGame(response);
  } else {
    glowEffect(); // A red glow effect for invalid input
  }
  input.value = ""; // Refresh the input box
});

//FUNCTIONS

async function myGame(userResponse) {
  //Generate random response
  const computerResponse = computerPlay();
  //Create three dots for a while for loading effect
  await createWaitEffect();
  //Compare the user and computer responses and determine the winner
  const result = compare(userResponse, computerResponse);
  declareWinner(result, userResponse, computerResponse); //Declare the winner in the HTML
  global_winner += result; //Update the variable to determine the winner at the end of the game
  global_gameCount++; //Update the variable to keep track of played turns

  // If game is over declare the winner and add a restart
  //button to restart the game by simply deleting existing nodes
  if (global_gameCount === parseInt(count.value)) {
    resultList.classList.toggle(".no-write");
    declareFinalWinner(global_winner);
    restartButton.classList.toggle("hidden");
    restartButton.addEventListener("click", del);
  }
}

//Glow Effect for Invalid Input
async function glowEffect() {
  input.classList.toggle("glow-red");
  await sleep(500);
  input.classList.toggle("glow-red");
}

//As the name suggests...
async function createWaitEffect() {
  let wait = document.createElement("h2");
  resultList.appendChild(wait);
  let i = 3;
  while (i--) {
    await sleep(200);
    wait.innerText += ". ";
    wait.innerText += " ";
  }
  await sleep(200);
  resultList.removeChild(wait);
}

//Declare the final winner in the page after given amount of turns
function declareFinalWinner(winner) {
  const finalResult = document.createElement("h2");
  if (winner === 0) finalResult.innerText = "No winner!";
  else {
    const winnerString = winner >= 1 ? "you" : "computer";
    finalResult.innerText = `Game over, ${winnerString} won!`;
  }
  resultList.appendChild(finalResult);
}

//Create an element that declares the winner of the turn and append it to the page
function declareWinner(result, user, computer) {
  let uCount = parseInt(
    resultBoard.firstElementChild.firstElementChild.innerText
  );
  let cCount = parseInt(
    resultBoard.firstElementChild.lastElementChild.innerText
  );
  const declare = document.createElement("h3");
  let str = "";
  switch (result) {
    case -1:
      cCount++;
      str = "You lost 😔";
      break;
    case 1:
      uCount++;
      str = "You won! 🥳";
      break;
    default:
      str = "It's a tie 😒";
      break;
  }
  resultBoard.firstElementChild.firstElementChild.innerText = uCount;
  resultBoard.firstElementChild.lastElementChild.innerText = cCount;
  declare.innerText =
    `🤠  ${user.charAt(0).toUpperCase() + user.slice(1)}  🆚  ${
      computer.charAt(0).toUpperCase() + computer.slice(1)
    }  💻` +
    ". " +
    "  " +
    str;
  resultList.appendChild(declare);
}

// Compare responses and determine who won
function compare(user, computer) {
  if (user === computer) return 0;
  // Tie
  else if (
    (user === "rock" && computer === "paper") ||
    (user === "paper" && computer === "scissors") ||
    (user === "scissors" && computer === "rock")
  ) {
    //User lost
    return -1;
  } else return 1; //User won
}

// Generate random response
function computerPlay() {
  const rand = Math.floor(Math.random() * 3);
  switch (rand) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissors";
    default:
      console.log("error");
      break;
  }
}

// Clear div in DOM to play again
function del() {
  restartButton.classList.toggle("hidden");
  resultBoard.firstElementChild.firstElementChild.innerText = "0";
  resultBoard.firstElementChild.lastElementChild.innerText = "0";
  let i = parseInt(count.value);
  while (i >= 0) {
    resultList.childNodes.forEach((node) => resultList.removeChild(node));
    i--;
  }
  global_gameCount = 0;
  global_winner = 0;
  resultList.classList.toggle(".no-write");
}

//Sleep function for wait effect
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
