import _ from "lodash";
import { CreateBoardCell } from "/home/bynooz/the_odin_project/practice/BattleShip/BattleShip/scr/createShip.js";
import { initializedBattle } from "/home/bynooz/the_odin_project/practice/BattleShip/BattleShip/scr/script.js";
import {
  computerPlay,
  hitCell,
} from "/home/bynooz/the_odin_project/practice/BattleShip/BattleShip/scr/computer.js";

const player = new initializedBattle("player");
const computer = new initializedBattle("computer");

const playerSide = document.querySelector(".playerSide");
const computerSide = document.querySelector(".computerSide");

const computerUi = document.querySelector(".computerBoatList");
const playerUi = document.querySelector(".playerBoatList");

const turnUi = document.querySelector("#turn-ui");

document.addEventListener("click", (e) => {
  // console.log(e.target);
  // console.log(computer.Player.fleet);
});

CreateBoardCell(player);
CreateBoardCell(computer);

function CreateBoatList(arg) {
  let boatUi = document.querySelector(`.${arg.Player.name}BoatList`);
  let nbOfDestroyShip = 0;

  Object.entries(arg.Player.fleet).forEach((obj) => {
    const createUi = document.createElement("div");
    createUi.textContent = `${obj[0]}`;
    createUi.className = "ui-boat-status";
    createUi.id = `ui-${arg.Player.name}-${obj[0]}`;
    if (obj[1].alive === false) {
      createUi.style.color = "#CC8914";
      createUi.style.textDecoration = "line-through";
      nbOfDestroyShip++;
      // if (arg.Player.name === "player") {
      //   resetHitCellIfDestroy();
      //   // console.log(ennemyDestroyShip);
      // }
      if (nbOfDestroyShip === 5) {
        if (arg.Player.name === "computer") {
          alert("game Over Player Won !");
        } else {
          alert("game Over Computer Won !");
        }
      }
    }

    boatUi.append(createUi);
    return createUi;
  });
}

// function checkIfAllDead(arg) {
//   console.log(arg);
//   let nbOfDestroyShip = 0
//   Object.entries(arg.fleet).forEach(obj => {

//   })
// }

CreateBoatList(player);
CreateBoatList(computer);

export function alternate(arg) {
  const computerCell = computerSide.querySelectorAll(".computerBoard > button");
  const playerCell = playerSide.querySelectorAll(".playerBoard > button");

  if (playerSide.classList.contains("turn")) {
    computerCell.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (e.target.tagName === "SPAN") {
          e.preventDefault();
        } else if (e.target.firstChild === null) {
          checkIfHit(e);
          // e.preventDefault();
          e.target.style.cursor = "not-allowed";
          playerSide.classList.remove("turn");
          computerSide.classList.add("turn");
          updateUi();
          setTimeout(() => {
            computerPlay();

            computerSide.classList.remove("turn");
            playerSide.classList.add("turn");

            updateUi();
          }, 500);
        } else {
          return;
        }
      });
    });
  } else {
    // playerCell.forEach((cell) => {
    if (arg.firstChild === null) {
      checkIfHit(arg);
      arg.style.cursor = "not-allowed";
    } else {
      return;
    }
    // });
  }
}

function checkIfHit(arg) {
  const hit = document.createElement("span");
  hit.id = "hit";

  const miss = document.createElement("span");
  miss.id = "miss";

  if (playerSide.classList.contains("turn")) {
    // if (arg.target.classList[2] === undefined) {
    //   // defaultPrevented = true;
    //   return;
    // }
    // console.log(arg);
    let targetedCell = arg.target.classList[2];

    let splitTargetedCell = targetedCell.replace("computer-", "");

    let allCoord = [];
    Object.entries(computer.Player.fleet).forEach((ship) => {
      ship[1].coordonate[0].forEach((val) => {
        allCoord.push(val);
      });
    });

    if (allCoord.includes(splitTargetedCell)) {
      arg.target.append(hit);

      Object.entries(computer.Player.fleet).forEach((ship) => {
        if (ship[1].coordonate[0].includes(splitTargetedCell)) {
          computer.Player.hit(ship[1]);
          while (computerUi.firstChild) {
            computerUi.removeChild(computerUi.firstChild);
          }
        }
      });
      CreateBoatList(computer);
    } else {
      arg.target.append(miss);
    }
  } else {
    let targetedCell = arg.classList[2];
    // console.log(targetedCell);

    let splitTargetedCell = targetedCell.replace("player-", "");
    // console.log(splitTargetedCell);

    let allCoord = [];
    Object.entries(player.Player.fleet).forEach((ship) => {
      ship[1].coordonate[0].forEach((val) => {
        allCoord.push(val);
      });
    });

    if (allCoord.includes(splitTargetedCell)) {
      arg.append(hit);
      hitCell.push(splitTargetedCell);
      Object.entries(player.Player.fleet).forEach((ship) => {
        if (ship[1].coordonate[0].includes(splitTargetedCell)) {
          player.Player.hit(ship[1]);
          while (playerUi.firstChild) {
            playerUi.removeChild(playerUi.firstChild);
          }
        }
      });
      CreateBoatList(player);
    } else {
      // console.log(allCoord);
      arg.append(miss);
    }
  }
}

function updateUi() {
  if (playerSide.classList.contains("turn")) {
    turnUi.textContent = "Player Turn";
  }
  if (computerSide.classList.contains("turn")) {
    turnUi.textContent = "Computer Turn";
  }
}

alternate();
updateUi();
// const test = [];

// console.log(test);
