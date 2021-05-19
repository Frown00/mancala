import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Menu } from './game/Menu';

function render() {
  ReactDOM.render(<Menu />, document.getElementById('root'));
}

render();