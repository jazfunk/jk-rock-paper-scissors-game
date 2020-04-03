const WAVE_IMG = '<img src="images/wave.png">';
const FIST_IMG = '<img src="images/fist.png">';
const ROCK_IMG = '<img src="images/rock.png">';
const PAPER_IMG = '<img src="images/paper.png">';
const SCISSORS_IMG = '<img src="images/scissors.png">';
const tool_ids = ["R", "P", "S"];
var userName = "Jeff";
var userChoice = "";
var cpuChoice = "";
var rule = "";

class Image {
  constructor(id, path) {
    this.id = id;
    this.path = path;
  }
}

window.onload = function(e) {
  this.getUser();
  introRoll();
};

function getImagePath(id) {
  var path = "";
  switch (id) {
    case "R":
      path = ROCK_IMG;
      break;
    case "P":
      path = PAPER_IMG;
      break;
    case "S":
      path = SCISSORS_IMG;
      break;
  }
  return path;
}

function getUser() {
  userName = prompt("Please enter your name", "Player 1");
  if (userName != null) {
    document.getElementById('user-name').innerText = userName;
    document.getElementById('cpu').innerText = "CPU";
  }
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
  cpuChoice = getRandom(1, "PRS");

  document.getElementById('user2').innerHTML = getImagePath(userChoice);
  document.getElementById('user1').innerText = getToolName(userChoice);

  //document.getElementById('result-cell').innerText = "vs";

  document.getElementById('comp2').innerHTML = getImagePath(cpuChoice);
  document.getElementById('comp1').innerText = getToolName(cpuChoice);

  var outcome = calculateWinner(userChoice + cpuChoice);

  outcome != "TIE"
    ? (document.getElementById("result-cell").innerText = `${getToolName(
        outcome
      )} Wins! \n${rule}`)
    : (document.getElementById("result-cell").innerText = "Tie Game");
}

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
        rule = "Scissors Cut Paper";
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
// Dtermine winner
// Display winner
// Add to total score, saved locally
// Ablility to clear score

// Save user name locally

document
  .getElementById("page-action-btn")
  .addEventListener("click", function(e) {
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
