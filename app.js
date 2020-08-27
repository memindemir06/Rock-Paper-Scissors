// This is an app lets you play a rock paper scissors with computer whose
// responses are randomly generated. The game is designed
// to be refreshed every 5 turns. Hope you enjoy. 😊

const input = document.querySelector(".inp");
const button = document.querySelector(".btn");
const resultList = document.querySelector(".results");
let global_gameCount = 0;
let global_winner = 0;

//EVENT LISTENER
button.addEventListener("click", (event) => {
  //Prevent form from submitting
  event.preventDefault();
  //prevent writing while deleting

  // Get the response from input
  const response = input.value.match(/^rock|paper|scissors$/i)
    ? input.value.toLowerCase()
    : null;
  //If response is valid call the game function
  if (response) {
    //console.log(resultList.classList[1]);
    if (resultList.classList[1] !== ".no-write") myGame(response);
    else addWaitMessage();
  } else console.log("Please enter rock, paper or scissors");
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
  if (global_gameCount === 5) {
    //console.log("game over", global_winner, global_gameCount);
    declareFinalWinner(global_winner);
    resultList.classList.toggle(".no-write");
    await sleep(5500);
    del(); //Delete the nodes in DOM
    resultList.classList.toggle(".no-write");
    global_gameCount = 0;
    global_winner = 0;
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

//Append the final winner after 5 game to the div
function declareFinalWinner(winner) {
  const finalResult = document.createElement("h3");
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
  const declare = document.createElement("h3");
  let str = "";
  switch (result) {
    case -1:
      str = "You lost 😔";
      break;
    case 1:
      str = "You won! 🥳";
      break;
    default:
      str = "It's a tie 😒";
      break;
  }
  declare.innerText =
    `🤠  ${user.charAt(0).toUpperCase() + user.slice(1)}  🆚  ${
      computer.charAt(0).toUpperCase() + computer.slice(1)
    }  💻` +
    ".   " +
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
  let i = 5;
  while (i >= 0) {
    resultList.childNodes.forEach((node) => resultList.removeChild(node));
    //resultList.removeChild(resultList.firstElementChild);
    i--;
  }
}

//Sleep function for wait effect
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
