const WAVE_IMG = '<img id="wave-png" src="images/wave.png">';
const FIST_IMG = '<img id="fist-png" src="images/fist.png">';
const ROCK_IMG = '<img id="rock-png" src="images/rock.png">';
const PAPER_IMG = '<img id="paper-png" src="images/paper.png">';
const SCISSORS_IMG = '<img id="scissors-png" src="images/scissors.png">';
const EMPTY_IMG = '<img id="empty-png" src="images/empty.png">';
const DEFAULT_CELL_COLOR = "#F4F4F4";
const RESET_INTERVAL = 2500;
const tool_ids = ['R', 'P', 'S'];
var locked = false;
var userName = '';
var userChoice = '';
var userScore = 0;
var cpuName = 'CPU';
var cpuChoice = '';
var cpuScore = 0;
var outcome = '';
var rule = '';
var winningPlayer = '';

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
 .addEventListener("click", function(e) {
   e.preventDefault(); 
   if(locked) {
     return;
   }
   locked = true;
   controlPanelClickHandler(e.target.parentElement.id)
 });

function controlPanelClickHandler(toolClicked) {
  switch (toolClicked) {
    case "user-rock":
    case "user-fist":
      userChoice = "R";
      playGame();
      break;
    case "user-paper":
    case "user-wave":
      userChoice = "P";
      playGame();
      break;
    case "user-scissors":
      userChoice = "S";
      playGame();
      break;  
    default: 
    locked = false;    
  }
}

document.addEventListener("keyup", keyUpHandler, false);

function keyUpHandler(e) {
  if(locked) {
    return;
  }

  userChoice = "";

  switch (e.which) {
    case 80:
      userChoice = "P";
      break;
    case 82:
      userChoice = "R";
      break;
    case 83:
      userChoice = "S";
      break;
  }

  if (userChoice !== "") {
    playGame();
  }
}

window.onload = function(e) {
  this.getUser();  
  introRoll();
};

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

function playGame() {
  cpuChoice = getRandomRPS(1, "RPS");
  document.getElementById("user2").innerHTML = getImagePath(userChoice);;
  document.getElementById("comp2").innerHTML = getImagePath(cpuChoice);
  
  outcome = calculateWinner(userChoice + cpuChoice);
  
  highlightControlPanelItems("fill");

  userChoice === outcome ? (winningPlayer = userName)
    : (cpuChoice === outcome)  ? (winningPlayer = cpuName)
    : winningPlayer = "TIE";

  switch (outcome) {
    case "R":
    case "P":
    case "S":
      var currentWinnerArrowDirection = ""; 

      winningPlayer === userName 
        ? currentWinnerArrowDirection = `<--- ${getToolName(outcome)} Wins!`
        : winningPlayer === cpuName 
          ? currentWinnerArrowDirection = `${getToolName(outcome)} Wins! --->`
          : currentWinnerArrowDirection = "";

      document
        .getElementById('result-cell')
        .innerHTML = `${getImagePath(outcome)}<br>${rule}`;

      document
        .getElementById('menu-result')
        .innerText = currentWinnerArrowDirection;

      break;
      
    case "TIE":
      document
        .getElementById('result-cell')
        .innerText = `Tie Game \n -${getToolName(userChoice)}- \n Play Again`;

      document
        .getElementById('menu-result')
        .innerText = "Push";

      break;
  }  
  displayWinner(winningPlayer);
}

function calculateWinner(opponents) {
  var winner = "NONE";
  switch (opponents) {
    case "PR":
    case "RP":
      winner = "P";
      rule = "Paper Covers Rock";
      break;
    case "PS":
    case "SP":
      winner = "S";
      rule = "Scissors Cuts Paper";
      break;
    case "RS":
    case "SR":
      winner = "R";
      rule = "Rock Crushes Scissors";
      break;
    case "PP":
    case "RR":
    case "SS":
      winner = "TIE";
      rule = winner;
      break;
  }
  return winner;
} 

