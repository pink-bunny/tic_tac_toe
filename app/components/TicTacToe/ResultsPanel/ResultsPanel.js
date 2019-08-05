import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const ResultsPanel = ({ setsPlayed, player1, player2 }) => (
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
);

ResultsPanel.propTypes = {
  setsPlayed: PropTypes.number,
  player1: PropTypes.object,
  player2: PropTypes.object
};

export default ResultsPanel;
