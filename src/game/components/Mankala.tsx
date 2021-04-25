import React from 'react';
import Hole, { Position } from './Hole';
import Stone from './Stone';
import Well from './Well';

interface IState {
  players: string[],
  turn: string,
  stones: any[],
}

interface IProps {
  chooseHole: (player: number, hole: number) => void
}

export default class Mankala extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    let stones = [];
    for(let i = 0; i < 12 * 4; i++) {
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
    this.setState({ stones });
  }
  
  render () {
    let stones = this.state.stones;
    return (
      <div style={{ 
        display: "flex", 
        width: "450px",
        height: "150px", 
        alignItems: "center", 
        backgroundColor: "#3F250B",
        padding: '15px', 
        borderRadius: "20%" 
      }}>
        <Well stones={30} playerName={'Player 1'}/>
        <div>
          <div onClick={() => this.props.chooseHole(1, 6)}>
            <Hole stones={[stones[0], stones[1], stones[2], stones[3]]} position={Position.UP}/>
          </div>
          <div onClick={() => this.props.chooseHole(2, 1)}>
            <Hole stones={[stones[4], stones[5], stones[6], stones[7]]} position={Position.DOWN}/>
          </div>
        </div>
        <div>
          <div onClick={() => this.props.chooseHole(1, 5)}>
            <Hole stones={[stones[8], stones[9], stones[10], stones[11]]} position={Position.UP}/>
          </div>
          <div onClick={() => this.props.chooseHole(2, 2)}>
            <Hole stones={[stones[12], stones[13], stones[14], stones[15]]} position={Position.DOWN}/>
          </div>
        </div>
        <div>
          <div onClick={() => this.props.chooseHole(1, 4)}>
            <Hole stones={[stones[12], stones[13], stones[14], stones[15]]} position={Position.UP}/>
          </div>
          <div onClick={() => this.props.chooseHole(2, 3)}>
            <Hole stones={[stones[12], stones[13], stones[14], stones[15]]} position={Position.DOWN}/>
          </div>
        </div>
        <div>
          <div onClick={() => this.props.chooseHole(1, 3)}>
            <Hole stones={[stones[12], stones[13], stones[14], stones[15]]} position={Position.UP}/>
          </div>
          <div onClick={() => this.props.chooseHole(2, 4)}>
            <Hole stones={[stones[12], stones[13], stones[14], stones[15]]} position={Position.DOWN}/>
          </div>
        </div>
        <div>
          <div onClick={() => this.props.chooseHole(1, 2)}>
            <Hole stones={[stones[12], stones[13], stones[14], stones[15]]} position={Position.UP}/>
          </div>
          <div onClick={() => this.props.chooseHole(2, 5)}>
            <Hole stones={[stones[12], stones[13], stones[14], stones[15]]} position={Position.DOWN}/>
          </div>
        </div>
        <div>
          <div onClick={() => this.props.chooseHole(1, 1)}>
            <Hole stones={[stones[12], stones[13], stones[14], stones[15]]} position={Position.UP}/>
          </div>
          <div onClick={() => this.props.chooseHole(2, 6)}>
            <Hole stones={[stones[12], stones[13], stones[14], stones[15]]} position={Position.DOWN}/>
          </div>
        </div>
        <Well stones={0} playerName={'Player 2'}/>
      </div>
    );
  }
}