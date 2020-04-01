
var isChoiceMade = false;
var prsChoice = "";

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
  if(prsChoice != "") {
      isChoiceMade = true;
  } else {
      isChoiceMade = false;
  }

  var temp = cpuRandomPRS(1, "PRS");
  alert(prsChoice + temp);  
  alert(calculateWinner(prsChoice + temp));
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


function cpuRandomPRS(length, chars) {
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}
//document.write(randomString(1, 'PRS'));







document
  .getElementById("page-action-btn")
  .addEventListener("click", function(e) {
    var cellTarget = document.getElementById("user1").innerHTML;
    console.log(cellTarget);
    document.getElementById("run-text").value = cellTarget;
    
    var userPRS = prompt("Paper, Rock, or Scissors?").toUpperCase();
    var battle = userPRS + cpuRandomPRS(1, "PRS");
    console.log(battle);
    alert("Battle = " + battle);    
    alert(calculateWinner(battle));
  });


document.getElementById("user2").addEventListener("click", function(e) {
  var cell = e.target.parentElement;
  var cellVerticalAlign = cell.style.verticalAlign;
  debugger;
  if (cellVerticalAlign === "top" || cellVerticalAlign === "") {
    //cell.style.verticalAlign = "middle";
    cellVerticalAlign = "middle";
  } else {
    if (cellVerticalAlign === "middle") {
      //cell.style.verticalAlign = "bottom";
      cellVerticalAlign = "bottom";
    } else {
      //cell.style.verticalAlign = "top";
      cellVerticalAlign = "top";
    }
  }
  cell.style.verticalAlign = cellVerticalAlign;
});