import { SAY_HELLO } from './constants';

// The initial state of the App
export const initialState = {
  fieldLength: 9,
  winner: null,
  winX: null,
  winO: null,
  setsPlayed: null,
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
