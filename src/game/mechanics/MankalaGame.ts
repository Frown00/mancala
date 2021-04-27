export enum Player {
  _1 = 'Player_1',
  _2 = 'Player_2'
}
export type PlayerState = { player: Player, stones: number[], points: number }

export class MankalaGame {
  private state: [PlayerState, PlayerState];
  private playerTurn: Player;

  constructor(startingStones: number) {
    const holesPerPlayer = 6;
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

  turn(holeId: number) {
    const playerState = this.state.find(s => s.player === this.playerTurn);
    const enemyState = this.state.find(s => s.player !== this.playerTurn);
    const holeIdx = holeId - 1;
    const holes = playerState.stones.length;
    let stones = playerState.stones[holeIdx];
    playerState.stones[holeIdx] = 0;
    let i = holeId;
    let isEnemyState = false;
    let currentState = playerState;
    while(stones > 0) {
      if(i >= holes) {
        i = 0;
        isEnemyState = !isEnemyState;
        if(isEnemyState) {
          stones--;
          currentState.points++;
          currentState = enemyState;
        }
        else {
          currentState = playerState;
        }
      } else {
        stones--;
        currentState.stones[i] += 1;
        i++;
      }
    }
    if(this.playerTurn === Player._1) {
      this.playerTurn = Player._2;
    } else {
      this.playerTurn = Player._1;
    }
  }

  whoseTurn(): Player {
    return this.playerTurn;
  }

}