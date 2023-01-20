import { CreateGameboard } from "/home/bynooz/the_odin_project/practice/BattleShip/BattleShip/scr/gameboard.js";
import { CreatePlayers } from "/home/bynooz/the_odin_project/practice/BattleShip/BattleShip/scr/players.js";

export const testVarScript = "this is a script test";

export function initializedBattle(name) {
  const Player = new CreatePlayers(name);
  const Board = new CreateGameboard(name);

  return { Player, Board };
}
