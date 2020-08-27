// This is an app lets you play a rock paper scissors with computer whose
// responses are randomly generated. The game is designed
// to be refreshed every 'x turns. Hope you enjoy. 😊

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
  //Prevent form from submitting
  event.preventDefault();
  // Get the response from input
  const response = input.value.match(/^(rock|paper|scissors)$/i)
    ? input.value.toLowerCase()
    : null;
  //If response is valid call the game function
  if (response) {
    //console.log(resultList.classList[1]);
    if (resultList.classList[1] !== ".no-write") myGame(response);
    //else addWaitMessage();
  } else alert("Please enter rock, paper or scissors");
  input.value = "";
});

//FUNCTIONS

async function myGame(userResponse) {
  //Random response from computer
  const computerResponse = computerPlay();
  //console.log(computerResponse);
  //Create three dots
  await createWaitEffect();
  //Compare the user and computer responses and determine the winner
  const result = compare(userResponse, computerResponse);
  declareWinner(result, userResponse, computerResponse); //Let them know the winner huh 😀
  // Determine the final winner
  //console.log("result: ", result);
  global_winner += result;
  //console.log("winner: ", global_winner);
  global_gameCount++;

  // If game is over declare the winner end restart the game by simply deleting nodes
  if (global_gameCount === parseInt(count.value)) {
    //console.log("game over", global_winner, global_gameCount);
    resultList.classList.toggle(".no-write");
    declareFinalWinner(global_winner);
    restartButton.classList.toggle("hidden");
    restartButton.addEventListener("click", del);
  }
}

//Wait message
function addWaitMessage() {
  const message = document.createElement("h3");
  message.innerText = "Please wait . . .";
  resultList.appendChild(message);
}

//As the name suggest 😆
async function createWaitEffect() {
  let wait = document.createElement("h2");
  resultList.appendChild(wait);
  let i = 3;
  while (i--) {
    await sleep(200);
    wait.innerText += ".   ";
  }
  await sleep(200);
  //console.log(wait.innerText);
  resultList.removeChild(wait);
}

//Append the final winner after 'x' amount of game to the div
function declareFinalWinner(winner) {
  const finalResult = document.createElement("h2");
  if (winner === 0) finalResult.innerText = "No winner!";
  else {
    const winnerString = winner >= 1 ? "you" : "computer";
    finalResult.innerText = `Game over, ${winnerString} won!`;
  }
  resultList.appendChild(finalResult);
  //console.log(finalResult.innerText);
}

//Create an element that declares the winner of the turn on append it to div
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

// Computer plays randomly
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

//Clear div in DOM to play again
function del() {
  //console.log("refreshing...");
  restartButton.classList.toggle("hidden");

  resultBoard.firstElementChild.firstElementChild.innerText = "0";
  resultBoard.firstElementChild.lastElementChild.innerText = "0";
  let i = parseInt(count.value);
  while (i >= 0) {
    resultList.childNodes.forEach((node) => resultList.removeChild(node));
    //resultList.removeChild(resultList.firstElementChild);
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
