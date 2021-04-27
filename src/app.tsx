import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Game from './game/components/game/Game';

function render() {
  ReactDOM.render(<Game />, document.getElementById('root'));
}

render();