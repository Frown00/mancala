import { MancalaGame, Player } from "../../mechanics/MancalaGame";
import { Bot, Algorithm } from "./Bot";

export class BotJanusz extends Bot {
  
  constructor(depth: number, algorithm: Algorithm) {
    const name = "Janusz";
    super(name, depth, algorithm);
  }

  evaluation(game: MancalaGame, isMaximizing: boolean): number {
    const maxizing = game.getPlayerState(Player._1);
    const minimazing = game.getPlayerState(Player._2);
    const capture = game.getCapture();
    const captureMulti = 2;
    const pointsToWin = 25;
    let additionalPoints = 0;
    if(capture) {
      additionalPoints = capture.earned * captureMulti;
      if(capture.player === minimazing.player) {
        additionalPoints = -additionalPoints;
      }
    }
    if(!isMaximizing) {
      if(minimazing.points >= pointsToWin) {
        additionalPoints -= 10;
      }
      return (maxizing.points - minimazing.points) + additionalPoints;
    }
    if(maxizing.points >= pointsToWin) {
      additionalPoints += 10;
    }
    return (maxizing.points - minimazing.points) + additionalPoints;
  }
  
}