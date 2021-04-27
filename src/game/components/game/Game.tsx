import React from 'react';
import { hot } from 'react-hot-loader';
import Mankala from '../Mankala';
import { MankalaGame, Player } from '../../mechanics/MankalaGame';
import _ from "lodash";
import * as helper from "./helpers";
import { IBoardState } from './types';

export interface IState {
  mankala: MankalaGame
  player1: IBoardState,
  player2: IBoardState,
  players: string[],
  turn: string,
}

class Game extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);
    const startingStones = 4;
    const holes = 6;
    const mankala = new MankalaGame(startingStones);
    const stonesNumber = 2 * holes * startingStones;
    const stones = helper.genereteStones(stonesNumber);
    const filledHoles = helper
      .initialHolesWithStones(holes, startingStones, stones);
    const player1: IBoardState = { well: [], holes: filledHoles.holes1 };
    const player2: IBoardState = { well: [], holes: filledHoles.holes2 };
    const playersNames = ["Player 1", "Player 2"];
    const firstTurn = mankala.whoseTurn();
    let turn = firstTurn === Player._1 ? playersNames[0] : playersNames[1];
    this.state = {
      mankala,
      players: playersNames,
      player1,
      player2,
      turn,
    }
    this.chooseHole = this.chooseHole.bind(this);
  }

  chooseHole(playerId: Player, hole: 1 | 2 | 3 | 4 | 5 | 6) {
    const mankala = this.state.mankala;
    let player = mankala.whoseTurn();
    if(playerId !== player) {
      console.error("Selected opponent hole");
      return;
    }
    const {
      choosingPlayer, 
      enemyPlayer, 
      enemy, 
      player1, 
      player2
    } = helper.getTurnStates(this.state, player);
    const stones = choosingPlayer.holes[hole - 1];
    if(stones.length <= 0) {
      console.error("Wrong hole - no stones");
      return;
    }
    const state1Before = _.cloneDeep(mankala.getPlayerState(player));
    const state2Before = _.cloneDeep(mankala.getPlayerState(enemy));
    // Action
    mankala.turn(hole);
    const whoseNextTurn = mankala.whoseTurn();
    // Move stones
    const state1 = mankala.getPlayerState(player);
    const state2 = mankala.getPlayerState(enemy);
    helper.moveStones(choosingPlayer, state1Before, state1, stones);
    helper.moveStones(enemyPlayer, state2Before, state2, stones);
    const turn = whoseNextTurn === Player._1 ? this.state.players[0] : this.state.players[1];
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
