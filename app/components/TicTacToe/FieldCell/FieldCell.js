import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FieldCell = ({
  onHandleClick, className, value
}) => (
  <button
    type="button"
    onClick={onHandleClick}
    className={classNames('ttt-field__item', className)}
  >
    { value }
  </button>
);

FieldCell.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onHandleClick: PropTypes.func
};

export default FieldCell;
