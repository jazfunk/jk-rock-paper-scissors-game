const WAVE_IMG = '<img id="wave-png" src="images/wave.png">';
const FIST_IMG = '<img id="fist-png" src="images/fist.png">';
const ROCK_IMG = '<img id="rock-png" src="images/rock.png">';
const PAPER_IMG = '<img id="paper-png" src="images/paper.png">';
const SCISSORS_IMG = '<img id="scissors-png" src="images/scissors.png">';
const EMPTY_IMG = '<img id="empty-png" src="images/empty.png">';
const DEFAULT_CELL_COLOR = "#F4F4F4";
const RESET_INTERVAL = 1500;
const tool_ids = ['R', 'P', 'S'];
let locked = false;
let userName = '';
let cpuName = 'CPU';
let cpuScore = 0;

window.onload = function (e) {
  this.getUser();
  introRoll();
};

document
  .getElementById("clear-local")
  .addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.clear();
    location.reload(true);
  });

document
  .getElementById("page-action-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    introRoll();
  });

document
  .querySelector(".main-table")
  .addEventListener("click", function (e) {
    e.preventDefault();
    if (locked) {
      return;
    }
    locked = true;
    controlPanelClickHandler(e.target.parentElement.id)
  });

function controlPanelClickHandler(toolClicked) {
  switch (toolClicked) {
    case "user-rock":
    case "user-fist":
      playGame("R");
      break;
    case "user-paper":
    case "user-wave":
      playGame("P");
      break;
    case "user-scissors":
      playGame("S");
      break;
    default:
      locked = false;
  }
}

document.addEventListener("keyup", (e) => {
  if (locked) {
    return;
  }
  switch (e.which) {
    case 80:
      playGame("P");
      break;
    case 82:
      playGame("R");
      break;
    case 83:
      playGame("S");
      break;
  }
}, false);

function getUser() {
  getLocalStorage();

  if (userName === "" || userName === null) {
    userName = prompt("Enter your name", "Player 1");
    if (userName.length > 15) {
      alert("Name entered is too long.  Limit 15 characters.")
      userName = "Player 1";
    }
    userName = !userName ? "Player 1" : userName;
  }

  cpuName = "CPU";

  updateLocalStorage();

  document.getElementById("user-name").innerText = `${userName}:  ${userScore}`;
  document.getElementById("cpu").innerText = `${cpuName}:  ${cpuScore}`;
}

function getLocalStorage() {
  userName = window.localStorage.getItem("userName");
  userScore = window.localStorage.getItem("userScore");
  cpuName = window.localStorage.getItem("cpuName");
  cpuScore = window.localStorage.getItem("cpuScore");
}

function updateLocalStorage() {
  if (userScore === "" || userScore === null) {
    userScore = 0;
    cpuScore = 0;
  }
  window.localStorage.setItem("userName", userName);
  window.localStorage.setItem("userScore", userScore);
  window.localStorage.setItem("cpuName", cpuName);
  window.localStorage.setItem("cpuScore", cpuScore);
}

function displayWinnerArrow(outcome, rule, userChoice, cpuChoice) {
  const menuResult = document.getElementById("menu-result");
  const resultCell = document.getElementById("result-cell");

  if (outcome === 'WIN') {
    menuResult.innerText = `<--- ${getToolName(userChoice)} Wins!`;
    resultCell.innerHTML = `${getImagePath(userChoice)}<br>${rule}`;
  }

  if (outcome === 'LOSE') {
    menuResult.innerText = `${getToolName(cpuChoice)} Wins! --->`;
    resultCell.innerHTML = `${getImagePath(cpuChoice)}<br>${rule}`;
  }

  if (outcome === 'TIE') {
    resultCell.innerText = `Tie Game \n -${getToolName(userChoice)}- \n Play Again`;
    menuResult.innerText = "Push";
  }
}

function getRule(outcome, userChoice, cpuChoice) {
  if (outcome === 'TIE') {
    return outcome;
  }

  if (outcome === 'WIN' || outcome === 'LOSE') {
    switch (outcome === 'WIN' ? userChoice : cpuChoice) {
      case 'P':
        return "Paper Covers Rock";
      case 'R':
        return "Rock Crushes Scissors";
      case 'S':
        return "Scissors Cuts Paper";
    }
  }
}

function playGame(userChoice) {
  const cpuChoice = getRandomComputerChoice();
  document.getElementById("user2").innerHTML = getImagePath(userChoice);;
  document.getElementById("comp2").innerHTML = getImagePath(cpuChoice);

  const outcome = calculateWinner(userChoice, cpuChoice);

  highlightControlPanelItems("fill", cpuChoice, outcome, userChoice);

  const rule = getRule(outcome, userChoice, cpuChoice);

  displayWinnerArrow(outcome, rule, userChoice, cpuChoice)

  displayWinner(outcome, userChoice, cpuChoice);
}

