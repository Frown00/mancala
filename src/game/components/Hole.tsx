import React, { CSSProperties } from 'react';
import Stone from './Stone';

export enum Position {
  UP,
  DOWN
}

interface IState {
  hover: boolean,
  active: boolean,
  focus: boolean
}

interface IProps {
  position: Position
  stones?: any[]
}

export default class Hole extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      active: false,
      focus: false,
      hover: false
    }
    this.toggleActive = this.toggleActive.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
    this.toggleFocus = this.toggleFocus.bind(this);
  }

  toggleHover() {
    this.setState({ hover: !this.state.hover })
  }

  toggleActive() {
    this.setState({active: !this.state.active})
  }

  toggleFocus() {
    this.setState({focus: !this.state.focus})
  }

  render () {
    let holeStyle: CSSProperties = {
      width: "50px",
      height: "40px",
      boxSizing: "border-box",
      borderRadius: "50%",
      backgroundColor: "peru",
      border: "2px solid black",
      display: "flex",
      flexWrap: "wrap",
      overflow: "hidden",
      position: "relative",
      margin: "3px",
      justifyContent: "center",
      alignItems: "center",
    };
    if(this.state.hover) {
      holeStyle.backgroundColor = 'brown';
      holeStyle.border = "3px solid black";
    } 
    
    return (
      <div>
        {
          this.props.position === Position.UP ?
            <div style={{fontSize: "12px", display: "flex", justifyContent:"center"}}>{this.props.stones.length}</div>
          : ''
        }
        <div style={holeStyle} 
          onMouseOver={this.toggleHover} 
          onMouseOut={this.toggleHover} 
        >
          {this.props.stones}
        </div>
        {
          this.props.position === Position.DOWN ?
            <div style={{fontSize: "12px", display: "flex", justifyContent:"center"}}>{this.props.stones.length}</div>
          : ''
        }
      </div>
      
    );
  }
}