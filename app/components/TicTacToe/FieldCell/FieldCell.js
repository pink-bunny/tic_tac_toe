import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FieldCell = ({
  onHandleClick, className, visible, value
}) => (
  <button
    type="button"
    onClick={onHandleClick}
    className={classNames('ttt-field__item', className)}
  >
    {visible && value}
  </button>
);

FieldCell.propTypes = {
  visible: PropTypes.bool,
  className: PropTypes.string,
  value: PropTypes.string,
  onHandleClick: PropTypes.func
};

export default FieldCell;
