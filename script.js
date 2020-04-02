const WAVE_IMG = '<img src="images/wave.png">';
const FIST_IMG = '<img src="images/fist.png">';
const ROCK_IMG = '<img src="images/rock.png">';
const PAPER_IMG = '<img src="images/paper.png">';
const SCISSORS_IMG = '<img src="images/scissors.png">';
const tool_ids = ["R", "P", "S"];
var userChoice = "";
var cpuChoice = "";
var rule = "";

window.onload = function(e) {
  introRoll("user1");
  introRoll("comp1");
};

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
  // alert(
  //   `You: ${getToolName(userChoice)}  -vs-  CPU: ${getToolName(cpuChoice)}`
  // );
  // Replaced above, with below
  // Keeping until testing is complete
  document.getElementById("user2").innerText = getToolName(userChoice);
  document.getElementById("result-cell").innerText = "vs";
  document.getElementById("comp2").innerText = getToolName(cpuChoice);

  var outcome = calculateWinner(userChoice + cpuChoice);
  // outcome != "TIE"
  //   ? alert(`${getToolName(outcome)} Wins! (${rule})`)
  //   : alert("Tie Game");
  // Replaced above, with below
  // Keeping until testing is complete
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

document
  .getElementById("page-action-btn")
  .addEventListener("click", function(e) {
    e.preventDefault;    
    introRoll("user1");
    introRoll("comp1");  
  });

  // function delay() {
  //   setTimeout(() => {
  //     introRoll("user2");
  //     introRoll("comp2");
  //   }, 1000);
  // }

  function introRoll(cell) {   
   document.getElementById(cell).innerHTML = FIST_IMG;
   document.getElementById("result-cell").innerText = "-------";
  
      setTimeout(function() {
        document.getElementById(cell).innerHTML = ROCK_IMG;
        document.getElementById("result-cell").innerText ="ROCK!";
      }, 1000);

    // for (t in tool_ids) {
    //   document.getElementById(cell).innerHTML = FIST_IMG;
    //   setTimeout(function() {
    //     document.getElementById(cell).innerHTML = ROCK_IMG;
    //     document.getElementById("result-cell").innerText =
    //       getToolName(tool_ids[t]) + "!";
    //   }, 1000);
    // }
  }
