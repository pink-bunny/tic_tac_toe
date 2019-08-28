import {
  selectTicTacToe,
  selectTTTFieldLength,
  selectTTTSetsPlayed,
  selectTTTPlayer1,
  selectTTTPlayer2,
  selectTTTDefaultPlayer
} from '../selectors';

describe('selectTicTacToe', () => {
  it('should select the TicTacToe state', () => {
    const ticTacToeState = {};
    const mockedState = {
      ticTacToe: ticTacToeState,
    };
    expect(selectTicTacToe(mockedState)).toEqual(ticTacToeState);
  });
});

describe('selectTTTFieldLength', () => {
  const tttFieldLength = selectTTTFieldLength();
  it('should select TicTacToe field length', () => {
    const fieldLength = 9;
    const mockedState = {
      ticTacToe: {
        fieldLength
      },
    };
    expect(tttFieldLength(mockedState)).toEqual(fieldLength);
  });
});

describe('selectTTTSetsPlayed', () => {
  const tttFieldSetsPlayed = selectTTTSetsPlayed();
  it('should select TicTacToe played sets', () => {
    const setsPlayed = 0;
    const mockedState = {
      ticTacToe: {
        setsPlayed
      },
    };
    expect(tttFieldSetsPlayed(mockedState)).toEqual(setsPlayed);
  });
});

describe('selectTTTPlayer1', () => {
  const tttPlayer1 = selectTTTPlayer1();
  it('should select TicTacToe player 1', () => {
    const player1 = {};
    const mockedState = {
      ticTacToe: {
        player1
      },
    };
    expect(tttPlayer1(mockedState)).toEqual(player1);
  });
});

describe('selectTTTPlayer2', () => {
  const tttPlayer2 = selectTTTPlayer2();
  it('should select TicTacToe player 2', () => {
    const player2 = {};
    const mockedState = {
      ticTacToe: {
        player2
      },
    };
    expect(tttPlayer2(mockedState)).toEqual(player2);
  });
});

describe('selectTTTDefaultPlayer', () => {
  const tttDefaultPlayer = selectTTTDefaultPlayer();
  it('should select TicTacToe default player', () => {
    const defaultPlayer = 'player2';
    const mockedState = {
      ticTacToe: {
        defaultPlayer
      },
    };
    expect(tttDefaultPlayer(mockedState)).toEqual(defaultPlayer);
  });
});