function calculateWinner(userChoice, cpuChoice) {
  if (userChoice === cpuChoice) {
    return 'TIE';
  }

  const rockBeatsScissors = userChoice === 'R' && cpuChoice === 'S';
  const scissorsBeatsPaper = userChoice === 'S' && cpuChoice === 'P';
  const paperBeatsRock = userChoice === 'P' && cpuChoice === 'R';
  if (rockBeatsScissors || scissorsBeatsPaper || paperBeatsRock) {
    return 'WIN';
  }

  return 'LOSE';
}

function displayWinner(outcome, userChoice, cpuChoice) {
  let resultCell = document.getElementById("result-cell");
  let user_NameCell = document.getElementById("user-name");
  let cpuCell = document.getElementById("cpu");
  let user1Cell = document.getElementById("user1");
  let user2Cell = document.getElementById("user2");
  let comp1Cell = document.getElementById("comp1");
  let comp2Cell = document.getElementById("comp2");

  switch (outcome) {
    case 'WIN':
      ++userScore;

      resultCell.style.backgroundColor = "#FFFFFF";
      user_NameCell.style.backgroundColor = "dodgerblue";
      cpuCell.style.backgroundColor = "darkslategray";

      user1Cell.innerHTML = `${WAVE_IMG} <br> ${userName} <br> Wins!`;
      user1Cell.style.backgroundColor = "#FFFFFF";

      user2Cell.style.filter = "drop-shadow(5px 5px 10px darkslategray)";
      user2Cell.style.backgroundColor = "greenyellow";

      comp1Cell.innerText = `${getToolName(cpuChoice)} \n Loses`;
      comp1Cell.style.filter = "none";
      comp1Cell.style.backgroundColor = DEFAULT_CELL_COLOR;

      comp2Cell.style.backgroundColor = DEFAULT_CELL_COLOR;
      comp2Cell.style.filter = "blur(3px)";

      break;

    case 'LOSE':
      ++cpuScore;

      resultCell.style.backgroundColor = "#FFFFFF";
      cpuCell.style.backgroundColor = "dodgerblue";
      user_NameCell.style.backgroundColor = "darkslategray";

      comp1Cell.innerHTML = `${WAVE_IMG} <br> ${cpuName} <br> Wins!`;
      comp1Cell.style.backgroundColor = "#FFFFFF";

      comp2Cell.style.filter = "drop-shadow(5px 5px 10px darkslategray)";
      comp2Cell.style.backgroundColor = "greenyellow";

      user1Cell.innerText = `${getToolName(userChoice)} \n Loses`;
      user1Cell.style.filter = "none";
      user1Cell.style.backgroundColor = "DEFAULT_CELL_BG_COLOR";

      user2Cell.style.backgroundColor = DEFAULT_CELL_COLOR;
      user2Cell.style.filter = "blur(3px)";

      break;

    default:
      clearCells();
  }

  highlightControlPanelItems("fill", cpuChoice, outcome, userChoice);

  displayScore();

  updateLocalStorage();

  setTimeout(function () {
    highlightControlPanelItems("clear", cpuChoice, outcome, userChoice);
    locked = false;
  }, RESET_INTERVAL);
}

let displayScore = () => {
  document.getElementById("user-name").innerText = `${userName}:  ${userScore}`;
  document.getElementById("cpu").innerText = `${cpuName}:  ${cpuScore}`;
}

function highlightControlPanelItems(clearOrFill, cpuChoice, outcome, userChoice) {
  locked = true;

  let userCP_Cell = `user-${getToolName(userChoice).toLowerCase()}`;
  let cpuCP_Cell = `cpu-${getToolName(cpuChoice).toLowerCase()}`;
  let winningDecoration = "drop-shadow(5px 3px 10px greenyellow) drop-shadow(-5px 3px 10px dodgerblue)";
  let losingDecoration = "drop-shadow(5px 3px 10px darkslategray)";

  switch (clearOrFill) {
    case "clear":
      document.getElementById(userCP_Cell).style.filter = "none";
      document.getElementById(userCP_Cell).style.backgroundColor = DEFAULT_CELL_COLOR;
      document.getElementById(cpuCP_Cell).style.filter = "none";
      document.getElementById(cpuCP_Cell).style.backgroundColor = DEFAULT_CELL_COLOR;

      clearCells();

      break;

    case "fill":
      switch (outcome) {
        case 'WIN':
          document.getElementById(userCP_Cell).style.filter = winningDecoration;
          document.getElementById(cpuCP_Cell).style.filter = losingDecoration;
          document.getElementById(userCP_Cell).style.backgroundColor = "#FFFFFF";

          break;

        case 'LOSE':
          document.getElementById(userCP_Cell).style.filter = losingDecoration;
          document.getElementById(cpuCP_Cell).style.filter = winningDecoration;
          document.getElementById(cpuCP_Cell).style.backgroundColor = "#FFFFFF";

          break;

        default:
          document.getElementById(userCP_Cell).style.filter = losingDecoration;
          document.getElementById(cpuCP_Cell).style.filter = losingDecoration;
          document.getElementById(userCP_Cell).style.backgroundColor = DEFAULT_CELL_COLOR;
          document.getElementById(cpuCP_Cell).style.backgroundColor = DEFAULT_CELL_COLOR;
      }

      break;
  }
}

