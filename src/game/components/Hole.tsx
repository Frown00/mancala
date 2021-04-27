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
  stones?: any[],
  hoverOn?: boolean
}

export default class Hole extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      active: false,
      focus: false,
      hover: false
    }
    this.afterClick = this.afterClick.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
    this.toggleFocus = this.toggleFocus.bind(this);
  }

  toggleHover() {
    if(this.props.hoverOn) {
      this.setState({ hover: !this.state.hover })
    }
  }

  afterClick() {
    this.setState({ hover: false })
  }

  toggleFocus() {
    this.setState({focus: !this.state.focus})
  }

  render () {
    let holeStyle: CSSProperties = {
      width: "55px",
      height: "45px",
      boxSizing: "border-box",
      borderRadius: "50%",
      backgroundColor: "peru",
      border: "2px solid black",
      display: "flex",
      flexWrap: "wrap",
      overflow: "hidden",
      position: "relative",
      margin: "3px",
      padding: "2px",
      justifyContent: "center",
      alignItems: "center",
    };
    if(this.state.hover) {
      holeStyle.backgroundColor = 'brown';
      holeStyle.border = "3px solid black";
    } else {
      holeStyle.backgroundColor =  "peru";
      holeStyle.border = "2px solid black";
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
          onMouseOut={this.afterClick} 
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