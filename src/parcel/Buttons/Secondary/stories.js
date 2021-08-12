import { action } from '@storybook/addon-actions';
import React, { useEffect, useRef } from 'react';

import SecondaryButton from './index';

export default {
  title: 'Buttons/Secondary',
};

/**
 * Function to Wrap SecondaryButton component to add focus state
 * @param {object} props
 */
const SecondaryButtonFocused = (props) => {
  const r = useRef(null);
  useEffect(() => {
    r.current.focus();
  }, [r]);

  return (<SecondaryButton ref={r} {...props} />);
};

const handleClick = () => action('clicked!')();

export const disabled = () => <SecondaryButton disabled label='disabled' onClick={handleClick} />;
export const normal = () => <SecondaryButton label='normal' onClick={handleClick} />;
export const focused = () => <SecondaryButtonFocused label='focused' onClick={handleClick} />;
