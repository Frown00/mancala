import React from "react";
import { Player, PlayerState } from "../../mechanics/MankalaGame";
import Stone from "../Stone";
import { IState } from "./Game";
import { IBoardState } from "./types";

export function genereteStones(amount: number) {
  const stones = [];
  for(let i = 0; i < amount; i++) {
    const random = Math.floor(Math.random() * 4);
    const move = Math.floor(Math.random() * 3);
    const rotation = Math.floor(Math.random() * 180);
    if(random === 0) {
      stones.push(<Stone key={i} moveUp={move} rotation={rotation} color={"yellow"}/>);
    } else if(random === 1) {
      stones.push(<Stone key={i} moveDown={move} rotation={rotation} color={"red"}/>);
    }
    else if(random === 2) {
      stones.push(<Stone key={i} moveLeft={move} rotation={rotation} color={"green"}/>);
    } else if(random === 3) {
      stones.push(<Stone key={i} moveRight={move} rotation={rotation} color={"blue"}/>);
    }
  }
  return stones;
}

export function initialHolesWithStones(
  holesAmount: number, 
  stonesInEachHole: number,
  stones: JSX.Element[]
) {
  const holes1: JSX.Element[][] = [];
  const holes2: JSX.Element[][] = [];
  let sId = 0;
  for(let i = 0; i < holesAmount; i++) {
    holes1.push([]);
    holes2.push([]);
    for(let j = 0; j < stonesInEachHole; j++) {
      const stone1 = stones[sId];
      const stone2 = stones[sId + 1];
      holes1[i].push(stone1);
      holes2[i].push(stone2);
      sId += 2;
    }
  }
  return { holes1, holes2 };
}

export function moveStones(
  playerBoard: IBoardState,
  stateBefore: PlayerState, 
  stateAfter: PlayerState,
  stonesToSplit: JSX.Element[]
) {
  for(let i = 0; i < stateAfter.stones.length; i++) {
    const before = stateBefore.stones[i];
    const after = stateAfter.stones[i];
    if(after > before) {
      const stonesAmount = after - before;
      for(let s = 0; s < stonesAmount; s++) {
        playerBoard.holes[i].push(stonesToSplit[0]);
        stonesToSplit.splice(0, 1);
      }
    }
  }
  const earnedPoints = stateAfter.points - stateBefore.points;
  for(let i = 0; i < earnedPoints; i++) {
    playerBoard.well.push(stonesToSplit[0]);
    stonesToSplit.splice(0, 1);
  }
}

export function getTurnStates(state: IState, actualPlayer: Player) {
  if(actualPlayer === Player._1) {
    const choosingPlayer = state.player1;
    const enemyPlayer = state.player2;
    return { 
      enemy: Player._2,
      choosingPlayer,
      enemyPlayer,
      player1: choosingPlayer,
      player2: enemyPlayer
    }
  }
  const choosingPlayer = state.player2;
  const enemyPlayer = state.player1;
  return {
    enemy: Player._1,
    choosingPlayer,
    enemyPlayer,
    player1: enemyPlayer,
    player2: choosingPlayer
  }
}