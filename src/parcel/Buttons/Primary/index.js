import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

import './styles.scss';

/**
 * PrimaryButton component
 * @param {string} [className = ''] Additional classes provided here will be added to the top level
 * of the component.
 * @param {string} [disabled = false] Flag to disable button interaction.
 * @param {string} [label = ''] Copy for the button. Also used for the aria-label
 * @param {func} [onClick = () => {}] Callback for click interaction.
 */
const PrimaryButton = forwardRef(({
  className,
  disabled,
  label,
  onClick,
}, ref) => {
  const cn = classnames('button--primary', className);

  return (
    <button
      className={cn}
      disabled={disabled}
      onClick={onClick}
      ref={ref}
      type='button'
    >
      {label}
    </button>
  );
});

PrimaryButton.displayName = 'Primary Button';

PrimaryButton.defaultProps = {
  className: '',
  disabled: false,
  label: '',
  onClick: () => {},
};

PrimaryButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

export default PrimaryButton;
