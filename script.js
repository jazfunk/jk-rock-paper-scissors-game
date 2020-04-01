//var isChoiceMade = false;
var prsChoice = "";
var toolIDs = ["R", "P", "S"];
var tools = [];

class Tool {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

window.onload = function() {
  setTools();
};

function setTools() {
  for (t in toolIDs) {
    toolClass = new Tool(toolIDs[t], getToolName(toolIDs[t]));
    tools.push(toolClass);
  }
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

document.addEventListener("keyup", keyUpHandler, false);
function keyUpHandler(e) {
  switch (e.which) {
    case 80:
      prsChoice = "P";
      break;
    case 82:
      prsChoice = "R";
      break;
    case 83:
      prsChoice = "S";
      break;
  }
  var cpuChoice = cpuRandomPRS(1, "PRS");

  alert(`You:  ${getToolName(prsChoice)} -vs- CPU:  ${getToolName(cpuChoice)}`);

  var result = calculateWinner(prsChoice + cpuChoice);
  var rule = getRule(prsChoice + cpuChoice);  
  result != "TIE"
    ? alert(`${getToolName(result)} Wins! -${rule}`)
    : alert("Tie Game");
}

function cpuRandomPRS(length, chars) {
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}

function calculateWinner(opponents) {
  var winner = "NONE";
  switch (opponents) {
    case "PR":
    case "RP":
      winner = "P";
      break;
    case "PS":
    case "SP":
      winner = "S";
      break;
    case "RS":
    case "SR":
      winner = "R";
      break;
    case "PP":
    case "RR":
    case "SS":
      winner = "TIE";
      break;
  }
  return winner;
}

function getRule(opponents) {
  var rule = "NONE";
  switch (opponents) {
    case "PR":
    case "RP":
      rule = "Paper Covers Rock";
      break;
    case "PS":
    case "SP":
      rule = "Scissors Cut Paper";
      break;
    case "RS":
    case "SR":
      rule = "Rock Smashes Scissors";
      break;
    case "PP":
    case "RR":
    case "SS":
      rule = "TIE";
      break;
  }
  return rule;
}

document
  .getElementById("page-action-btn")
  .addEventListener("click", function(e) {
    e.preventDefault;
    var cellTarget = document.getElementById("user1").innerHTML;
    console.log(cellTarget);
    document.getElementById("run-text").value = cellTarget;
    var userPRS = prompt("Paper, Rock, or Scissors?").toUpperCase();
    var battle = userPRS + cpuRandomPRS(1, "PRS");
    console.log(battle);
  });

document.getElementById("user2").addEventListener("click", function(e) {
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