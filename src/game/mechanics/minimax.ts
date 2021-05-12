import _ from "lodash";
import { GameStatus, MancalaGame, Player } from "./MancalaGame";

function isMaximizingPlayer(game: MancalaGame) {
  const turn = game.whoseTurn();
  return turn === Player._1;
}

function isGameOver(game: MancalaGame) {
  return game.getStatus() === GameStatus.FINISHED;
}

function _minimax(
  game: MancalaGame, 
  depth: number, 
  maximizingPlayer: boolean, 
  id: number,
) {
  if(depth === 0 || isGameOver(game)) {
    return { result: game.getPointsDiff(), bestId: id };
  }

  const holesNumber = game.getHolesNumber();
  if(maximizingPlayer) {
    let maxEval = -Infinity;
    let bestId = 0;
    for(let i = 0; i < holesNumber; i++) {
      if(game.isPossibleToChose(i)) {
        const pred = _.cloneDeep(game);
        const isMaximizing = isMaximizingPlayer(pred);
        const { result } = _minimax(pred.predict(i), depth - 1, isMaximizing, i);
        if(result > maxEval) {
          bestId = i;
        }
        maxEval = Math.max(maxEval, result);
      }
    }
    // console.log('MAX', maxEval);
    return { result: maxEval, bestId };
  } else {
    let minEval = +Infinity;
    let bestId = 0;
    for(let i = 0; i < holesNumber; i++) {
      if(game.isPossibleToChose(i)) {
        const pred = _.cloneDeep(game);
        const isMaximizing = isMaximizingPlayer(pred);
        const { result } = _minimax(pred.predict(i), depth - 1, isMaximizing, i);
        if(result < minEval) {
          bestId = i;
        }
        minEval = Math.min(minEval, result);
      }
    }
    // console.log('MIN', minEval);
    return { result: minEval, bestId };
  }
}

function _alphaBeta( 
  game: MancalaGame, 
  depth: number, 
  alpha: number, 
  beta: number, 
  maximizingPlayer: boolean,
  id: number
) {
  if(depth === 0 || isGameOver(game)) {
    return { result: game.getPointsDiff(), bestId: id };
  }

  const holesNumber = game.getHolesNumber();
  if(maximizingPlayer) {
    let maxEval = -Infinity;
    let bestId = 0;
    for(let i = 0; i < holesNumber; i++) {
      if(game.isPossibleToChose(i)) {
        const pred = _.cloneDeep(game);
        const isMaximizing = isMaximizingPlayer(pred);
        const { result } = _alphaBeta(pred.predict(i), depth - 1, alpha, beta, isMaximizing, i);
        if(result > maxEval) {
          bestId = i;
        }
        maxEval = Math.max(maxEval, result);
        alpha = Math.max(alpha, result);
        if(alpha >= beta) break;
      }
    }
    // console.log('MAX', maxEval);
    return { result: maxEval, bestId };
  } else {
    let minEval = +Infinity;
    let bestId = 0;
    for(let i = 0; i < holesNumber; i++) {
      if(game.isPossibleToChose(i)) {
        const pred = _.cloneDeep(game);
        const isMaximizing = isMaximizingPlayer(pred);
        const { result } = _alphaBeta(pred.predict(i), depth - 1, alpha, beta, isMaximizing, i);
        if(result < minEval) {
          bestId = i;
        }
        minEval = Math.min(minEval, result);
        beta = Math.min(beta, result);
        if(beta <= alpha) break;
      }
    }
    // console.log('MIN', minEval);
    return { result: minEval, bestId };
  }
}

export function minimax(
  game: MancalaGame, 
  depth: number, 
  maximizingPlayer: boolean
) {
  return _minimax(game, depth, maximizingPlayer, 0);
}

export function alphaBeta(
  game: MancalaGame, 
  depth: number, 
  maximizingPlayer: boolean
) {
  return _alphaBeta(game, depth, -Infinity, +Infinity, maximizingPlayer, 0);
}