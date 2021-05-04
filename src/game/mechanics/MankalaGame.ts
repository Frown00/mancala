import _ from "lodash";

export enum Player {
  _1 = 'Player_1',
  _2 = 'Player_2'
}

export enum GameStatus {
  PLAYING = 'playing',
  FINISHED = 'finished'
}

export type PlayerState = { player: Player, stones: number[], points: number }

export class MankalaGame {
  private history: { states: [PlayerState, PlayerState], turn: Player }[];
  private state: [PlayerState, PlayerState];
  private playerTurn: Player;
  private lastTouchedHole: number;

  constructor(startingStones: number) {
    const holesPerPlayer = 6;
    this.history = [];
    this.state = [
      { player: Player._1, stones: [], points: 0 },
      { player: Player._2, stones: [], points: 0 }
    ];
    for(let i = 0; i < holesPerPlayer; i++) {
      this.state[0].stones.push(startingStones);
      this.state[1].stones.push(startingStones);
    }
    const drawTurn = Math.floor(Math.random() * 2);
    this.playerTurn = Object.values(Player)[drawTurn];
  }

  getPlayerState(player: Player) {
    return this.state.find(s => s.player === player);
  }

  turn(holeId: number): { status: GameStatus, isCaptured: boolean } {
    this.history.push({ states: _.cloneDeep(this.state), turn: this.playerTurn });
    const playerState = this.state.find(s => s.player === this.playerTurn);
    const enemyState = this.state.find(s => s.player !== this.playerTurn);
    const player = this.playerTurn;
    const holeIdx = holeId - 1;
    const holes = playerState.stones.length;
    let stones = playerState.stones[holeIdx];
    playerState.stones[holeIdx] = 0;
    let currentHole = holeId;
    let isEnemyState = false;
    let currentState = playerState;
    let isAnotherTurn = false;
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
    if(!isAnotherTurn) {
      this.playerTurn = this.playerTurn === Player._1 ? Player._2 : Player._1;
    }
    this.lastTouchedHole = currentHole - 1;
    // isCapture
    let isCaptured = false;
    if(currentState.player === player) {
      const id = this.lastTouchedHole;
      const stones = currentState.stones[id];
      const enemyStones = enemyState.stones[holes - currentHole]
      if(stones === 1 && enemyStones > 0) {
        const earned = enemyStones + stones;
        enemyState.stones[holes - currentHole] = 0;
        currentState.stones[id] = 0;
        currentState.points += earned;
        console.log('CAPTURED', earned);
        isCaptured = true;
      }
    }
    // isEnd
    if(playerState.stones.every(v => v === 0) || enemyState.stones.every(v => v === 0)) {
      const enemyRest = _.sum(enemyState.stones);
      const playerRest = _.sum(playerState.stones);
      enemyState.stones.fill(0);
      playerState.stones.fill(0);
      enemyState.points += enemyRest;
      playerState.points += playerRest;
      return { status: GameStatus.FINISHED, isCaptured };
    }
    return { status: GameStatus.PLAYING, isCaptured };
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

  getLastTouched(): number {
    return this.lastTouchedHole;
  }
}