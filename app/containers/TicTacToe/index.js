import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentTTTFieldLength } from './selectors';
import TicTacToe from './TicTacToe';

export default connect(
  createStructuredSelector({
    fieldLength: makeSelectCurrentTTTFieldLength()
  })
)(TicTacToe);
