import { expect } from 'chai';
import _ from 'lodash';
import { BotStefan } from '../components/bots/BotStefan';
import { MancalaGame, Player } from './MancalaGame';
import { alphaBeta, minimax } from '../components/bots/minimax';
import { Algorithm } from '../components/bots/Bot';

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
    it.only('minimax and alpha beta should return same value in first turn', function() {
      this.timeout(10000);
      // Given
      const startingStones = 4;
      const game = new MancalaGame(startingStones);
      const minBot = new BotStefan(5, Algorithm.MINIMAX);
      const alphaBot = new BotStefan(5, Algorithm.ALPHA_BETA);
      // const minBot2 = new BotStefan(5, Algorithm.MINIMAX);
      // const alphaBot2 = new BotStefan(10, Algorithm.ALPHA_BETA);
      // When
      const max1 = minBot.nextMove(game, true);
      const max2 = alphaBot.nextMove(game, true);
      const min1 = minBot.nextMove(game, false);
      const min2 = alphaBot.nextMove(game, false);
      console.log(max1, max2, min1, min2);
      // Then
      expect(max1.bestId).to.be.equal(max2.bestId);
      expect(max1.result).to.be.equal(max2.result);
      expect(min1.bestId).to.be.equal(min1.bestId);
      expect(min2.result).to.be.equal(min2.result);
      // console.log(minBot2.nextMove(game,true), alphaBot2.nextMove(game, true));
      // console.log(minBot2.nextMove(game,false), alphaBot2.nextMove(game, false));

    });
  });
});