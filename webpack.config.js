const path = require("path");

module.exports = {
  mode: "production",
  entry:
    "/home/bynooz/the_odin_project/practice/BattleShip/BattleShip/scr/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
