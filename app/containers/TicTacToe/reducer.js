import { SAY_HELLO } from './constants';

// The initial state of the App
export const initialState = {
  fieldLength: 9,
  winner: null,
  currentPlayer: 'player_1',
  player_1: {
    value: 'x',
    wins: 0
  },
  player_2: {
    value: 'o',
    wins: 0
  },
  setsPlayed: 0,
};

function ticTacToeReducer(state = initialState, action) {
  switch (action.type) {
    case SAY_HELLO:
      return {
        ...state,
        txt: action.txt.replace(/@/gi, '')
      };
    default:
      return state;
  }
}

export default ticTacToeReducer;
