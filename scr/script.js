import { CreateGameboard } from "./gameboard.js";
import { CreatePlayers } from "./players.js";

export const testVarScript = "this is a script test";

export function initializedBattle(name) {
  const Player = new CreatePlayers(name);
  const Board = new CreateGameboard(name);

  return { Player, Board };
}
