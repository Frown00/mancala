import { MancalaGame } from "../../mechanics/MancalaGame";
import { alphaBeta, minimax } from "./minimax";

export enum BotName {
  BOT_1 = 'Stefan',
  BOT_2 = 'Zbigniew',
  BOT_3 = 'Janusz'
}

export enum Algorithm {
  MINIMAX = 'minimax',
  ALPHA_BETA = 'alpha-beta'
}

export abstract class Bot {
  private gameTime: number;
  private turns: number;
  private depth: number;
  private algorithm: Algorithm;
  private name: string;
  private turnStartTime: number;
  private findingNextMove: (game: MancalaGame, maximizingPlayer: boolean, bot: Bot) => {
    result: number;
    bestId: number;
  }

  constructor(name: string, depth: number, algorithm: Algorithm) {
    this.name = name;
    this.depth = depth;
    this.turns = 0;
    this.gameTime = 0;
    this.algorithm = algorithm;
    if(algorithm === Algorithm.MINIMAX) {
      this.findingNextMove = minimax;
    } else {
      this.findingNextMove = alphaBeta;
    }
  }

  getName() {
    return this.name;
  }

  getAlghorithm() {
    return this.algorithm;
  }

  getDepth() {
    return this.depth;
  }

  getAverageReactionTime() {
    if(this.turns === 0) return 0;
    return this.gameTime / this.turns;
  }

  getTotalTime() {
    return this.gameTime;
  }

  getTotalTurns() {
    return this.turns;
  }

  startTurn() {
    this.turnStartTime = Date.now();
    console.log('START TURN', this.turnStartTime);
  }

  endTurn() {
    if(!this.turnStartTime) 
      throw Error('To end turn you should call startTurn() function first');
    const timeSpent = Date.now() - this.turnStartTime;
    console.log('END TURN', timeSpent);
    this.gameTime += timeSpent;
    this.turns++;
    this.turnStartTime = null;
  }

  nextMove(game: MancalaGame, maximizingPlayer: boolean) {
    return this.findingNextMove(game, maximizingPlayer, this);
  }

  abstract evaluation(game: MancalaGame, isMaximizing: boolean): number;

}