import React from 'react';
import Stone from './Stone';

interface IProps {
  stones?: any[],
  playerName?: string,
}

export default class Well extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render () {
    return (
      <div style={{ position: "relative", top: "0px"}}>
        <div style={{ fontSize: "12px", display: "flex", justifyContent:"center"}}>{this.props.playerName}</div>
        <div style={{
            width: "80px",
            height: "100px",
            boxSizing: "border-box",
            borderRadius: "50%",
            backgroundColor: "sienna",
            border: "3px solid black",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            flexWrap: "wrap",
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center"
          }}>  
          {this.props.stones}
        </div>
        <div style={{fontSize: "12px", display: "flex", justifyContent:"center"}}>{this.props.stones.length ?? 0}</div>
      </div>
     
    );
  }
}