const playerBoard = document.querySelector(".playerBoard");
const computerBoard = document.querySelector(".computerBoard");

export function CreateBoardCell(arg) {
  arg.Board.buildBoard().forEach((cell) => {
    const createCell = document.createElement("button");
    createCell.type = "button";
    createCell.className = `${arg.Board.name} cell ${arg.Board.name}-${cell}`;
    if (arg.Board.name == "computer") {
      computerBoard.append(createCell);
    } else {
      playerBoard.append(createCell);
    }
  });

  const horizontal = arg.Board.x;
  const verti = arg.Board.y;

  function chooseCoord() {
    let newCoord = `${
      horizontal[Math.floor(Math.random() * horizontal.length)]
    }${verti[Math.floor(Math.random() * verti.length)]}`;
    return newCoord;
  }

  let globalCoord = [];

  function setCoord(ship) {
    let correctAlignement = arg.Board.alignement();

    let correctCoord = chooseCoord();
    let boat = ship[1];
    let boatCount = boat.hitpoint;

    let splitCoord = correctCoord.match(/[a-z]+|[0-9]+/g);

    if (correctAlignement === "horizontal") {
      let indexBaseCoord = horizontal.indexOf(splitCoord[0]);
      let fullCoord = []; //[splitCoord[0] + splitCoord[1]]

      if (globalCoord.includes(correctCoord)) {
        // console.log("test", correctCoord);
        return setCoord(ship);
      } else {
        for (let i = boatCount - 1; i > 0; i--) {
          if (horizontal[indexBaseCoord + i] === undefined) {
            return setCoord(ship);
          } else if (
            globalCoord.includes(horizontal[indexBaseCoord + i] + splitCoord[1])
          ) {
            // console.log(
            //   "included ",
            //   horizontal[indexBaseCoord + i] + splitCoord[1]
            // );
            return setCoord(ship);
          } else {
            fullCoord.unshift(horizontal[indexBaseCoord + i] + splitCoord[1]);
            globalCoord.push(horizontal[indexBaseCoord + i] + splitCoord[1]);
          }
        }
        globalCoord.push(correctCoord);
      }
      fullCoord.unshift(splitCoord[0] + splitCoord[1]);
      boat.coordonate.push(fullCoord);

      // console.log("Hori full:     ", fullCoord);
      // console.log("Hori global:   ", globalCoord);
    } else {
      let indexBaseCoord = verti.indexOf(splitCoord[1]);
      let fullCoord = []; //[splitCoord[0] + splitCoord[1]]

      if (globalCoord.includes(correctCoord)) {
        // console.log("test", correctCoord);
        return setCoord(ship);
      } else {
        for (let i = boatCount - 1; i > 0; i--) {
          if (verti[indexBaseCoord + i] === undefined) {
            return setCoord(ship);
          } else if (
            globalCoord.includes(splitCoord[0] + verti[indexBaseCoord + i])
          ) {
            // console.log("included ", splitCoord[0] + verti[indexBaseCoord + i]);
            return setCoord(ship);
          } else {
            fullCoord.unshift(splitCoord[0] + verti[indexBaseCoord + i]);
            globalCoord.push(splitCoord[0] + verti[indexBaseCoord + i]);
          }
        }
        globalCoord.push(correctCoord);
      }
      fullCoord.unshift(splitCoord[0] + splitCoord[1]);
      boat.coordonate.push(fullCoord);

      // console.log("Verti full:     ", fullCoord);
      // console.log("Verti global:   ", globalCoord);
    }
  }

  function placeBoat(arg) {
    Object.entries(arg.Player.fleet).forEach((ship) => {
      setCoord(ship);
    });
  }

  function drawBoat() {
    let boatCoord = [];
    Object.entries(arg.Player.fleet).forEach((ship) => {
      ship[1].coordonate[0].forEach((element) => {
        boatCoord.push(element);
      });
    });
    if (arg.Player.name === "player") {
      playerBoard.childNodes.forEach((cell) => {
        let list = cell.classList;
        boatCoord.forEach((coordVal) => {
          if (list.contains(`player-${coordVal}`)) {
            cell.style.backgroundColor = "teal";
          }
        });
      });
    }
  }

  placeBoat(arg);
  if (arg.Player.name === "player") {
    drawBoat();
    // console.log("player");
  }
}
