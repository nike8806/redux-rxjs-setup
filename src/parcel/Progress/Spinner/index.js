import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

/**
 * Spinner Component
 * @param {string} [className = ''] - Additional classes provided here will be added to the Spinner
 * component.
 */
const Spinner = ({
  className,
}) => {
  const cn = classnames('progress--spinner', className);

  return (
    <div className={cn}>
      <div
        className='icon'
      />
    </div>
  );
};

Spinner.defaultProps = {
  className: '',
};

Spinner.propTypes = {
  className: PropTypes.string,
};

export default Spinner;
