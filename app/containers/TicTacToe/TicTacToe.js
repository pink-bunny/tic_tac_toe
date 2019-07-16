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
      items: []
    }
  };
  handleClick(i){
    // Update items array
    let updatedItemsArr = this.state.items;
    let currentPlayerName = this.state.currentPlayer
    updatedItemsArr[i] = {
      ...this.state.items[i],
      value: this.state[currentPlayerName]
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

    console.log('checkedSign', checkedSign);
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
    let items = this.state.items;
    let playerSign = this.state.currentPlayer;

    return (
      <article className="ttt">
        <Helmet>
          <title>Tic Tac Toe</title>
        </Helmet>

        <h2 className="ttt-title">It is <span className="ttt-title__sign">{this.state[playerSign]}</span> turn.</h2>
        <div className="ttt-nav">
          <Link className="ttt-nav__btn" to="/">
             Step Back
          </Link>
          <Link className="ttt-nav__btn" to="/features">
            Step Forward
          </Link>
        </div>

        <div className="ttt-field">
          {items.map((item, index) =>
            <div
              key={item.key}
              onClick={this.handleClick.bind(this, index)}
              className="ttt-field__item"
            >
              {item.value}
            </div>
          )}
        </div>

        <div className="ttt-result">
          <p className="ttt-result__item">Sets Played: <span>2</span></p>
          <p className="ttt-result__item">Player 1 wins: <span>2</span></p>
          <p className="ttt-result__item">Player 2 wins: <span>2</span></p>
        </div>
      </article>
    );
  }
}

TicTacToe.propTypes = {
  fieldLength: PropTypes.number
};
//
