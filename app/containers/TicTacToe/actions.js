/*
 * TicTacToe Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  INCREASE_TOTAL_SETS,
  INCREASE_PLAYER_WIN
} from './constants';

export function increaseTotalSets() {
  return {
    type: INCREASE_TOTAL_SETS
  };
}

export function increasePlayerWin(player) {
  return {
    type: INCREASE_PLAYER_WIN,
    player
  };
}
