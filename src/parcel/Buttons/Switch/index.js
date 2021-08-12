import classnames from 'classnames';
import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

/**
 * Switch Component
 * @param {string} [className = ''] - Additional classes provided here will be added to the Switch
 * component.
 * @param {boolean} [disabled = false] - Flag to indicate if any interaction with the Switch
 * component is allowed.
 * @param {string} [name = ''] - Copy that will be added to the name and aria-label attributes of
 * the internal button.
 * @param {boolean} [on = false] - Flag to indicate if the Switch is 'on' or 'off'.
 * @param {func} onSwitch - Callback that sends to the parent the current value when the
 * Switch component is clicked.
 */
const SwitchButton = forwardRef(({
  className,
  disabled,
  name,
  on,
  onSwitch,
}, ref) => {
  const [isOn, setOn] = useState(on);
  const cn = classnames('button--switch', className);

  const handleSwitch = () => {
    setOn(!isOn);
    onSwitch(!isOn);
  };

  return (
    <button
      aria-checked={isOn}
      aria-label={name}
      className={cn}
      disabled={disabled}
      name={name}
      onClick={handleSwitch}
      ref={ref}
      role='switch'
      type='button'
    />
  );
});

SwitchButton.displayName = 'Switch Button';

SwitchButton.defaultProps = {
  className: '',
  disabled: false,
  name: '',
  on: false,
};

SwitchButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  on: PropTypes.bool,
  onSwitch: PropTypes.func.isRequired,
};

export default SwitchButton;