function clearCells() {
  let resultCell = document.getElementById("result-cell");
  let user_NameCell = document.getElementById("user-name");
  let cpuCell = document.getElementById("cpu");
  let user1Cell = document.getElementById("user1");
  let user2Cell = document.getElementById("user2");
  let comp1Cell = document.getElementById("comp1");
  let comp2Cell = document.getElementById("comp2");

  resultCell.style.backgroundColor = "#FFFFFF";

  user_NameCell.style.backgroundColor = "darkslategray";
  cpuCell.style.backgroundColor = "darkslategray";

  user1Cell.innerHTML = "";
  user1Cell.innerText = "Play \n Again?";
  user1Cell.style.backgroundColor = DEFAULT_CELL_COLOR;

  user2Cell.style.backgroundColor = DEFAULT_CELL_COLOR;
  user2Cell.style.filter = "none";
  user2Cell.innerHTML = "";
  user2Cell.innerText = `${userName}: \n ${userScore}`;

  comp1Cell.innerHTML = "";
  comp1Cell.innerText = "Play \n Again?";
  comp1Cell.style.backgroundColor = DEFAULT_CELL_COLOR;
  comp1Cell.style.backgroundColor = DEFAULT_CELL_COLOR;

  comp2Cell.style.backgroundColor = DEFAULT_CELL_COLOR;
  comp2Cell.style.filter = "none";
  comp2Cell.innerHTML = "";
  comp2Cell.innerText = `${cpuName}: \n ${cpuScore}`;
}

function getImagePath(id) {
  switch (id) {
    case 'R':
      return ROCK_IMG;
    case 'P':
      return PAPER_IMG;
    case 'S':
      return SCISSORS_IMG;
    default:
      return EMPTY_IMG;
  }
}

function getToolName(id) {
  let toolName = "";
  switch (id) {
    case "R":
      toolName = "Rock";
      break;
    case "P":
      toolName = "Paper";
      break;
    case "S":
      toolName = "Scissors";
      break;
    case "TIE":
      toolName = "Tie";
      break;
  }
  return toolName;
}

function getRandomComputerChoice() {
  const chars = "RPS";

  let result = "";
  for (let i = 1; i > 0; --i) {
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return result;
}

function introRoll(play) {
  let user1Cell = document.getElementById("user1")
  let user2Cell = document.getElementById("user2")
  let comp1Cell = document.getElementById("comp1")
  let comp2Cell = document.getElementById("comp2")
  let resultCell = document.getElementById("result-cell")
  user1Cell.innerHTML = "";
  user2Cell.innerHTML = ROCK_IMG;
  user2Cell.style.verticalAlign = "top";
  comp1Cell.innerHTML = "";
  comp2Cell.innerHTML = ROCK_IMG;
  comp2Cell.style.verticalAlign = "top";
  resultCell.innerText = "ROCK!";
  resultCell.style.verticalAlign = "top";

  setTimeout(function () {
    user1Cell.innerHTML = "";
    user2Cell.innerHTML = PAPER_IMG;
    user2Cell.style.verticalAlign = "middle";
    comp1Cell.innerHTML = "";
    comp2Cell.innerHTML = PAPER_IMG;
    comp2Cell.style.verticalAlign = "middle";
    resultCell.innerText = "PAPER!";
    resultCell.style.verticalAlign = "middle";
  }, 500);

  setTimeout(function () {
    user1Cell.innerHTML = "";
    user2Cell.innerHTML = SCISSORS_IMG;
    user2Cell.style.verticalAlign = "bottom";
    comp1Cell.innerHTML = "";
    comp2Cell.innerHTML = SCISSORS_IMG;
    comp2Cell.style.verticalAlign = "bottom";
    resultCell.innerText = "SCISSORS!";
    resultCell.style.verticalAlign = "bottom";
  }, 1000);

  setTimeout(function () {
    user1Cell.innerHTML = "";
    user2Cell.innerHTML = "";
    user2Cell.style.verticalAlign = "";
    comp1Cell.innerHTML = "";
    comp2Cell.innerHTML = "";
    comp2Cell.style.verticalAlign = "";
    resultCell.style.verticalAlign = "";
    resultCell.innerText = "";
    resultCell.innerText = `${userName} \n Press \n R, P, or S \n or Click Below \n To Play`;
  }, 1500);
}