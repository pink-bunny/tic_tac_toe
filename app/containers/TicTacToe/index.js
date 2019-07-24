import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectTTTFieldLength,
  selectTTTSetsPlayed,
  selectTTTPlayer_1,
  selectTTTPlayer_2,
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
  player_1: selectTTTPlayer_1(),
  player_2: selectTTTPlayer_2(),
});


export default connect(mapStateToProps, mapDispatchToProps)(TicTacToe);