function displayWinner(winner) {
  var resultCell = document.getElementById("result-cell");
  var user_NameCell = document.getElementById("user-name");
  var cpuCell = document.getElementById("cpu");
  var user1Cell = document.getElementById("user1");
  var user2Cell = document.getElementById("user2");
  var comp1Cell = document.getElementById("comp1");
  var comp2Cell = document.getElementById("comp2");

  switch (winner) {
    case userName:
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

    case cpuName:
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

  highlightControlPanelItems("fill");

  user_NameCell.innerText = `${userName}:  ${userScore}`;
  cpuCell.innerText = `${cpuName}:  ${cpuScore}`;

  updateLocalStorage();

  setTimeout(function () {
    highlightControlPanelItems("clear");
    locked = false;
  }, RESET_INTERVAL);
}

function highlightControlPanelItems(clearOrFill) {
  locked = true;

  var userCP_Cell = `user-${getToolName(userChoice).toLowerCase()}`;
  var cpuCP_Cell = `cpu-${getToolName(cpuChoice).toLowerCase()}`;
  var winningDecoration = "drop-shadow(5px 3px 10px greenyellow) drop-shadow(-5px 3px 10px dodgerblue)";
  var losingDecoration = "drop-shadow(5px 3px 10px darkslategray)";

  switch (clearOrFill) {
    case "clear":
      document.getElementById(userCP_Cell).style.filter = "none";
      document.getElementById(userCP_Cell).style.backgroundColor = DEFAULT_CELL_COLOR;
      document.getElementById(cpuCP_Cell).style.filter = "none";
      document.getElementById(cpuCP_Cell).style.backgroundColor = DEFAULT_CELL_COLOR;

      clearCells();  

      break;

    case "fill":
      switch (winningPlayer) {
        case userName:
          document.getElementById(userCP_Cell).style.filter = winningDecoration;
          document.getElementById(cpuCP_Cell).style.filter = losingDecoration;
          document.getElementById(userCP_Cell).style.backgroundColor = "#FFFFFF";

          break;

        case cpuName:
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
  var resultCell = document.getElementById("result-cell");
  var user_NameCell = document.getElementById("user-name");
  var cpuCell = document.getElementById("cpu");
  var user1Cell = document.getElementById("user1");
  var user2Cell = document.getElementById("user2");
  var comp1Cell = document.getElementById("comp1");
  var comp2Cell = document.getElementById("comp2");

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
  var path = '';
  switch (id) {
    case 'R':
      path = ROCK_IMG;
      break;
    case 'P':
      path = PAPER_IMG;
      break;
    case 'S':
      path = SCISSORS_IMG;
      break;
    default:
      path = EMPTY_IMG;
  }
  return path;
}

function getToolName(id) {
  var toolName = "";
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

function getRandomRPS(length, chars) {
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}

function introRoll(play) {
  document.getElementById("user1").innerHTML = "";
  document.getElementById("user2").innerHTML = ROCK_IMG;
  document.getElementById("user2").style.verticalAlign = "top";
  document.getElementById("comp1").innerHTML = "";
  document.getElementById("comp2").innerHTML = ROCK_IMG;
  document.getElementById("comp2").style.verticalAlign = "top";
  document.getElementById("result-cell").innerText = "ROCK!";
  document.getElementById("result-cell").style.verticalAlign = "top";

  setTimeout(function () {
    document.getElementById("user1").innerHTML = "";
    document.getElementById("user2").innerHTML = PAPER_IMG;
    document.getElementById("user2").style.verticalAlign = "middle";
    document.getElementById("comp1").innerHTML = "";
    document.getElementById("comp2").innerHTML = PAPER_IMG;
    document.getElementById("comp2").style.verticalAlign = "middle";
    document.getElementById("result-cell").innerText = "PAPER!";
    document.getElementById("result-cell").style.verticalAlign = "middle";
  }, 500);

  setTimeout(function () {
    document.getElementById("user1").innerHTML = "";
    document.getElementById("user2").innerHTML = SCISSORS_IMG;
    document.getElementById("user2").style.verticalAlign = "bottom";
    document.getElementById("comp1").innerHTML = "";
    document.getElementById("comp2").innerHTML = SCISSORS_IMG;
    document.getElementById("comp2").style.verticalAlign = "bottom";
    document.getElementById("result-cell").innerText = "SCISSORS!";
    document.getElementById("result-cell").style.verticalAlign = "bottom";
  }, 1000);

  setTimeout(function () {
    document.getElementById("user1").innerHTML = "";
    document.getElementById("user2").innerHTML = "";
    document.getElementById("user2").style.verticalAlign = "";
    document.getElementById("comp1").innerHTML = "";
    document.getElementById("comp2").innerHTML = "";
    document.getElementById("comp2").style.verticalAlign = "";
    document.getElementById("result-cell").style.verticalAlign = "";
    document.getElementById("result-cell").innerText = "";
    document.getElementById("result-cell").innerText = `${userName} \n Press \n R, P, or S \n or Click Below \n To Play`;
  }, 1500);
}