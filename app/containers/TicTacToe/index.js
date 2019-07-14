import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from './selectors';
import TicTacToe from './TicTacToe';

export default connect(
  createStructuredSelector({
    currentUserName: makeSelectCurrentUser()
  })
)(TicTacToe);
