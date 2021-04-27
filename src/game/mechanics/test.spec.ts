import { expect } from 'chai';
import { MankalaGame, Player } from './MankalaGame';

describe('Mankala', () => {
  describe('starting game', () => {
    it('test initial players state', () => {
      // Given
      const startingStones = 4;
      // When
      const mankala = new MankalaGame(startingStones);
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
      const mankala = new MankalaGame(starting);
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
      const mankala = new MankalaGame(startingStones);

      // When
     
      // Then
      // log(map);
    });

    it('choose third hole', () => {
      // Given
      const startingStones = 4;
      const mankala = new MankalaGame(startingStones);
      // When
      // Then
      const stones = Array(6).fill(startingStones, 0, 6);
      // log(map);
    });

    it('choose fourth hole', () => {
      // Given
      const startingStones = 4;
      const mankala = new MankalaGame(startingStones);
      // When
      // Then
      // log(map);
    });

    it('choose fifth hole', () => {
      // Given
      const startingStones = 4;
      const mankala = new MankalaGame(startingStones);
      // When
      // Then
      const stones = Array(6).fill(startingStones, 0, 6);
      // log(map);
    });

    it('choose sixth hole', () => {
      // Given
      const startingStones = 4;
      const mankala = new MankalaGame(startingStones);
      // When
      // Then
      const stones = Array(6).fill(startingStones, 0, 6);
      // log(map);
    });
  });
});