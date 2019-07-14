import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTicTacToe = (state) => state.ticTacToe || initialState;

const makeSelectCurrentUser = () => createSelector(
  selectTicTacToe,
  (globalState) => globalState.currentUserName
);

export {
  selectTicTacToe,
  makeSelectCurrentUser,
};
