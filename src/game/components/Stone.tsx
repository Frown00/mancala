import React from 'react';

interface IProps {
  color?: string,
  moveLeft?: number,
  moveRight?: number,
  moveUp?: number,
  moveDown?: number,
  rotation?: number,
}

export default class Stone extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  shouldComponentUpdate(nextProps: IProps, nextState: {}) {
    if (this.props.color === nextProps.color) {
      return false;
    } else {
      return true;
    }
  }

  render () {
    return (
      <div style={{
        width: "8px",
        height: "11px",
        borderRadius: "80%",
        backgroundColor: this.props.color ?? 'lightblue',
        border: "1px solid black",
        position: 'relative',
        left: this.props.moveRight + 'px' ?? '0px',
        right: this.props.moveLeft + 'px' ?? '0px',
        top: this.props.moveDown + 'px' ?? '0px',
        bottom: this.props.moveUp + 'px' ?? '0px',
        transform: `rotate(${this.props.rotation ?? 0}deg)`
      }}>
      </div>
    );
  }
}