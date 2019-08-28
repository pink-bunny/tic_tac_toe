import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

const Nav = ({ onBack, onForward, disabled }) => (
  <div className={classNames('ttt-nav', { 'ttt-nav--disabled': disabled })}>
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
);

Nav.propTypes = {
  disabled: PropTypes.bool,
  onBack: PropTypes.func,
  onForward: PropTypes.func
};

export default Nav;
