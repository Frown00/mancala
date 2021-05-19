import _ from "lodash";
import { Bot } from "./Bot";
import { GameStatus, MancalaGame, Player } from "../../mechanics/MancalaGame";

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
  bot: Bot
) {
  if(depth === 0 || isGameOver(game)) {
    return { result: bot.evaluation(game, maximizingPlayer), bestId: id };
  }

  const holesNumber = game.getHolesNumber();
  if(maximizingPlayer) {
    let maxEval = -Infinity;
    let bestId = 0;
    for(let i = 0; i < holesNumber; i++) {
      if(game.isPossibleToChose(i)) {
        const pred = _.cloneDeep(game);
        const prediction = pred.predict(i);
        const isMaximizing = isMaximizingPlayer(prediction);
        const { result } = _minimax(prediction, depth - 1, isMaximizing, i, bot);
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
        const prediction = pred.predict(i);
        const isMaximizing = isMaximizingPlayer(prediction);
        const { result } = _minimax(prediction, depth - 1, isMaximizing, i, bot);
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
  id: number,
  bot: Bot
) {
  if(depth === 0 || isGameOver(game)) {
    return { result: bot.evaluation(game, maximizingPlayer), bestId: id };
  }

  const holesNumber = game.getHolesNumber();
  if(maximizingPlayer) {
    let maxEval = -Infinity;
    let bestId = 0;
    for(let i = 0; i < holesNumber; i++) {
      if(game.isPossibleToChose(i)) {
        const pred = _.cloneDeep(game);
        const prediction = pred.predict(i);
        const isMaximizing = isMaximizingPlayer(prediction);
        const { result } = _alphaBeta(prediction, depth - 1, alpha, beta, isMaximizing, i, bot);
        if(result > maxEval) {
          bestId = i;
        }
        maxEval = Math.max(maxEval, result);
        alpha = Math.max(alpha, result);
        if(beta <= alpha) break;
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
        const prediction = pred.predict(i);
        const isMaximizing = isMaximizingPlayer(prediction);
        const { result } = _alphaBeta(prediction, depth - 1, alpha, beta, isMaximizing, i, bot);
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
  maximizingPlayer: boolean,
  bot: Bot
) {
  return _minimax(game, bot.getDepth(), maximizingPlayer, 0, bot);
}

export function alphaBeta(
  game: MancalaGame, 
  maximizingPlayer: boolean,
  bot: Bot
) {
  return _alphaBeta(game, bot.getDepth(), -Infinity, +Infinity, maximizingPlayer, 0, bot);
}