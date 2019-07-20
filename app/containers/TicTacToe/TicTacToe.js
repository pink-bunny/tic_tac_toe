import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './style.scss';

export default class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: 'player_x',
      player_x: 'x',
      player_o: 'o',
      items: [],
      finishedGame: false
    }
  };
  handleClick(i){
    // Update items array
    let updatedItemsArr = this.state.items;
    let currentPlayerName = this.state.currentPlayer
    updatedItemsArr[i] = {
      ...this.state.items[i],
      value: this.state[currentPlayerName],
      disabled: true
    };

    this.setState({
      ...this.state,
      currentPlayer: (currentPlayerName === 'player_x' ? 'player_o' : 'player_x'),
      items: updatedItemsArr
    })
    return this.checkWinner(currentPlayerName);
  };

  checkWinner(currentPlayerName) {
    let checkedSign = this.state[currentPlayerName];
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
        ...this.state,
        finishedGame: true
      })
    }
  }

  componentWillMount(){
    let length = this.props.fieldLength;
    let arr = [];
    for (let i=0; i<length; i++) {
      arr.push({
        key: i,
        value: null
      });
    }
    this.setState({ items: arr })
  }

  render() {
    let { items, finishedGame } = this.state;
    let playerSign = this.state.currentPlayer;

    return (
      <section className="ttt">
        <Helmet>
          <title>Tic Tac Toe</title>
        </Helmet>

        <div className="ttt-result">
          <p className="ttt-result__item">Sets Played: <span>2</span></p>
          <p className="ttt-result__item">Player 1 wins: <span>2</span></p>
          <p className="ttt-result__item">Player 2 wins: <span>2</span></p>
        </div>

        {finishedGame ?
          <h2 className="ttt-title ttt-title--win"><span className="ttt-title__sign">{this.state[playerSign]}</span> is winner. Our congatulations!</h2>
          :
          <h2 className="ttt-title">It is <span className="ttt-title__sign">{this.state[playerSign]}</span> turn.</h2>
        }

        <div className="ttt-field-wrap">
          <div className="ttt-field">
            {items.map((item, index) =>
              <button
                type="button"
                disabled={item.disabled}
                key={item.key}
                onClick={!item.disabled  && !finishedGame && this.handleClick.bind(this, index)}
                className={`ttt-field__item ${item.className}`}
              >
                {item.value}
              </button>
            )}
          </div>

          <div className="ttt-nav">
            <Link className="ttt-nav__btn" to="/">
               Step Back
            </Link>
            <Link className="ttt-nav__btn" to="/features">
              Step Forward
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

TicTacToe.propTypes = {
  fieldLength: PropTypes.number
};
//
