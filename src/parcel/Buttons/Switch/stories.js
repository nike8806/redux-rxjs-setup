import { action } from '@storybook/addon-actions';
import React, { useEffect, useRef } from 'react';

import Switch from './index';

export default {
  title: 'Buttons/Switch',
};

/**
 * Function to Wrap Switch component to add focus state
 * @param {object} props
 */
const SwitchFocused = (props) => {
  const r = useRef(null);
  useEffect(() => {
    r.current.focus();
  }, [r]);

  return (<Switch ref={r} {...props} />);
};

/**
 * Function that handles the switch state
 * @param {boolean} value Current switch status returned when any change is detected
 */
const handleSwitch = (value) => action(`On: ${value}`)();

export const normalOff = () => <Switch onSwitch={handleSwitch} />;
export const normalOn = () => <Switch onSwitch={handleSwitch} on />;
export const focusOff = () => <SwitchFocused onSwitch={handleSwitch} />;
export const focusOn = () => <SwitchFocused onSwitch={handleSwitch} on />;
export const normalOffDisabled = () => <Switch disabled onSwitch={handleSwitch} />;
export const normalOnDisabled = () => <Switch disabled on onSwitch={handleSwitch} />;
