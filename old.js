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