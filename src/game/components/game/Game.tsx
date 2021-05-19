import React from 'react';
import { hot } from 'react-hot-loader';
import Mancala from '../Mancala';
import { GameStatus, MancalaGame, Player } from '../../mechanics/MancalaGame';
import _ from "lodash";
import * as helper from "./helpers";
import { IBoardState } from './types';
import { Bot, BotName, Algorithm } from '../bots/Bot';
import { BotStefan } from '../bots/BotStefan';
import { BotZbigniew } from '../bots/BotZbigniew';
import { BotJanusz } from '../bots/BotJanusz';

export enum PlayerName {
  Player1 = 'Player 1',
  Player2 = 'Player 2'
}

export interface IState {
  history: { player1: IBoardState, player2: IBoardState }[],
  mancala: MancalaGame,
  player1: IBoardState,
  player2: IBoardState,
  players: string[],
  turn: string,
  result: string,
  bots: Bot[],
}

export interface IProps {
  bots?: {
    name: BotName,
    depth: number,
    algorithm: Algorithm,
  }[]
}

class Game extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const bots = [];
    const playersNames: string[] = [PlayerName.Player1, PlayerName.Player2];
    for(let i = 0; i < props.bots?.length; i++) {
      const { name, algorithm, depth } = props.bots[i];
      const reverseId = playersNames.length - 1 - i;
      playersNames[reverseId] = name;
      if(name === BotName.BOT_1) {
        bots.push(new BotStefan(depth, algorithm));
      }
      if(name === BotName.BOT_2) {
        bots.push(new BotZbigniew(depth, algorithm));
      }
      if(name === BotName.BOT_3) {
        bots.push(new BotJanusz(depth, algorithm));
      }
    }
    const startingStones = 4;
    const holes = 6;
    const mancala = new MancalaGame(startingStones);
    const stonesNumber = 2 * holes * startingStones;
    const stones = helper.genereteStones(stonesNumber);
    const filledHoles = helper
      .initialHolesWithStones(holes, startingStones, stones);
    const player1: IBoardState = { well: [], holes: filledHoles.holes1 };
    const player2: IBoardState = { well: [], holes: filledHoles.holes2 };
    const firstTurn = mancala.whoseTurn();
    let turn = firstTurn === Player._1 ? playersNames[0] : playersNames[1];
    this.state = {
      history: [],
      mancala,
      players: playersNames,
      player1,
      player2,
      turn,
      result: null,
      bots
    }
    this.chooseHole = this.chooseHole.bind(this);
  }

  chooseHole(playerId: Player, hole: number, isPossible: boolean) {
    if(!isPossible) return;
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
    const state1 = mancala.getPlayerState(player);
    const state2 = mancala.getPlayerState(enemy);
    helper.moveStones(choosingPlayer, state1Before, state1, stones);
    helper.moveStones(enemyPlayer, state2Before, state2, stones);
    const pointsGained = state1.points - state1Before.points;
    const enemyPointsGained = state2.points - state2Before.points;
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
    this.setState({ player1, player2, turn, history });
  }

  componentDidMount() {
    setTimeout(() => {
      for(let i = 0; i < this.state.bots?.length; i++) {
        if(this.state.bots[i].getName() === this.state.turn) {
          return this.botMove(i);
        }
      }
    }, 500);
  }

  componentDidUpdate() {
    setTimeout(() => {
      for(let i = 0; i < this.state.bots?.length; i++) {
        if(this.state.bots[i].getName() === this.state.turn) {
          return this.botMove(i);
        }
      }
    }, 500);
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

  botMove(botIdx: number) {
    const mancala = this.state.mancala;
    const player = mancala.whoseTurn();
    const holeId = mancala.botMove(this.state.bots[botIdx]);
    this.chooseHole(player, holeId, true);
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
          nextTurn={this.state.turn}
        />
        <button onClick={() => this.undoTurn()}>Undo</button>
        {/* <button onClick={() => this.botMove()}>BOT Move</button> */}
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
