import { MancalaGame, Player } from "../../mechanics/MancalaGame";
import { Bot, Algorithm } from "./Bot";

export class BotStefan extends Bot {
  
  constructor(depth: number, algorithm: Algorithm) {
    const name = "Stefan";
    super(name, depth, algorithm);
  }

  evaluation(game: MancalaGame, isMaximizing: boolean): number {
    const maxizing = game.getPlayerState(Player._1);
    const minimazing = game.getPlayerState(Player._2);
    if(!isMaximizing) {
      return maxizing.points - minimazing.points;
    }
    return maxizing.points - minimazing.points;
  }
  
}