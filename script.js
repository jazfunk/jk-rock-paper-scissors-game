const WAVE_IMG = '<img id="wave-png" src="images/wave.png">';
const FIST_IMG = '<img id="fist-png" src="images/fist.png">';
const ROCK_IMG = '<img id="rock-png" src="images/rock.png">';
const PAPER_IMG = '<img id="paper-png" src="images/paper.png">';
const SCISSORS_IMG = '<img id="scissors-png" src="images/scissors.png">';
const tool_ids = ['R', 'P', 'S'];
var userName = '';
var userChoice = '';
var userScore = 0;
var cpuName = 'CPU';
var cpuChoice = '';
var cpuScore = 0;
var outcome = '';
var rule = '';
var winningPlayer = '';

class Image {
  constructor(id, path) {
    this.id = id;
    this.path = path;
  }
}

window.onload = function(e) {
  this.getUser();  
  //introRoll();
};

function updateLocal() {
  if(userScore === "" || userScore === null) {
    userScore = 0;
    cpuScore = 0;
  }
  window.localStorage.setItem("userName", userName);
  window.localStorage.setItem("userScore", userScore);
  window.localStorage.setItem("cpuName", cpuName);
  window.localStorage.setItem("cpuScore", cpuScore);
}

function getLocal() {
  userName = window.localStorage.getItem("userName");
  userScore = window.localStorage.getItem("userScore");
  cpuName = window.localStorage.getItem("cpuName");
  cpuScore = window.localStorage.getItem("cpuScore");
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
  }
  return path;
}

function getUser() {
  getLocal();   
  //if (userName = !userName) {
  if (userName === "" || userName === null) {
    userName = prompt("Please enter your name", "Player 1");
    if (userName.length > 10) {
      alert("Name too long.  Must be 10 or less characters.")
      userName = "Player 1";     
    }
    userName = !userName ? "Player 1" : userName;
  } 
  cpuName = "CPU";
  updateLocal();
  document.getElementById("user-name").innerText = `${userName}:  ${userScore}`;
  document.getElementById("cpu").innerText = `${cpuName}:  ${cpuScore}`;
}

document.addEventListener("keyup", keyUpHandler, false);

