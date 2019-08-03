import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Nav from '../../components/TicTacToe/Nav';
import NewGameBtn from '../../components/TicTacToe/NewGameBtn';
import InfoTitle from '../../components/TicTacToe/InfoTitle';
import './style.scss';

export default class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: null,
      items: [],
      finishedGame: false,
      draw: false,
      totalSteps: 0,
      toggledStep: 0
    };
  }

  componentWillMount() {
    const { currentPlayer } = this.props;
    this.setState({
      currentPlayer,
      items: this.createInitalArr()
    });
  }

  createInitalArr() {
    const { fieldLength } = this.props;
    const length = fieldLength;
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push({
        key: i,
        value: null,
        visible: true,
        step: null
      });
    }
    return arr;
  }

  startNewGame = () => {
    const { currentPlayer } = this.props;
    this.setState({
      currentPlayer,
      finishedGame: false,
      draw: false,
      items: this.createInitalArr()
    });
  }

  handleClick(i) {
    const {
      items, currentPlayer, totalSteps, toggledStep
    } = this.state;
    const updatedItemsArr = items;
    const currentPlayerName = currentPlayer;
    updatedItemsArr[i] = {
      ...items[i],
      value: this.props[currentPlayerName].value,
      disabled: true,
      step: totalSteps + 1
    };

    this.setState({
      currentPlayer: (currentPlayerName === 'player1' ? 'player2' : 'player1'),
      items: updatedItemsArr,
      totalSteps: totalSteps + 1,
      toggledStep: toggledStep + 1
    });

    this.checkWinner(currentPlayerName);
  }

  clickBack = () => {
    const { toggledStep, items } = this.state;
    const currentStep = toggledStep - 1;
    const arr = items;
    arr.forEach((item) => {
      if (item.step > currentStep) {
        item.visible = false;
      }
    });

    if (currentStep >= 0) {
      this.setState({
        toggledStep: currentStep,
        items: arr
      });
    }
  }

  clickForward = () => {
    const { toggledStep, items, totalSteps } = this.state;
    const currentStep = toggledStep + 1;
    const arr = items;
    arr.forEach((item) => {
      if (item.step <= currentStep) {
        item.visible = true;
      }
    });

    if (currentStep <= totalSteps) {
      this.setState({
        toggledStep: currentStep,
        items: arr
      });
    }
  }

  checkWinner(currentPlayerName) {
    const { fieldLength } = this.props;
    const { items } = this.state;
    const checkedSign = this.props[currentPlayerName].value;
    const stringLength = Math.sqrt(fieldLength);
    const arr = items;
    const multiArr = [];
    const verticalArr = [];
    const diagonalTLRB = [];
    const diagonalLBRT = [];
    let horizontalArr = [];
    let winningArray = [];

    // Multidimentional array
    let multiStart = 0;
    let multiEnd = multiStart + stringLength;
    for (let i = 0; i < stringLength; i++) {
      multiArr.push(arr.slice(multiStart, multiEnd));
      multiStart = multiEnd;
      multiEnd = multiStart + stringLength;
    }

    // Horizontal
    horizontalArr = multiArr.slice();

    // Vertical
    for (let el = 0; el < stringLength; el++) {
      const subArr = [];
      for (let r = 0; r < stringLength; r++) {
        subArr.push(multiArr[r][el]);
      }
      verticalArr.push(subArr);
    }

    // Diagonal top-left/right-bottom
    for (let i = 0; i < stringLength; i++) {
      diagonalTLRB.push(multiArr[i][i]);
    }

    // Diagonal left-bottom/top-right
    let el = stringLength - 1;
    for (let i = 0; i < stringLength; i++) {
      diagonalLBRT.push(multiArr[i][el]);
      el--;
    }

    // Merge winning combination
    winningArray = [...horizontalArr, ...verticalArr, diagonalTLRB, diagonalLBRT];

    // Define winner
    let winnerCombination;
    for (let i = 0; i < winningArray.length; i++) {
      if (winningArray[i].every((val) => val.value === checkedSign)) {
        winnerCombination = winningArray[i];
      }
    }

    // Highlight win combination
    if (winnerCombination) {
      for (let i = 0; i < winnerCombination.length; i++) {
        winnerCombination.forEach((item) => {
          item.className = 'ttt-field__item--win';
        });
      }
      this.setState({
        finishedGame: true
      });
      this.props.onIncreaseTotalSets();
      this.props.onIncreasePlayerWin(currentPlayerName);
    }

    // Draw
    if (arr.every((val) => val.value)) {
      this.setState({
        draw: true
      });
      this.props.onIncreaseTotalSets();
    }
  }

  render() {
    const {
      items, finishedGame, draw, currentPlayer
    } = this.state;
    const {
      setsPlayed, player1, player2
    } = this.props;

    return (
      <section className="ttt">
        <Helmet>
          <title>Tic Tac Toe</title>
        </Helmet>

        <div className="ttt-result">
          <p className="ttt-result__item">
            Sets Played:
            <strong>{` ${setsPlayed}`}</strong>
          </p>
          <p className="ttt-result__item">
            Player
            {` "${player1.value}" `}
            wins:
            <strong>{` ${player1.wins}`}</strong>
          </p>
          <p className="ttt-result__item">
            Player
            {` "${player2.value}" `}
            wins:
            <strong>{` ${player2.wins}`}</strong>
          </p>
        </div>

        {finishedGame
          && (
            <InfoTitle className="ttt-title--win">
              <span className="ttt-title__sign">{this.props[currentPlayer].value} </span>
              is winner. Our congatulations!
            </InfoTitle>
          )}
        {draw
          && (
            <InfoTitle className="ttt-title--draw">
              None of the players won.
            </InfoTitle>
          )}
        {!finishedGame && !draw ? (
          <InfoTitle>
            It is
            <span className="ttt-title__sign"> {this.props[currentPlayer].value} </span>
            turn.
          </InfoTitle>
        )
          : null
        }

        <div className="ttt-field-wrap">
          {finishedGame || draw ? (
            <NewGameBtn onStartNewGame={this.startNewGame} />
          ) : null
          }
          <div className="ttt-field">
            {items.map((item, index) => (
              <button
                type="button"
                disabled={item.disabled}
                key={item.key}
                onClick={!item.disabled && !finishedGame ? this.handleClick.bind(this, index) : undefined}
                className={`ttt-field__item ${item.className}`}
              >
                {item.visible && item.value}
              </button>
            ))}
          </div>

          <Nav onBack={this.clickBack} onForward={this.clickForward} />
        </div>
      </section>
    );
  }
}

TicTacToe.propTypes = {
  player1: PropTypes.object,
  player2: PropTypes.object,
  currentPlayer: PropTypes.string,
  fieldLength: PropTypes.number,
  setsPlayed: PropTypes.number,
  onIncreaseTotalSets: PropTypes.func,
  onIncreasePlayerWin: PropTypes.func
};
