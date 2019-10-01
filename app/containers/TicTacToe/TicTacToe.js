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
      winnerIsFound: false,
      draw: false,
      stepsList: [],
      totalSteps: 0,
      toggledStep: 0
    };
  }

  componentWillMount() {
    const { defaultPlayer } = this.props;
    this.setState({
      currentPlayer: defaultPlayer,
      items: this.createInitalArr(),
      stepsList: [
        this.createInitalArr()
      ]
    });
  }

  startNewGame = () => {
    const { defaultPlayer } = this.props;
    this.setState({
      currentPlayer: defaultPlayer,
      items: this.createInitalArr(),
      winnerIsFound: false,
      draw: false,
      stepsList: [
        this.createInitalArr()
      ],
      totalSteps: 0,
      toggledStep: 0
    });
  }

  clickBack = () => {
    const { toggledStep, stepsList } = this.state;
    const backToStep = toggledStep - 1;

    if (backToStep >= 0) {
      this.setState({
        currentPlayer: this.calcPlayerTurn(),
        toggledStep: backToStep,
        items: stepsList[toggledStep - 1]
      });
    }
  }

  clickForward = () => {
    const { toggledStep, totalSteps, stepsList } = this.state;
    const forwardToStep = toggledStep + 1;

    if (forwardToStep <= totalSteps) {
      this.setState({
        currentPlayer: this.calcPlayerTurn(),
        toggledStep: forwardToStep,
        items: stepsList[forwardToStep]
      });
    }
  }

  calcPlayerTurn() {
    const { toggledStep } = this.state;
    if (toggledStep % 2 === 0) {
      return 'player2';
    }
    return 'player1';
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
      items, currentPlayer, toggledStep, stepsList
    } = this.state;
    const { [currentPlayer]: hcCurrentPlayer } = this.props;
    const updatedItemsArr = [...items];
    updatedItemsArr[i] = {
      ...updatedItemsArr[i],
      value: hcCurrentPlayer.value
    };
    // Trim and update steps list
    const stepsListUpdated = [...stepsList];
    stepsListUpdated.length = toggledStep + 1;
    stepsListUpdated.push(updatedItemsArr);

    this.setState({
      currentPlayer: this.calcPlayerTurn(),
      items: updatedItemsArr,
      stepsList: stepsListUpdated,
      totalSteps: toggledStep + 1,
      toggledStep: toggledStep + 1
    }, () => {
      this.checkWinner(currentPlayer);
    });
  }

  checkWinner(currentPlayer) {
    const {
      fieldLength, [currentPlayer]: cwCurrentPlayer, onIncreaseTotalSets, onIncreasePlayerWin
    } = this.props;
    const { items, totalSteps, stepsList } = this.state;
    const checkedSign = cwCurrentPlayer.value;
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
      const updatedItems = [...items];
      const stepsListUpdated = [...stepsList];

      winnerCombination.forEach((i) => {
        updatedItems[i.key] = {
          ...updatedItems[i.key],
          className: 'ttt-field__item--win'
        };
      });
      stepsListUpdated[stepsListUpdated.length - 1] = updatedItems;

      this.setState({
        items: updatedItems,
        stepsList: stepsListUpdated,
        winnerIsFound: true,
        currentPlayer
      });
      onIncreaseTotalSets();
      onIncreasePlayerWin(currentPlayer);
    }

    // Draw
    if (totalSteps === fieldLength && !winnerCombination) {
      this.setState({
        draw: true
      });
      onIncreaseTotalSets();
    }
  }

  render() {
    const {
      items, winnerIsFound, currentPlayer, draw
    } = this.state;
    const {
      setsPlayed, player1, player2, [currentPlayer]: definedCurrentPlayer
    } = this.props;

    return (
      <section className="ttt">
        <Helmet>
          <title>Tic Tac Toe</title>
        </Helmet>

        <ResultsPanel setsPlayed={setsPlayed} player1={player1} player2={player2} />

        {winnerIsFound
          && (
            <InfoTitle className="ttt-title--win">
              <span className="ttt-title__sign">
                {`${definedCurrentPlayer.value} `}
              </span>
              is winner. Our congatulations!
            </InfoTitle>
          )}
        {draw
          && (
            <InfoTitle className="ttt-title--draw">
              None of the players won.
            </InfoTitle>
          )}
        {!winnerIsFound && !draw ? (
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
          {winnerIsFound || draw ? (
            <NewGameBtn onStartNewGame={this.startNewGame} />
          ) : null
          }
          <div className="ttt-field">
            {items.map((item, index) => (
              <FieldCell
                key={item.key}
                value={item.value}
                className={item.className}
                onHandleClick={!item.value && !winnerIsFound ? () => this.handleClick(index) : undefined}
              />
            ))}
          </div>

          <Nav
            disabled={winnerIsFound || draw}
            onBack={!winnerIsFound && !draw ? this.clickBack : undefined}
            onForward={!winnerIsFound && !draw ? this.clickForward : undefined}
          />
        </div>
      </section>
    );
  }
}

TicTacToe.propTypes = {
  player1: PropTypes.object,
  player2: PropTypes.object,
  defaultPlayer: PropTypes.string,
  fieldLength: PropTypes.number,
  setsPlayed: PropTypes.number,
  onIncreaseTotalSets: PropTypes.func,
  onIncreasePlayerWin: PropTypes.func
};
