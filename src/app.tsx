import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Game from './game/Game';

function render() {
  ReactDOM.render(<Game />, document.getElementById('root'));
}

render();