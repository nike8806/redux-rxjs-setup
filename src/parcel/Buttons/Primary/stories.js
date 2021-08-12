import { action } from '@storybook/addon-actions';
import React, { useEffect, useRef } from 'react';

import PrimaryButton from './index';

export default {
  title: 'Buttons/Primary',
};

/**
 * Function to Wrap PrimaryButton component to add focus state
 * @param {object} props
 */
const PrimaryButtonFocused = (props) => {
  const r = useRef(null);
  useEffect(() => {
    r.current.focus();
  }, [r]);

  return (<PrimaryButton ref={r} {...props} />);
};

const handleClick = () => action('clicked!')();

export const disabled = () => <PrimaryButton disabled label='disabled' onClick={handleClick} />;
export const normal = () => <PrimaryButton label='normal' onClick={handleClick} />;
export const focused = () => <PrimaryButtonFocused label='focused' onClick={handleClick} />;
