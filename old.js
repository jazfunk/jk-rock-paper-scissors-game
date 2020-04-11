// const TOOL_IDS = ["R", "P", "S"];
// var tools = [];

// class Tool {
//   constructor(id, name) {
//     this.id = id;
//     this.name = name;    
//   }  
// }

// window.onload = function() {
// //   setTools();
// };

// function setTools() {
//   for (t in TOOL_IDS) {
//     toolClass = new Tool(TOOL_IDS[t], getToolName(TOOL_IDS[t]));
//     tools.push(toolClass);
//   }
// }

// function getRule(opponents) {
//   //var rule = "NONE";
//   switch (opponents) {
//     case "PR":
//     case "RP":
//       rule = "Paper Covers Rock";
//       break;
//     case "PS":
//     case "SP":
//       rule = "Scissors Cut Paper";
//       break;
//     case "RS":
//     case "SR":
//       rule = "Rock Smashes Scissors";
//       break;
//     case "PP":
//     case "RR":
//     case "SS":
//       rule = "TIE";
//       break;
//   }
//   return rule;
// }



// function loadImageList() {
//   var imagePath = "";
//   for (t in tool_ids) {
//     switch (tool_ids[t]) {
//       case "R":
//         imagePath = ROCK_IMG;
//         break;
//       case "P":
//         imagePath = PAPER_IMG;
//         break;
//       case "S":
//         imagePath = SCISSORS_IMG;
//         break;
//     }
//     image = new Image(tool_ids[t], imagePath);
//     imageList.push(image);
//   }
// }





// // Not used
// function controlPanelDisplay(cell) {
//       switch (cell) {
//         case "user-rock":
//           break;
//         case "user-paper":
//           break;
//         case "user-scissors":
//           break;
//         case "cpu-rock":
//           break;
//         case "cpu-paper":
//           break;
//         case "cpu-scissors":
//           break;
//       }
//       document.getElementsByName(cell).style.filter = "drop-shadow(5px 5px 10px darkslategray)";
//       document.getElementsByName(cell).style.backgroundColor = "greenyellow";      
//     }







// document
//   .getElementById("user2")
//   .addEventListener("click", function(e) {
//     e.preventDefault;
//     var cell = e.target.parentElement;
//     var cellVerticalAlign = cell.style.verticalAlign;
//     if (cellVerticalAlign === "top" || cellVerticalAlign === "") {
//       cellVerticalAlign = "middle";
//     } else {
//       if (cellVerticalAlign === "middle") {
//         cellVerticalAlign = "bottom";
//       } else {
//         cellVerticalAlign = "top";
//       }
//     }
//   cell.style.verticalAlign = cellVerticalAlign;
//   });




//document.getElementById("user1").innerText = rule;
      // document.getElementById('user2').style.filter = "invert(100%)";
      // document.getElementById('user2').style.filter = "blur(2px)";
      // document.getElementById('user2').style.filter = "opacity(10%)";
      // document.getElementById('comp1').style.backgroundColor = "#F4F4F4";
      // document.getElementById("user2").innerHTML = WAVE_IMG;


      
      //document.getElementById("comp1").innerText = rule;
      // document.getElementById('comp1').style.backgroundColor = "#FFFFFF";
      // document.getElementById('user1').style.backgroundColor = "#F4F4F4";
      // document.getElementById("comp2").innerHTML = WAVE_IMG;
      // document.getElementById("user1").innerText = "";
      // document.getElementById("user2").innerHTML = "";  