import { MancalaGame, Player } from "../../mechanics/MancalaGame";
import { Bot, Algorithm } from "./Bot";

export class BotZbigniew extends Bot {
  constructor(depth: number, algorithm: Algorithm) {
    const name = "Zbigniew";
    super(name, depth, algorithm);
  }

  evaluation(game: MancalaGame, isMaximizing: boolean): number {
    const maxizing = game.getPlayerState(Player._1);
    const minimazing = game.getPlayerState(Player._2);
    const capture = game.getCapture();
    const captureMulti = 2;
    let capturePoints = 0;
    if(capture) {
      capturePoints = capture.earned * captureMulti;
      if(capture.player === minimazing.player) {
        capturePoints = -capturePoints;
      }
    }
    
    if(!isMaximizing) {
      return (maxizing.points - minimazing.points) + capturePoints;
    }
    return (maxizing.points - minimazing.points) + capturePoints;
  }
  
}