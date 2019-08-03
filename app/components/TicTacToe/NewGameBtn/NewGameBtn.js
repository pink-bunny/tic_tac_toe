import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const NewGameBtn = ({ onStartNewGame }) => (
  <button
    type="button"
    className="ttt-nav__new-game"
    onClick={onStartNewGame}
  >
    New Game
  </button>
)

NewGameBtn.propTypes = {
  onStartNewGame: PropTypes.func
};

export default NewGameBtn;
