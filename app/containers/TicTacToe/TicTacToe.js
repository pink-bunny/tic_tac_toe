import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Nav from '../../components/TicTacToe/Nav';
import NewGameBtn from '../../components/TicTacToe/NewGameBtn';
import InfoTitle from '../../components/TicTacToe/InfoTitle';
import ResultsPanel from '../../components/TicTacToe/ResultsPanel';
import FieldCell from '../../components/TicTacToe/FieldCell';
import './style.scss';

export default class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: null,
      items: [],
      finishedGame: false,
      stepsList: [],
      totalSteps: 0,
      toggledStep: 0
    };
  }

  componentWillMount() {
    const { currentPlayer } = this.props;
    this.setState({
      currentPlayer,
      items: this.createInitalArr(),
      stepsList: [
        this.createInitalArr()
      ]
    });
  }

  startNewGame = () => {
    const { currentPlayer } = this.props;
    this.setState({
      currentPlayer,
      items: this.createInitalArr(),
      finishedGame: false,
      stepsList: [
        this.createInitalArr()
      ],
      totalSteps: 0,
      toggledStep: 0
    });
  }

  clickBack = () => {
    const { toggledStep, stepsList } = this.state;
    const currentStep = toggledStep - 1;
    const arr = stepsList[currentStep];

    if (currentStep >= 0) {
      this.setState({
        currentPlayer: (toggledStep % 2 === 0) ? 'player2' : 'player1',
        toggledStep: currentStep,
        items: arr
      });
    }
  }

  clickForward = () => {
    const { toggledStep, totalSteps, stepsList } = this.state;
    const currentStep = toggledStep + 1;
    const arr = stepsList[currentStep];

    if (currentStep <= totalSteps) {
      this.setState({
        currentPlayer: (toggledStep % 2 === 0) ? 'player2' : 'player1',
        toggledStep: currentStep,
        items: arr
      });
    }
  }

  createInitalArr() {
    const { fieldLength } = this.props;
    const arr = [];
    for (let i = 0; i < fieldLength; i++) {
      arr.push({
        key: i,
        value: null,
        className: ''
      });
    }
    return arr;
  }

  handleClick(i) {
    const {
      items, currentPlayer, totalSteps, toggledStep, stepsList
    } = this.state;
    const currentPlayerName = currentPlayer;
    const { [currentPlayerName]: hcCurrentPlayerName } = this.props;
    const updatedItemsArr = [...items];
    updatedItemsArr[i] = {
      ...updatedItemsArr[i],
      value: hcCurrentPlayerName.value,
      step: totalSteps + 1
    };
    const stepsListUpdated = [...stepsList];
    stepsListUpdated.push(updatedItemsArr);

    this.setState({
      currentPlayer: (currentPlayerName === 'player1' ? 'player2' : 'player1'),
      items: updatedItemsArr,
      stepsList: stepsListUpdated,
      totalSteps: totalSteps + 1,
      toggledStep: toggledStep + 1
    }, () => {
      this.checkWinner(currentPlayerName);
    });
  }

  checkWinner(currentPlayerName) {
    const {
      fieldLength, [currentPlayerName]: cwCurrentPlayerName, onIncreaseTotalSets, onIncreasePlayerWin
    } = this.props;
    const { items, totalSteps } = this.state;
    const checkedSign = cwCurrentPlayerName.value;
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
        finishedGame: true,
        currentPlayer: currentPlayerName
      });
      onIncreaseTotalSets();
      onIncreasePlayerWin(currentPlayerName);
    }

    // Draw
    if (totalSteps === fieldLength - 1) {
      onIncreaseTotalSets();
    }
  }

  render() {
    const {
      items, finishedGame, totalSteps, toggledStep, currentPlayer
    } = this.state;
    const {
      setsPlayed, player1, player2, [currentPlayer]: definedCurrentPlayer, fieldLength
    } = this.props;
    const calcDraw = toggledStep === totalSteps &&  totalSteps === fieldLength;

    return (
      <section className="ttt">
        <Helmet>
          <title>Tic Tac Toe</title>
        </Helmet>

        <ResultsPanel setsPlayed={setsPlayed} player1={player1} player2={player2} />

        {finishedGame
          && (
            <InfoTitle className="ttt-title--win">
              <span className="ttt-title__sign">
                {`${definedCurrentPlayer.value} `}
              </span>
              is winner. Our congatulations!
            </InfoTitle>
          )}
        {calcDraw
          && (
            <InfoTitle className="ttt-title--draw">
              None of the players won.
            </InfoTitle>
          )}
        {!finishedGame && !calcDraw ? (
          <InfoTitle>
            It is
            <span className="ttt-title__sign">
              {` ${definedCurrentPlayer.value} `}
            </span>
            turn.
          </InfoTitle>
        )
          : null
        }

        <div className="ttt-field-wrap">
          {finishedGame || calcDraw ? (
            <NewGameBtn onStartNewGame={this.startNewGame} />
          ) : null
          }
          <div className="ttt-field">
            {items.map((item, index) => (
              <FieldCell
                key={item.key}
                visible={item.visible}
                value={item.value}
                className={item.className}
                onHandleClick={!item.value && !finishedGame ? () => this.handleClick(index) : undefined}
              />
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
