export const testVar = "this is a test";

export function CreateGameboard(name) {
  this.name = name;
  this.x = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

  this.y = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const newArr = [];

  this.alignement = function () {
    let randomAlignement = Math.random();
    let currentAlignement = "";
    if (randomAlignement < 0.5) {
      currentAlignement = "vertical";
    } else {
      currentAlignement = "horizontal";
    }
    return currentAlignement;
  };

  this.receiveAttack = function (a, b) {
    return `attack at ${a} ${b}`;
  };

  this.buildBoard = function () {
    for (let i = 0; i < this.x.length; i++) {
      for (let j = 0; j < this.y.length; j++) {
        newArr.push(this.x[i] + this.y[j]);
      }
    }

    return newArr;
  };
}
