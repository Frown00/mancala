import React from 'react';
import { hot } from 'react-hot-loader';
import Mancala from '../Mancala';
import { GameStatus, MancalaGame, Player } from '../../mechanics/MancalaGame';
import _ from "lodash";
import * as helper from "./helpers";
import { IBoardState } from './types';

export interface IState {
  history: { player1: IBoardState, player2: IBoardState }[],
  mancala: MancalaGame,
  player1: IBoardState,
  player2: IBoardState,
  players: string[],
  turn: string,
  result: string,
}

class Game extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);
    const startingStones = 4;
    const holes = 6;
    const mancala = new MancalaGame(startingStones);
    const stonesNumber = 2 * holes * startingStones;
    const stones = helper.genereteStones(stonesNumber);
    const filledHoles = helper
      .initialHolesWithStones(holes, startingStones, stones);
    const player1: IBoardState = { well: [], holes: filledHoles.holes1 };
    const player2: IBoardState = { well: [], holes: filledHoles.holes2 };
    const playersNames = ["Player 1", "Player 2"];
    const firstTurn = mancala.whoseTurn();
    let turn = firstTurn === Player._1 ? playersNames[0] : playersNames[1];
    this.state = {
      history: [],
      mancala,
      players: playersNames,
      player1,
      player2,
      turn,
      result: null
    }
    this.chooseHole = this.chooseHole.bind(this);
  }

  chooseHole(playerId: Player, hole: 1 | 2 | 3 | 4 | 5 | 6) {
    const mancala = this.state.mancala;
    const history = this.state.history;
    let player = mancala.whoseTurn();
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
    console.log("STONES", stones.length);
    if(stones.length <= 0) {
      console.error("Wrong hole - no stones");
      return;
    }
    history.push({ 
      player1: _.cloneDeep(this.state.player1), 
      player2: _.cloneDeep(this.state.player2)
    });
    const state1Before = _.cloneDeep(mancala.getPlayerState(player));
    const state2Before = _.cloneDeep(mancala.getPlayerState(enemy));
    // Action
    let stonesToSplit = stones;
    const result = mancala.turn(hole);
    const whoseNextTurn = mancala.whoseTurn();
    // Move stones
    if(result.isCaptured) {
      const lastTouched = mancala.getLastTouched();
      const toMove = choosingPlayer.holes[lastTouched];
      const holes = enemyPlayer.holes.length;
      const captured = enemyPlayer.holes[holes - 1 - lastTouched];
      choosingPlayer.holes[lastTouched] = [];
      enemyPlayer.holes[holes - 1 - lastTouched] = [];
      stonesToSplit.push(...toMove, ...captured);
    }
    console.log("Stones to split", stonesToSplit.length);
    const state1 = mancala.getPlayerState(player);
    const state2 = mancala.getPlayerState(enemy);
    helper.moveStones(choosingPlayer, state1Before, state1, stones);
    helper.moveStones(enemyPlayer, state2Before, state2, stones);
    const pointsGained = state1.points - state1Before.points;
    const enemyPointsGained = state2.points - state2Before.points;
    console.log(pointsGained, enemyPointsGained);
    if(result.status === GameStatus.FINISHED) {
      stonesToSplit = [];
      for(let i = 0; i < choosingPlayer.holes.length; i++) {
        const stones = choosingPlayer.holes[i];
        stonesToSplit.push(...stones);
        choosingPlayer.holes[i] = [];
      }
      for(let i = 0; i < enemyPlayer.holes.length; i++) {
        const stones = enemyPlayer.holes[i];
        stonesToSplit.push(...stones);
        enemyPlayer.holes[i] = [];
      }
    }
    helper.moveToWell(choosingPlayer, pointsGained, stonesToSplit);
    helper.moveToWell(enemyPlayer, enemyPointsGained, stonesToSplit);

    if(result.status === GameStatus.FINISHED) {
      console.log('FINITO');
      console.log(choosingPlayer.holes);
      console.log(enemyPlayer.holes);
      const winner = mancala.getWinner();
      console.log("Game has been finished");
      let result = "It's a draw";
      if(winner) {
        const winnerName = winner === Player._1 ? this.state.players[0] : this.state.players[1];
        result = winnerName + " wins";
      }
      console.log(result);
      this.setState({ result, player1, player2, history });
      return;
    }
    const turn = whoseNextTurn === Player._1 ? this.state.players[0] : this.state.players[1];
    console.log(choosingPlayer);
    console.log(enemyPlayer);
    console.log(player, hole, state1, state2);
    this.setState({ player1, player2, turn, history });
  }
  
  undoTurn() {
    const history = this.state.history;
    if(history.length <= 0) return;
    this.state.mancala.undo();
    const lastSaved = history.pop();
    const turn = this.state.mancala.whoseTurn()  === Player._1 ? this.state.players[0] : this.state.players[1];
    this.setState({ 
      history,
      mancala: this.state.mancala, 
      player1: lastSaved.player1, 
      player2: lastSaved.player2, 
      turn,
      result: undefined
    });
  }

  render () {
    return (
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center"
      }}>
        <div style={{
          display: "flex", 
          flexDirection:"column", 
          alignItems: "center"
        }}>
          <p style={{margin: 0 }}>TURN</p>
          <p style={{margin: '0 0 10px', fontSize: '24px'}}>
            <b>{this.state.turn}</b>
          </p>
        </div>
        <Mancala 
          chooseHole={this.chooseHole}
          players={this.state.players}
          player1={this.state.player1} 
          player2={this.state.player2}
          nextTurn={this.state.mancala.whoseTurn()}
        />
        <button onClick={() => this.undoTurn()}>Undo</button>
        { this.state.result ? 
            <div style={{
              display: "flex", 
              flexDirection:"column", 
              alignItems: "center"
            }}>
              <p style={{margin: '10px 0 0' }}>RESULT</p>
              <p style={{margin: '0', fontSize: '24px'}}>
                <b>{this.state.result}</b>
              </p>
            </div> 
          : ''
        }
      </div>
    );
  }
}

export default hot(module)(Game);
