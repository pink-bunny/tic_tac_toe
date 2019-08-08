import {
  INCREASE_TOTAL_SETS,
  INCREASE_PLAYER_WIN
} from '../constants';

import {
  increaseTotalSets,
  increasePlayerWin
} from '../actions';

describe('TicTacToe Actions', () => {
  describe('increaseTotalSets', () => {
    it('should increase total sets', () => {
      const expectedResult = {
        type: INCREASE_TOTAL_SETS
      };

      expect(increaseTotalSets()).toEqual(expectedResult);
    });
  });

  describe('increasePlayerWin', () => {
    it('should increase player win', () => {
      const player = 'player1';
      const expectedResult = {
        type: INCREASE_PLAYER_WIN,
        player
      };

      expect(increasePlayerWin(player)).toEqual(expectedResult);
    });
  });
});
