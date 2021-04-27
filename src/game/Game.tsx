import React from 'react';
import { hot } from 'react-hot-loader';
import Mankala from './components/Mankala';
import Stone from './components/Stone';
import { MankalaGame, Player } from './mechanics/MankalaGame';
import _ from "lodash";

interface IState {
  mankala: MankalaGame
  player1: { well: Stone[], holes: Stone[][] },
  player2: { well: Stone[], holes: Stone[][] },
  players: string[],
  turn: string,
}

class Game extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);
    const startingStones = 4;
    const holes = 6;
    const mankala = new MankalaGame(startingStones);
    let stones = [];
    const stonesNumber = 2 * holes * startingStones;
    for(let i = 0; i < stonesNumber; i++) {
      const random = Math.floor(Math.random() * 4);
      const move = Math.floor(Math.random() * 3);
      const rotation = Math.floor(Math.random() * 180);
      if(random === 0) {
        stones.push(<Stone key={i} moveUp={move} rotation={rotation} color={"yellow"}/>);
      } else if(random === 1) {
        stones.push(<Stone key={i} moveDown={move} rotation={rotation} color={"red"}/>);
      }
      else if(random === 2) {
        stones.push(<Stone key={i} moveLeft={move} rotation={rotation} color={"green"}/>);
      } else if(random === 3) {
        stones.push(<Stone key={i} moveRight={move} rotation={rotation} color={"blue"}/>);
      }
    }
    const player1: any = { well: [], holes: [] };
    const player2: any = { well: [], holes: [] };
    let sId = 0;
    for(let i = 0; i < holes; i++) {
      player1.holes.push([]);
      player2.holes.push([]);
      for(let j = 0; j < startingStones; j++) {
        player1.holes[i].push([stones[sId]]);
        player2.holes[i].push([stones[sId+1]]);
        sId += 2;
      }
    }
    const playersNames = ["Player 1", "Player 2"];
    this.state = {
      mankala,
      players: playersNames,
      player1,
      player2,
      turn: playersNames[0],
    }
    this.chooseHole = this.chooseHole.bind(this);
  }

  chooseHole(playerId: Player, hole: 1 | 2 | 3 | 4 | 5 | 6) {
    const mankala = this.state.mankala;
    let player1 = null;
    let player2 = null;
    let choosingPlayer: any = {};
    let enemyPlayer: any = {};
    let player = mankala.whoseTurn();
    if(playerId !== player) {
      console.error("Selected opponent hole");
      return;
    }
    let enemy = null;
    if(player === Player._1) {
      enemy = Player._2;
      choosingPlayer = this.state.player1;
      enemyPlayer = this.state.player2;
      player1 = choosingPlayer;
      player2 = enemyPlayer;
    } else {
      enemy = Player._1;
      choosingPlayer = this.state.player2;
      enemyPlayer = this.state.player1;
      player1 = enemyPlayer;
      player2 = choosingPlayer;
    }
    const stones = choosingPlayer.holes[hole - 1];
    if(stones <= 0) {
      console.error("Wrong hole - no stones");
      return;
    }
    const state1Before = _.cloneDeep(mankala.getPlayerState(player));
    const state2Before = _.cloneDeep(mankala.getPlayerState(enemy));
    mankala.turn(hole);
    
    const state1 = mankala.getPlayerState(player);
    const state2 = mankala.getPlayerState(enemy);
    for(let i = 0; i < state1.stones.length; i++) {
      const before = state1Before.stones[i];
      const after = state1.stones[i];
      if(after > before) {
        const stonesAmount = after - before;
        for(let s = 0; s < stonesAmount; s++) {
          choosingPlayer.holes[i].push(stones[0]);
          stones.splice(0, 1);
        }
      }
    }
    for(let i = 0; i < state2.stones.length; i++) {
      const before = state2Before.stones[i];
      const after = state2.stones[i];
      if(after > before) {
        const stonesAmount = after - before;
        for(let s = 0; s < stonesAmount; s++) {
          enemyPlayer.holes[i].push(stones[0]);
          stones.splice(0, 1);
        }
      }
    }
    const morePoints = state1.points - state1Before.points;
    for(let i = 0; i < morePoints; i++) {
        choosingPlayer.well.push(stones[0]);
        stones.splice(0, 1);
    }
    const morePoints2 = state2.points - state2Before.points;
    for(let i = 0; i < morePoints2; i++) {
        enemyPlayer.well.push(stones[0]);
        stones.splice(0, 1);
    }
    const whoseNextTurn = mankala.whoseTurn();
    let turn = this.state.players[0];
    if(whoseNextTurn === Player._2) {
      turn = this.state.players[1]
    }
    console.log(choosingPlayer);
    console.log(enemyPlayer);
    this.setState({ player1, player2, turn });
    console.log(player, hole, state1, state2);
  }

  render () {
    return (
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center"
      }}>
        <div>Turn: {this.state.turn}</div>
        <Mankala 
          chooseHole={this.chooseHole}
          players={this.state.players}
          player1={this.state.player1} 
          player2={this.state.player2}
          nextTurn={this.state.mankala.whoseTurn()}
        />
      </div>
    );
  }
}

export default hot(module)(Game);
