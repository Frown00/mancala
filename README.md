# Mancala (Kalah)
Game created as a university project to learn how min-max and alpha-beta algorithms works and how to program them.\
It's an adaptation of the real board game with the same name.

## Rules ([wiki][rules])
The game provides a Kalah board and a number of seeds or counters. The board has 6 small pits, called houses, on each side; and a big pit, called an end zone or store, at each end. The object of the game is to capture more seeds than one's opponent.
1. At the beginning of the game, four seeds are placed in each house. This is the traditional method.
2. Each player controls the six houses and their seeds on the player's side of the board. The player's score is the number of seeds in the store to their right.
3. Players take turns sowing their seeds. On a turn, the player removes all seeds from one of the houses under their control. Moving counter-clockwise, the player drops one seed in each house in turn, including the player's own store but not their opponent's.
4. If the last sown seed lands in an empty house owned by the player, and the opposite house contains seeds, both the last seed and the opposite seeds are captured and placed into the player's store.
5. If the last sown seed lands in the player's store, the player gets an additional move. There is no limit on the number of moves a player can make in their turn.
6. When one player no longer has any seeds in any of their houses, the game ends. The other player moves all remaining seeds to their store, and the player with the most seeds in their store wins.

It is possible for the game to end in a draw.

## Game Preview
![alt text][preview]

## Bots
Each bot has a name and his own tactic:
  * Stefan - only focus on points (stone) outcome
  * Zbigniew - points outcome + focus on capturing enemy stones
  * Janusz - points outcome + focus on capturing enemy stones + focus on getting exact winning amount (25)\

They are configurable through menu by:
  - choosing predicting algorithm (min-max or alpha-beta)
  - depth 

### Bot vs Bot
![alt text][bot_vs_bot]

You may set up a game where two bots playing with each other and testing which one is better.


[bot_vs_bot]: https://github.com/Frown00/mancala/blob/master/assets/sc2.PNG?raw=true "Bot vs Bot playing"
[preview]: https://github.com/Frown00/mancala/blob/master/assets/Animation.gif?raw=true "Application preview"
[rules]: https://en.wikipedia.org/wiki/Kalah "Rules of the game"
