import ticTacToeReducer from '../reducer';
import {
  increaseTotalSets,
  increasePlayerWin
} from '../actions';

describe('TicTacToe Reducer', () => {
  let state;
  beforeEach(() => {
    state = {
      fieldLength: 9,
      winner: null,
      defaultPlayer: 'player1',
      player1: {
        value: 'x',
        wins: 0
      },
      player2: {
        value: 'o',
        wins: 0
      },
      setsPlayed: 0
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(ticTacToeReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle INCREASE_TOTAL_SETS', () => {
    const expectedResult = {
      ...state,
      setsPlayed: state.setsPlayed + 1
    };
    expect(ticTacToeReducer(state, increaseTotalSets())).toEqual(expectedResult);
  });

  it('should handle INCREASE_PLAYER_WIN', () => {
    const winner = 'player1';
    const expectedResult = {
      ...state,
      [winner]: {
        ...state[winner],
        wins: state[winner].wins + 1
      }
    };
    expect(ticTacToeReducer(state, increasePlayerWin(winner))).toEqual(expectedResult);
  });
});
