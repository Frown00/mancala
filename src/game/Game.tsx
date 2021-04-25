import React from 'react';
import { hot } from 'react-hot-loader';
import Mankala from './components/Mankala';

interface IState {
  players: string[],
  turn: string,
}

class Game extends React.Component<{}, IState> {

  chooseHole(player: 1 | 2, hole: 1 | 2 | 3 | 4 | 5 | 6) {
    console.log(player, hole);
  }

  render () {
    return (
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div>Turn: Player 1</div>
        <Mankala chooseHole={this.chooseHole}/>
      </div>
    );
  }
}

export default hot(module)(Game);
