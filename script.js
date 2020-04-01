var userChoice = "";
var cpuChoice = "";
var rule = "";

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
  alert(
    `You: ${getToolName(userChoice)}  -vs-  CPU: ${getToolName(cpuChoice)}`
  );

  var outcome = calculateWinner(userChoice + cpuChoice);
  outcome != "TIE"
    ? alert(`${getToolName(outcome)} Wins! (${rule})`)
    : alert("Tie Game");
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

document
  .getElementById("page-action-btn")
  .addEventListener("click", function(e) {
    e.preventDefault;
    var cellTarget = document.getElementById("user1").innerHTML;
    document.getElementById("run-text").value = cellTarget;
  });

document
  .getElementById("user2")
  .addEventListener("click", function(e) {
    e.preventDefault;
    var cell = e.target.parentElement;
    var cellVerticalAlign = cell.style.verticalAlign;
    if (cellVerticalAlign === "top" || cellVerticalAlign === "") {
      cellVerticalAlign = "middle";
    } else {
      if (cellVerticalAlign === "middle") {
        cellVerticalAlign = "bottom";
      } else {
        cellVerticalAlign = "top";
      }
    }
  cell.style.verticalAlign = cellVerticalAlign;
  });
