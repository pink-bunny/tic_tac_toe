import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

const InfoTitle = ({ children, className }) => (
  <h2 className={classNames('ttt-title', className)}>
    {children}
  </h2>
);

InfoTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default InfoTitle;
