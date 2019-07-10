import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import './style.scss';


export default function NotFound() {
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

      <div className="ttt-field">
        <div className="ttt-field__item"></div>
        <div className="ttt-field__item"></div>
        <div className="ttt-field__item"></div>
        <div className="ttt-field__item"></div>
        <div className="ttt-field__item"></div>
        <div className="ttt-field__item"></div>
        <div className="ttt-field__item"></div>
        <div className="ttt-field__item"></div>
        <div className="ttt-field__item"></div>
      </div>

      <div className="ttt-result">
        <p className="ttt-result__item">Sets Played: <span>2</span></p>
        <p className="ttt-result__item">Player 1 wins: <span>2</span></p>
        <p className="ttt-result__item">Player 2 wins: <span>2</span></p>
      </div>
    </article>
  );
}
