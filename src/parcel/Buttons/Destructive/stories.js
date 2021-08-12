import { action } from '@storybook/addon-actions';
import React, { useEffect, useRef } from 'react';

import DestructiveButton from './index';

export default {
  title: 'Buttons/Destructive',
};

/**
 * Function to Wrap DestructiveButton component to add focus state
 * @param {object} props
 */
const DestructiveButtonFocused = (props) => {
  const r = useRef(null);
  useEffect(() => {
    r.current.focus();
  }, [r]);

  return (<DestructiveButton ref={r} {...props} />);
};

const handleClick = () => action('clicked!')();

export const disabled = () => <DestructiveButton disabled label='disabled' onClick={handleClick} />;
export const normal = () => <DestructiveButton label='normal' onClick={handleClick} />;
export const focused = () => <DestructiveButtonFocused label='focused' onClick={handleClick} />;
