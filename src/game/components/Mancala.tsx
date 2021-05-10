import React from 'react';
import { Player } from '../mechanics/MancalaGame';
import Hole, { Position } from './Hole';
import Stone from './Stone';
import Well from './Well';

interface IState {
}

interface IProps {
  chooseHole: (playerId: Player, hole: number) => void,
  players: string[],
  player1: any,
  player2: any,
  nextTurn: Player
}

export default class Mancala extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
  }
  
  render () {
    let player1 = this.props.player1;
    let player2 = this.props.player2;
    const holes = [];
    const holesCount = 6;
    for(let i = 0; i < holesCount; i++) {
      const upId = holesCount - i;
      const downId = i + 1;
      const upStones = player1.holes[upId - 1].length > 0;
      const downStones = player2.holes[downId - 1].length > 0;
      const upPossible = this.props.nextTurn === Player._1 && upStones;
      const downPossible = this.props.nextTurn === Player._2 && downStones;
      holes.push(
        <div key={i}>
          <div onClick={() => this.props.chooseHole(Player._1, upId)}>
            <Hole 
              stones={player1.holes[upId - 1]} 
              position={Position.UP}
              hoverOn={upPossible}
            />
          </div>
          <div onClick={() => this.props.chooseHole(Player._2, downId)}>
            <Hole 
              stones={player2.holes[downId - 1]} 
              position={Position.DOWN}
              hoverOn={downPossible}
            />
          </div>
        </div>
      );
    }
    return (
      <div style={{ 
        display: "flex", 
        width: "530px",
        height: "150px", 
        justifyContent: "center",
        alignItems: "center", 
        backgroundColor: "#3F250B",
        padding: '15px', 
        borderRadius: "20%" 
      }}>
        <Well stones={this.props.player1.well} playerName={this.props.players[0]}/>
        {holes}
        <Well stones={this.props.player2.well} playerName={this.props.players[1]}/>
      </div>
    );
  }
}