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

const selectTTTPlayer_1 = () => createSelector(
  selectTicTacToe,
  (ticTacToelState) => ticTacToelState.player_1
);

const selectTTTPlayer_2 = () => createSelector(
  selectTicTacToe,
  (ticTacToelState) => ticTacToelState.player_2
);

export {
  selectTicTacToe,
  selectTTTFieldLength,
  selectTTTSetsPlayed,
  selectTTTPlayer_1,
  selectTTTPlayer_2,
  selectTTTCurrentPlayer,
};
