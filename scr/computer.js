import { alternate } from "/home/bynooz/the_odin_project/practice/BattleShip/BattleShip/scr/index.js";
const playerSide = document.querySelector("playerBoard");

const x = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const y = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
let unclicked = [];
let failSafeHori = [];
let failSafeVerti = [];

for (let i = 0; i < x.length; i++) {
  for (let j = 0; j < y.length; j++) {
    unclicked.push(x[i] + y[j]);
  }
}
export let hitCell = [];
// export let ennemyDestroyShip = 0;

export function computerPlay() {
  let clickedCell = [];
  // console.log(hitCell);

  let targetCellNum = Math.floor(Math.random() * unclicked.length);
  let targetCell = unclicked[targetCellNum];

  console.log(targetCellNum, "   ", targetCell);

  if (clickedCell.includes(unclicked[targetCellNum])) {
    computerPlay();
  } else if (hitCell.length >= 1) {
    betterPlay();
  } else {
    let target = document.querySelector(`.player-${targetCell}`);
    clickedCell.push(targetCell);
    unclicked.splice(targetCellNum, 1);
    alternate(target);
  }

  function betterPlay() {
    // console.log("hitcell-0: ", hitCell[0]);
    //------------choose axis----------
    let randomAlignement = Math.random();
    let currentAlignement = "";
    if (randomAlignement < 0.5) {
      currentAlignement = "vertical";
    } else {
      currentAlignement = "horizontal";
    }
    let randomAxis = Math.random();
    let choosenAxis;
    if (randomAxis < 0.5) {
      choosenAxis = -1;
    } else {
      choosenAxis = 1;
    }
    console.log(currentAlignement, choosenAxis);
    //---------------------------------
    let splitCoord = hitCell[0].match(/[a-z]+|[0-9]+/g);

    console.log(failSafeHori, "  ", failSafeVerti);
    if (currentAlignement === "horizontal") {
      checkHorizontal();
    } else {
      checkVertical();
    }

    function globalFailsafe() {
      hitCell.shift();
      failSafeHori = [];
      failSafeVerti = [];
      computerPlay();
    }

    function checkHorizontal() {
      let currentIndex = x.indexOf(splitCoord[0]);
      let newIndex = x[currentIndex + choosenAxis];
      let targetCell = newIndex + splitCoord[1];
      let targetCellIndex = unclicked.indexOf(targetCell);

      if (
        failSafeHori.includes("a") &&
        failSafeHori.includes("b") &&
        failSafeVerti.includes("y") &&
        failSafeVerti.includes("z")
      ) {
        globalFailsafe();
      } else if (unclicked.includes(targetCell)) {
        let target = document.querySelector(`.player-${targetCell}`);
        clickedCell.push(targetCell);
        unclicked.splice(targetCellIndex, 1);
        alternate(target);
      } else {
        if (choosenAxis === -1) {
          failSafeHori.push("a");
        }
        if (choosenAxis === 1) {
          failSafeHori.push("b");
        }
        computerPlay();
      }
    }

    function checkVertical() {
      let currentIndex = y.indexOf(splitCoord[1]);
      let newIndex = y[currentIndex + choosenAxis];
      let targetCell = splitCoord[0] + newIndex;
      let targetCellIndex = unclicked.indexOf(targetCell);

      if (
        failSafeHori.includes("a") &&
        failSafeHori.includes("b") &&
        failSafeVerti.includes("y") &&
        failSafeVerti.includes("z")
      ) {
        globalFailsafe();
      } else if (unclicked.includes(targetCell)) {
        let target = document.querySelector(`.player-${targetCell}`);
        clickedCell.push(targetCell);
        unclicked.splice(targetCellIndex, 1);
        alternate(target);
      } else {
        if (choosenAxis === -1) {
          failSafeVerti.push("y");
        }
        if (choosenAxis === 1) {
          failSafeVerti.push("z");
        }
        computerPlay();
      }

      // console.log(targetCell);
      // console.log("index nb: ", currentIndex);
      // console.log("new value: ", newIndex);
    }
  }
}
// export function resetHitCellIfDestroy() {
//   console.log("reset hit cell");
//   hitCell = [];
// }