function keyUpHandler(e) {
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

function playGame() {
  clearCells();
  cpuChoice = getRandom(1, "PRS");
  document.getElementById("user2").innerHTML = getImagePath(userChoice);;
  document.getElementById("comp2").innerHTML = getImagePath(cpuChoice);
  outcome = calculateWinner(userChoice + cpuChoice);

  userChoice === outcome
    ? (winningPlayer = userName)
    : (winningPlayer = cpuName);

  switch (outcome) {
    case "R":
    case "P":
    case "S":
      document
        .getElementById('result-cell')
        .innerHTML = `${getImagePath(outcome)}<br>${rule}`;      
      document
        .getElementById('menu-result')
        .innerText = `${getToolName(outcome)} Wins!`;
      break;
    case "TIE":
      winningPlayer = "";
      document.getElementById('result-cell').innerText = "Tie Game";
      document.getElementById('menu-result').innerText = "Push";
      // Create function to clear/reset all cells
      break;
    default:
  }
  displayWinner(winningPlayer);
}

function clearCells() {
  document.getElementById('user1').innerText = "";
  document.getElementById('comp1').innerText = "";  
}

// Dtermine winner
function calculateWinner(opponents) {
  var winner = "NONE";
  switch (opponents) {
    case "PR":
    case "RP":
      winner = "P";
      rule = "Paper Covers Rock"
      break;
    case "PS":
    case "SP":
      winner = "S";
      rule = "Scissors Cuts Paper";
      break;
    case "RS":
    case "SR":
      winner = "R";
      rule = "Rock Smashes Scissors";
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
  // var winningCell = "";
  // var losingCell = "";
  var resultCell = document.getElementById('result-cell');
  var user_NameCell =  document.getElementById('user-name');
  var cpuCell = document.getElementById('cpu');
  var user1Cell = document.getElementById("user1");
  var user2Cell = document.getElementById("user2");
  var comp1Cell = document.getElementById("comp1"); 
  var comp2Cell = document.getElementById("comp2");
  debugger;

  switch (winner) {
    case userName:
      ++userScore;
      resultCell.style.backgroundColor = "#FFFFFF";
      user_NameCell.style.backgroundColor = "dodgerblue";
      cpuCell.style.backgroundColor = "darkslategray";     

      user1Cell.innerHTML = `${WAVE_IMG}<br>${userName} Wins!`;
      user1Cell.style.backgroundColor = "#FFFFFF";  

      user2Cell.style.filter = "drop-shadow(5px 5px 10px darkslategray)";
      user2Cell.style.backgroundColor = "greenyellow";      

      comp1Cell.innerText = "";      
      comp1Cell.style.filter= "";  
      comp1Cell.style.backgroundColor = "#F4F4F4";

      comp2Cell.style.backgroundColor = "#F4F4F4";
      comp2Cell.style.filter = "blur(4px)";      
      break;
    case cpuName:
      ++cpuScore;
      resultCell.style.backgroundColor = "#FFFFFF";
      cpuCell.style.backgroundColor = "dodgerblue"; 
      user_NameCell.style.backgroundColor = "darkslategray";     

      comp1Cell.innerHTML = `${WAVE_IMG}<br>${cpuName} Wins!`;      
      comp1Cell.style.backgroundColor = "#FFFFFF";

      comp2Cell.style.filter = "drop-shadow(5px 5px 10px darkslategray)";
      comp2Cell.style.backgroundColor = "greenyellow";  

      user1Cell.innerText = "";
      user1Cell.style.filter = "";
      user1Cell.style.backgroundColor = "#F4F4F4";
      
      user2Cell.style.backgroundColor = "#F4F4F4";
      user2Cell.style.filter = "blur(4px)";
      break;
    default:
      resultCell.style.backgroundColor = "#FFFFFF";
      user_NameCell.style.backgroundColor = "darkslategray"; 
      cpuCell.style.backgroundColor = "darkslategray";     

      user1Cell.innerText = "";
      user1Cell.style.backgroundColor = "#F4F4F4";

      user2Cell.style.backgroundColor = "#F4F4F4";
      user2Cell.style.filter = "";

      comp1Cell.innerText = "";
      comp1Cell.style.backgroundColor = "#F4F4F4";
      comp1Cell.style.backgroundColor = "#F4F4F4";

      comp2Cell.style.backgroundColor = "#F4F4F4";
      comp2Cell.style.filter = "";    
  }
  user_NameCell.innerText = `${userName}:  ${userScore}`;
  cpuCell.innerText = `${cpuName}:  ${cpuScore}`;
  updateLocal();  
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

function getRandom(length, chars) {
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}


// Psuedo Code //
// ----------- //
// Develop "Roll"
// Flash between fist.png and rock.png three times
// ^--Depicting "Rock! Paper! Scissors!"
// On the third roll, display userChoice and cpuChoice






// Ablility to clear score
document
  .getElementById("clear-local")
  .addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.clear();
    location.reload(true);
   });

// Testing purposes and Intro Replay
document
  .getElementById("page-action-btn")
  .addEventListener("click", function (e) {
    e.preventDefault;
    introRoll();
  });

  // function delay() {
  //   setTimeout(() => {
  //     introRoll("user2");
  //     introRoll("comp2");
  //   }, 1000);
  // }

  function introRoll() {   
   document.getElementById('user1').innerHTML = FIST_IMG;
   document.getElementById('comp1').innerHTML =  FIST_IMG;
   document.getElementById("result-cell").innerText = "";
  
      setTimeout(function() {
        document.getElementById('user1').innerHTML = "";
        document.getElementById('user2').innerHTML = ROCK_IMG;
        document.getElementById('comp1').innerHTML = "";
        document.getElementById('comp2').innerHTML = ROCK_IMG;
        document.getElementById("result-cell").innerText = "ROCK!";
      }, 750);

      setTimeout(function() {
        document.getElementById('user1').innerHTML = "";
        document.getElementById('user2').innerHTML = "";
        document.getElementById('comp1').innerHTML = "";
        document.getElementById('comp2').innerHTML = "";
        document.getElementById('menu-result').innerText = "Press A Key to Play";
        document.getElementById('result-cell').innerText = 
          `${userName} \n Play again?`;
      }, 2000);

    // for (t in tool_ids) {
    //   document.getElementById(cell).innerHTML = FIST_IMG;
    //   setTimeout(function() {
    //     document.getElementById(cell).innerHTML = ROCK_IMG;
    //     document.getElementById("result-cell").innerText =
    //       getToolName(tool_ids[t]) + "!";
    //   }, 1000);
    // }
  }
