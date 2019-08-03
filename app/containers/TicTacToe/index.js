import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectTTTFieldLength,
  selectTTTSetsPlayed,
  selectTTTPlayer1,
  selectTTTPlayer2,
  selectTTTCurrentPlayer
} from './selectors';
import {
  increaseTotalSets,
  increasePlayerWin
} from './actions';
import TicTacToe from './TicTacToe';

const mapDispatchToProps = (dispatch) => ({
  onIncreaseTotalSets: () => dispatch(increaseTotalSets()),
  onIncreasePlayerWin: (pl) => dispatch(increasePlayerWin(pl))
});

const mapStateToProps = createStructuredSelector({
  fieldLength: selectTTTFieldLength(),
  currentPlayer: selectTTTCurrentPlayer(),
  setsPlayed: selectTTTSetsPlayed(),
  player1: selectTTTPlayer1(),
  player2: selectTTTPlayer2(),
});


export default connect(mapStateToProps, mapDispatchToProps)(TicTacToe);
