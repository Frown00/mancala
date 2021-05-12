import { expect } from 'chai';
import _ from 'lodash';
import { MancalaGame, Player } from './MancalaGame';
import { alphaBeta, minimax } from './minimax';
import { Leaf, Node } from './Tree';

describe('Mankala', () => {
  describe('starting game', () => {
    it('test initial players state', () => {
      // Given
      const startingStones = 4;
      // When
      const mankala = new MancalaGame(startingStones);
      const player1 = mankala.getPlayerState(Player._1);
      const player2 = mankala.getPlayerState(Player._2);
      // Then
      const stones = Array(6).fill(startingStones, 0, 6);
      expect(player1.stones).to.be.eql(stones);
      expect(player2.stones).to.be.eql(stones);
      // log(map);
    });
  });

  describe('first turn', () => {
    it('choose first hole', () => {
      // Given
      const starting = 4;
      const mankala = new MancalaGame(starting);
      // When
      const first = 1;
      mankala.turn(first);
      // Then
      const player1 = mankala.getPlayerState(Player._1);
      expect(player1.stones).to.be.eql([0, 5, 5, 5, 5, 4]);
      // log(map);
    });

    it('choose second hole', () => {
      // Given
      const startingStones = 4;
      const mankala = new MancalaGame(startingStones);

      // When
     
      // Then
      // log(map);
    });

    it('choose third hole', () => {
      // Given
      const startingStones = 4;
      const mankala = new MancalaGame(startingStones);
      // When
      // Then
      const stones = Array(6).fill(startingStones, 0, 6);
      // log(map);
    });

    it('choose fourth hole', () => {
      // Given
      const startingStones = 4;
      const mankala = new MancalaGame(startingStones);
      // When
      // Then
      // log(map);
    });

    it('choose fifth hole', () => {
      // Given
      const startingStones = 4;
      const mankala = new MancalaGame(startingStones);
      // When
      // Then
      const stones = Array(6).fill(startingStones, 0, 6);
      // log(map);
    });

    it('choose sixth hole', () => {
      // Given
      const startingStones = 4;
      const mankala = new MancalaGame(startingStones);
      // When
      // Then
      const stones = Array(6).fill(startingStones, 0, 6);
      // log(map);
    });
  });
});

describe('BOT', () => {
  describe('reacting to current state', () => {
    it.only('minimax and alpha beta should return same value in first turn', () => {
      // Given
      const startingStones = 4;
      const game = new MancalaGame(startingStones);
      // When
      const max1 = minimax(game, 5, true);
      const max2 = alphaBeta(game, 5, true);
      const min1 = minimax(game, 5, false);
      const min2 = alphaBeta(game, 5, false);
      console.log(max1, max2, min1, min2);
      // Then
      expect(max1.bestId).to.be.equal(max2.bestId);
      expect(max1.result).to.be.equal(max2.result);
      expect(min1.bestId).to.be.equal(min1.bestId);
      expect(min2.result).to.be.equal(min2.result);
    });
  });
});