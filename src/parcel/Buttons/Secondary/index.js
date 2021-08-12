import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

import './styles.scss';

/**
 * SecondaryButton component
 * @param {string} [className = ''] Additional classes provided here will be added to the top level
 * of the component.
 * @param {string} [disabled = false] Flag to disable button interaction.
 * @param {string} [label = ''] Copy for the button. Also used for the aria-label
 * @param {func} [onClick = () => {}] Callback for click interaction.
 */
const SecondaryButton = forwardRef(({
  className,
  disabled,
  label,
  onClick,
}, ref) => {
  const cn = classnames('button--secondary', className);

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

SecondaryButton.displayName = 'Secondary Button';

SecondaryButton.defaultProps = {
  className: '',
  disabled: false,
  label: '',
  onClick: () => {},
};

SecondaryButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

export default SecondaryButton;
