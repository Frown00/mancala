import React from 'react';
import Stone from './Stone';

interface IProps {
  stones?: number,
  playerName?: string,
}

export default class Well extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render () {
    let stones = [];
    for(let i = 0; i < this.props.stones; i++) {
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
    return (
      <div style={{ position: "relative", top: "0px"}}>
        <div style={{ fontSize: "12px", display: "flex", justifyContent:"center"}}>{this.props.playerName}</div>
        <div style={{
            width: "50px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "sienna",
            border: "3px solid black",
            display: "flex",
            flexWrap: "wrap",
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center"
          }}>  
          {stones}
        </div>
        <div style={{fontSize: "12px", display: "flex", justifyContent:"center"}}>{this.props.stones ?? 0}</div>
      </div>
     
    );
  }
}