import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTicTacToe = (state) => state.ticTacToe || initialState;

const makeSelectCurrentTTTFieldLength = () => createSelector(
  selectTicTacToe,
  (ticTacToelState) => ticTacToelState.fieldLength
);

export {
  selectTicTacToe,
  makeSelectCurrentTTTFieldLength,
};
