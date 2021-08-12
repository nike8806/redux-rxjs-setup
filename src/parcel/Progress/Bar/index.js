import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './styles.scss';

/**
 * ProgressBar component
 * @param {string} [className = ''] Additional classes provided here will be added to the top level
 * of the component.
 * @param {number} [current] Indicates the lenght of the bar to showg, lies between 0 an 100%.
 * @param {number} [max = 100] The upper limit of the `current` value.
 * @param {number} [min = 0] The lower limit of the `current` value.
 */
const ProgressBar = ({
  className,
  current,
  max,
  min,
}) => {
  const cn = classnames(
    'progress',
    className,
  );

  return (
    <div className={cn}>
      <div
        aria-label='Progress bar'
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={current}
        className='progress--bar'
        role='progressbar'
        style={{ width: `${current}%` }}
      />
    </div>
  );
};

ProgressBar.defaultProps = {
  className: '',
  max: 100,
  min: 0,
};

ProgressBar.propTypes = {
  className: PropTypes.string,
  current: PropTypes.number.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
};

export default ProgressBar;
