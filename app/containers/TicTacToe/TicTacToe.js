import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './style.scss';

export default class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayerMove: 'player_x',
      player_x: 'x',
      player_o: 'o',
      items: []
    }
  };
  handleClick(i){
    // Update items array
    let updatedItemsArr = this.state.items;
    let playerSign = this.state.currentPlayerMove
    updatedItemsArr[i] = this.state[playerSign];

    // Update current player move
    let currentPlayerMove = this.state.currentPlayerMove;

    this.setState({
      ...this.state,
      currentPlayerMove: (currentPlayerMove === 'player_x' ? 'player_o' : 'player_x'),
      items: updatedItemsArr
    })
  };

  componentWillMount(){
    let length = this.props.fieldLength;
    let arr = [];
    for (let i=0; i<length; i++) {
      arr.push(null);
    }
    this.setState({ items: arr })
  }

  render() {
    let items = this.state.items

    return (
      <article className="ttt">
        <Helmet>
          <title>Tic Tac Toe</title>
        </Helmet>

        <div className="ttt-nav">
          <Link className="ttt-nav__btn" to="/">
             Step Back
          </Link>
          <Link className="ttt-nav__btn" to="/features">
            Step Forward
          </Link>
        </div>
        <p>It is {this.state.currentPlayerMove} turn </p>

        <div className="ttt-field">
          {items.map((item, index) =>
            <div
              key={index}
              onClick={this.handleClick.bind(this, index)}
              className="ttt-field__item"
            >
              {item}
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
