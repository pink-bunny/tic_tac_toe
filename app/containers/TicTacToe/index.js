import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectTTTFieldLength,
  selectTTTSetsPlayed,
  selectTTTPlayer_1,
  selectTTTPlayer_2,
  selectTTTCurrentPlayer
} from './selectors';
import TicTacToe from './TicTacToe';

export default connect(
  createStructuredSelector({
    fieldLength: selectTTTFieldLength(),
    currentPlayer: selectTTTCurrentPlayer(),
    setsPlayed: selectTTTSetsPlayed(),
    player_1: selectTTTPlayer_1(),
    player_2: selectTTTPlayer_2(),
  })
)(TicTacToe);
