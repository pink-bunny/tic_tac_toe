import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
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
    }
  };
  createInitalArr() {
    let length = this.props.fieldLength;
    let arr = [];
    for (let i=0; i<length; i++) {
      arr.push({
        key: i,
        value: null,
        visible: true,
        step: null
      });
    }
    return arr
  };

  startNewGame() {
    this.setState({
      currentPlayer: this.props.currentPlayer,
      finishedGame: false,
      draw: false,
      items: this.createInitalArr()
    })
  };

  handleClick(i) {
    // Update items array
    let updatedItemsArr = this.state.items;
    let currentPlayerName = this.state.currentPlayer;
    updatedItemsArr[i] = {
      ...this.state.items[i],
      value: this.props[currentPlayerName].value,
      disabled: true,
      step: this.state.totalSteps + 1
    };

    this.setState({
      currentPlayer: (currentPlayerName === 'player_1' ? 'player_2' : 'player_1'),
      items: updatedItemsArr,
      totalSteps: this.state.totalSteps + 1,
      toggledStep: this.state.toggledStep + 1
    });

    this.checkWinner(currentPlayerName);
  };

  clickBack() {
    let currentStep = this.state.toggledStep - 1;
    let arr = this.state.items;
    arr.map((item) => {
      if (item.step > currentStep){
        item.visible = false;
      }
    });

    if (currentStep >= 0) {
      this.setState({
        toggledStep: currentStep,
        items: arr
      });
    };
  };

  clickForward() {
    let currentStep = this.state.toggledStep + 1;
    let arr = this.state.items;
    arr.map((item) => {
      if (item.step <= currentStep){
        item.visible = true;
      }
    });

    if (currentStep <= this.state.totalSteps) {
      this.setState({
        toggledStep: currentStep,
        items: arr
      });
    };
  };

  checkWinner(currentPlayerName) {
    let checkedSign = this.props[currentPlayerName].value;
    let stringLength = Math.sqrt(this.props.fieldLength);
    let arr = this.state.items;
    let multiArr = [];
    let horizontalArr = [];
    let verticalArr = [];
    let diagonalTLRB = [];
    let diagonalLBRT = [];
    let winningArray = [];

    // Multidimentional array
    let multiStart = 0;
    let multiEnd = multiStart + stringLength;
    for (let i=0; i < stringLength; i++) {
      multiArr.push(arr.slice(multiStart, multiEnd));
      multiStart = multiEnd;
      multiEnd = multiStart + stringLength;
    }

    // Horizontal
    horizontalArr = multiArr.slice();

    // Vertical
    for (let el=0; el < stringLength; el++) {
      let subArr = [];
      for (let r=0; r < stringLength; r++) {
        subArr.push(multiArr[r][el]);
      }
      verticalArr.push(subArr);
    }

    // Diagonal top-left/right-bottom
    for(let i=0; i < stringLength; i++) {
      diagonalTLRB.push(multiArr[i][i]);
    }

    // Diagonal left-bottom/top-right
    let el = stringLength - 1;
    for(let i=0; i < stringLength; i++) {
      diagonalLBRT.push(multiArr[i][el]);
      el--
    }

    // Merge winning combination
    winningArray = [...horizontalArr, ...verticalArr, diagonalTLRB, diagonalLBRT];

    // Define winner
    let winnerCombination;
    for(let i=0; i<winningArray.length; i++) {
      if(winningArray[i].every( (val, i, arr) => val.value === checkedSign )){
        winnerCombination = winningArray[i];
      }
    }

    // Highlight win combination
    if (winnerCombination) {
      for(let i=0; i<winnerCombination.length; i++) {
        winnerCombination.every( (val, i, arr) => val.className="ttt-field__item--win");
      }
      this.setState({
        finishedGame: true
      });
      this.props.onIncreaseTotalSets();
      this.props.onIncreasePlayerWin(currentPlayerName);
    }

    // Draw
    if (arr.every( (val, i, arr) => val.value )){
      this.setState({
        draw: true
      });
      this.props.onIncreaseTotalSets();
    }
  }

  componentWillMount(){
    this.setState({
      currentPlayer: this.props.currentPlayer,
      items: this.createInitalArr()
    })
  }

  render() {
    let { items, finishedGame, draw } = this.state;
    let { setsPlayed, player_1, player_2, onIncreaseTotalSets, onIncreasePlayerWin } = this.props;
    let player = this.state.currentPlayer;

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
            {` "${player_1.value}" `}
            wins:
            <strong>{` ${player_1.wins}`}</strong>
          </p>
          <p className="ttt-result__item">
            Player
            {` "${player_2.value}" `}
            wins:
            <strong>{` ${player_2.wins}`}</strong>
          </p>
        </div>

        {finishedGame &&
          <h2 className="ttt-title ttt-title--win">
            <span className="ttt-title__sign">{this.props[player].value} </span>
            is winner. Our congatulations!
          </h2>
        }
        {draw &&
          <h2 className="ttt-title ttt-title--draw">
            None of the players won.
          </h2>
        }
        {!finishedGame && !draw ?
          <h2 className="ttt-title">
            It is
            <span className="ttt-title__sign"> {this.props[player].value} </span>
            turn.
          </h2>
          :
          null
        }

        <div className="ttt-field-wrap">
          {finishedGame || draw ?
            <button
              type="button"
              className="ttt-nav__new-game"
              onClick={this.startNewGame.bind(this)}
            >
              New Game
            </button>
            :
            null
          }
          <div className="ttt-field">
            {items.map((item, index) =>
              <button
                type="button"
                disabled={item.disabled}
                key={item.key}
                onClick={!item.disabled  && !finishedGame ? this.handleClick.bind(this, index) : undefined}
                className={`ttt-field__item ${item.className}`}
              >
                {item.visible && item.value}
              </button>
            )}
          </div>

          <div className="ttt-nav">
            <button
              button="button"
              className="ttt-nav__btn"
              onClick={this.clickBack.bind(this)}
            >
               Step Back
            </button>
            <button
              button="button"
              className="ttt-nav__btn"
              onClick={this.clickForward.bind(this)}
            >
              Step Forward
            </button>
          </div>
        </div>
      </section>
    );
  }
}

TicTacToe.propTypes = {
  fieldLength: PropTypes.number,
  setsPlayed: PropTypes.number,
  onIncreaseTotalSets: PropTypes.func,
  onIncreasePlayerWin: PropTypes.func
};
