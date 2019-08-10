import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTicTacToe = (state) => state.ticTacToe || initialState;

const selectTTTFieldLength = () => createSelector(
  selectTicTacToe,
  (ticTacToelState) => ticTacToelState.fieldLength
);

const selectTTTCurrentPlayer = () => createSelector(
  selectTicTacToe,
  (ticTacToelState) => ticTacToelState.currentPlayer
);

const selectTTTSetsPlayed = () => createSelector(
  selectTicTacToe,
  (ticTacToelState) => ticTacToelState.setsPlayed
);

const selectTTTPlayer1 = () => createSelector(
  selectTicTacToe,
  (ticTacToelState) => ticTacToelState.player1
);

const selectTTTPlayer2 = () => createSelector(
  selectTicTacToe,
  (ticTacToelState) => ticTacToelState.player2
);

export {
  selectTicTacToe,
  selectTTTFieldLength,
  selectTTTSetsPlayed,
  selectTTTPlayer1,
  selectTTTPlayer2,
  selectTTTCurrentPlayer
};
