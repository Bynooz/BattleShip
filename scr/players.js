export const testVar = "this is a test";

export function CreatePlayers(name) {
  this.name = name;
  this.fleet = {
    carrier: {
      id: "carrier",
      hitpoint: 5,
      hits: 0,
      alive: true,
      coordonate: [],
    },
    battleship: {
      id: "battleship",
      hitpoint: 4,
      hits: 0,
      alive: true,
      coordonate: [],
    },
    cruiser: {
      id: "cruiser",
      hitpoint: 3,
      hits: 0,
      alive: true,
      coordonate: [],
    },
    submarine: {
      id: "submarine",
      hitpoint: 3,
      hits: 0,
      alive: true,
      coordonate: [],
    },
    destroyer: {
      id: "destroyer",
      hitpoint: 2,
      hits: 0,
      alive: true,
      coordonate: [],
    },
  };

  this.hit = function (target) {
    target.hits++;
    if (target.hits === target.hitpoint) {
      target.alive = false;

      // return console.log(`${this.name} as sunk ennemy ${target.id}`);
    } else {
      return;
    }
  };
}

// let player1 = new CreatePlayers('player1')
// let computer = new CreatePlayers('computer')

// player1.hit(computer.fleet.submarine)
// player1.hit(computer.fleet.submarine)
// player1.hit(computer.fleet.submarine)

// computer.hit(player1.fleet.destroyer)
// computer.hit(player1.fleet.destroyer)

// console.log(player1);
// console.log(computer);
