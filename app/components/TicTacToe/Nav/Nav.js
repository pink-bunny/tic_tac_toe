import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Nav = ({ onBack, onForward }) => (
  <div className="ttt-nav">
    <button
      type="button"
      className="ttt-nav__btn"
      onClick={onBack}
    >
       Step Back
    </button>
    <button
      type="button"
      className="ttt-nav__btn"
      onClick={onForward}
    >
      Step Forward
    </button>
  </div>
)

Nav.propTypes = {
  onBack: PropTypes.func,
  onForward: PropTypes.func
};

export default Nav;
