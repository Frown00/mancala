import { Leaf, Node, Tree } from "./Tree";

function _minimax(
  position: Tree<number>, 
  depth: number, 
  alpha: number, 
  beta: number, 
  maximizingPlayer: boolean
) {
  const isGameOver = false;
  if(position instanceof Leaf) {
		return position.value();
	}
  // if(depth === 0 || isGameOver) {
  //   return (<Leaf<number>>position).value();
  // }

  if(maximizingPlayer) {
    let maxEval = -Infinity;
    for(let child of (<Node<number>>position).children()) {
      const evaluate = _minimax(child, depth - 1, alpha, beta, false);
      maxEval = Math.max(maxEval, evaluate);
      alpha = Math.max(alpha, evaluate);
      // if(beta <= alpha) break;
    }
    console.log('MAX', maxEval);
    return maxEval;
  } else {
    let minEval = +Infinity;
    for(let child of (<Node<number>>position).children()) {
      const evaluate = _minimax(child, depth - 1, alpha, beta, true);
      minEval = Math.min(minEval, evaluate);
      beta = Math.min(beta, evaluate);
      // if(beta <= alpha) break;
    }
    console.log('MIN', minEval);
    return minEval;
  }
}

function _alphaBeta() {
  //
}

export function minimax(
  position: Tree<number>, 
  depth: number, 
  maximizingPlayer: boolean
) {
  return _minimax(position, depth, -Infinity, Infinity, maximizingPlayer);
}

export function alphaBeta(
  position: Tree<number>, 
  depth: number, 
  maximizingPlayer: boolean
) {
  return _minimax(position, depth, -Infinity, Infinity, maximizingPlayer);
}