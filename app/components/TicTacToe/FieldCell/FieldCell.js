import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FieldCell = ({
  disabled, onHandleClick, className, visible, value
}) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onHandleClick}
    className={classNames('ttt-field__item', className)}
  >
    {visible && value}
  </button>
);

FieldCell.propTypes = {
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  className: PropTypes.string,
  value: PropTypes.string,
  onHandleClick: PropTypes.func
};

export default FieldCell;
