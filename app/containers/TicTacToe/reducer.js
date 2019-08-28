import {
  INCREASE_TOTAL_SETS,
  INCREASE_PLAYER_WIN
} from './constants';

// The initial state of the App
export const initialState = {
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
  setsPlayed: 0,
};

function ticTacToeReducer(state = initialState, action) {
  const winner = action.player;
  switch (action.type) {
    case INCREASE_TOTAL_SETS:
      return {
        ...state,
        setsPlayed: state.setsPlayed + 1
      };
    case INCREASE_PLAYER_WIN:
      return {
        ...state,
        [winner]: {
          ...state[winner],
          wins: state[winner].wins + 1
        }
      };
    default:
      return state;
  }
}

export default ticTacToeReducer;
