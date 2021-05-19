import _ from "lodash";
import { Bot, Algorithm } from "../components/bots/Bot";
import { alphaBeta, minimax } from "../components/bots/minimax";

export enum Player {
  _1 = 'Player_1',
  _2 = 'Player_2'
}

export enum GameStatus {
  PLAYING = 'playing',
  FINISHED = 'finished'
}

export type PlayerState = { player: Player, stones: number[], points: number }

export class MancalaGame {
  private history: { states: [PlayerState, PlayerState], turn: Player }[];
  private state: [PlayerState, PlayerState];
  private playerTurn: Player;
  private lastTouchedHole: number;
  private status: GameStatus;
  private capture: { player: Player, earned: number };

  constructor(startingStones: number) {
    const holesPerPlayer = 6;
    this.history = [];
    this.spreadStones(holesPerPlayer, startingStones);
    const drawTurn = Math.floor(Math.random() * 2);
    this.playerTurn = Object.values(Player)[drawTurn];
  }

  getPlayerState(player: Player) {
    return this.state.find(s => s.player === player);
  }

  turn(holeId: number): { status: GameStatus, isCaptured: boolean } {
    this.history.push({ states: _.cloneDeep(this.state), turn: this.playerTurn });
    const takingAction = this.playerTurn;
    const { isAnotherTurn, currentState } = this.moveCounterclockwise(holeId, takingAction);
    this.capture = this.captureStones(currentState, takingAction);
    this.setWhoseNext(isAnotherTurn);
    const status = this.isGameOver(takingAction);
    this.status = status;
    return { status, isCaptured: this.capture ? true : false };
  }

  undo() {
    if(this.history.length <= 0) return;
    const previousState = this.history.pop();
    this.playerTurn = previousState.turn;
    this.state[0] = previousState.states.find(s => s.player === Player._1);
    this.state[1] = previousState.states.find(s => s.player === Player._2);
  }

  whoseTurn(): Player {
    return this.playerTurn;
  }

  getWinner(): Player {
    const player1 = this.getPlayerState(Player._1).points;
    const player2 = this.getPlayerState(Player._2).points;
    if(player1 > player2) {
      return Player._1;
    }
    if(player2 > player1) {
      return Player._2;
    }
    return null;
  }

  getStatus(): GameStatus {
    return this.status;
  }

  getLastTouched(): number {
    return this.lastTouchedHole;
  }

  predict(holeId: number) {
    this.turn(holeId);
    return this;
  }

  getPointsDiff() {
    return this.state[0].points - this.state[1].points;
  }

  getHolesNumber() {
    return this.state[0].stones.length;
  }

  getCapture() {
    return this.capture;
  }

  botMove(bot: Bot): number {
    // const holes = playerState.stones.length;
    const pred = _.cloneDeep(this);
    console.log('WHO', pred.whoseTurn());
    const isMaximizing = pred.playerTurn === Player._1;
    bot.startTurn();
    const { bestId, result} = bot.nextMove(pred, isMaximizing);
    const holeId = bestId + 1;
    const score = result;
    bot.endTurn();
    console.log('BOT CHOSE', holeId, score, bot.getAverageReactionTime(), bot.getTotalTime(), bot.getTotalTurns());
    return holeId;
  }

  isPossibleToChose(holeId: number) {
    const playerState = this.state.find(s => s.player === this.playerTurn);
    return playerState.stones[holeId] > 0;
  }

  private setWhoseNext(isAnotherTurn: boolean) {
    if(!isAnotherTurn) {
      this.playerTurn = this.playerTurn === Player._1 ? Player._2 : Player._1;
    }
  }

  private spreadStones(holesPerPlayer: number, startingStones: number) {
    this.state = [
      { player: Player._1, stones: [], points: 0 },
      { player: Player._2, stones: [], points: 0 }
    ];
    for(let i = 0; i < holesPerPlayer; i++) {
      this.state[0].stones.push(startingStones);
      this.state[1].stones.push(startingStones);
    }
  }

  private moveCounterclockwise(holeId: number, takingAction: Player) {
    const playerState = this.state.find(s => s.player === takingAction);
    const enemyState = this.state.find(s => s.player !== takingAction);
    let isEnemyState = false;
    const idx = holeId - 1;
    let stones = playerState.stones[idx];
    let currentHole = holeId;
    let currentState = playerState;
    let isAnotherTurn = false;
    const holes = playerState.stones.length;
    playerState.stones[idx] = 0;
    while(stones > 0) {
      if(currentHole >= holes) {
        if(isEnemyState) {
          currentState = playerState;
        } else {
          stones--;
          currentState.points++;
          if(stones === 0) 
            isAnotherTurn = true;
          else 
            currentState = enemyState;
        }
        currentHole = 0;
        isEnemyState = !isEnemyState;
      } else {
        stones--;
        currentState.stones[currentHole] += 1;
        currentHole++;
      }
    }
    this.lastTouchedHole = currentHole - 1;
    return { isAnotherTurn, currentState };
  }

  private captureStones(playerState: PlayerState, takingAction: Player) {
    if(playerState.player !== takingAction) {
      return null;
    }
    const enemyState = this.state.find(s => s.player !== takingAction);
    const holes = playerState.stones.length;
    const id = this.lastTouchedHole;
    const stones = playerState.stones[id];
    const enemyStones = enemyState.stones[holes - 1 - id];
    if(stones === 1 && enemyStones > 0) {
      const earned = enemyStones + stones;
      enemyState.stones[holes - 1 - id] = 0;
      playerState.stones[id] = 0;
      playerState.points += earned;
      return { player: takingAction, earned };
    }
    return null;
  }

  private isGameOver(takingAction: Player) {
    const playerState = this.state.find(s => s.player === takingAction);
    const enemyState = this.state.find(s => s.player !== takingAction);
    if(playerState.stones.every(v => v === 0) || enemyState.stones.every(v => v === 0)) {
      const enemyRest = _.sum(enemyState.stones);
      const playerRest = _.sum(playerState.stones);
      enemyState.stones.fill(0);
      playerState.stones.fill(0);
      enemyState.points += enemyRest;
      playerState.points += playerRest;
      return GameStatus.FINISHED;
    }
    return GameStatus.PLAYING;
  }

}