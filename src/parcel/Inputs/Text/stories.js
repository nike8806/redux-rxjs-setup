import { action } from '@storybook/addon-actions';
import React, { useEffect, useRef } from 'react';

import TextInput from './index';

const ERROR_TEXT = 'Error message pushes next component down';
const MULTILINE_ERROR_TEXT = 'Error message pushes next component down. Error message pushes next component down. Error message pushes next component down. Error message pushes next component down. Error message pushes next component down';
const DESCRIPTION_TEXT = 'Description line over multiple lines. Description line over multiple lines. Description line over multiple lines. Description line over multiple lines. Description line over multiple lines. Description line over multiple lines. Description line over multiple lines. Description line over multiple lines. Description line over multiple lines. Description line over multiple lines.';

const onTextInputChanges = (value) => action(`Value: ${value}`)();

/**
 * Function to Wrap TextInput component to add focus state
 * @param {object} props
 */
const TextInputFocused = (props) => {
  const r = useRef(null);
  useEffect(() => {
    r.current.focus();
  }, [r]);

  return (<TextInput ref={r} {...props} />);
};

export const NormalEmpty = () => (
  <TextInput
    hint='Empty, Unfocused'
    onChange={onTextInputChanges}
  />
);

export const FocusEmpty = () => (
  <TextInputFocused
    hint='Empty, Focused'
    onChange={onTextInputChanges}
  />
);

export const NormalFilled = () => (
  <TextInput
    initialValue='Filled, Unfocused'
    onChange={onTextInputChanges}
  />
);

export const FocusFilled = () => (
  <TextInputFocused
    initialValue='Filled, Focused'
    onChange={onTextInputChanges}
  />
);

export const NormalFilledError = () => (
  <TextInput
    initialValue='Filled, Unfocused, Error'
    onChange={onTextInputChanges}
    validationMessage={ERROR_TEXT}
    validationStatus={TextInput.STATUS.ERROR}
  />
);

export const FocusFilledError = () => (
  <TextInputFocused
    initialValue='Filled, Focused, Error'
    onChange={onTextInputChanges}
    validationMessage={ERROR_TEXT}
    validationStatus={TextInput.STATUS.ERROR}
  />
);

export const NormalFilledValid = () => (
  <TextInput
    initialValue='Filled, Unfocused, Valid'
    onChange={onTextInputChanges}
    validationStatus={TextInput.STATUS.VALID}
  />
);

export const FocusFilledValid = () => (
  <TextInputFocused
    initialValue='Filled, Focused, Valid'
    onChange={onTextInputChanges}
    validationStatus={TextInput.STATUS.VALID}
  />
);

export const NormalWithMultilineDescription = () => (
  <TextInput
    description={DESCRIPTION_TEXT}
    hint='Empty, Unfocused, Description'
    onChange={onTextInputChanges}
  />
);

export const NormalWithMultilineError = () => (
  <TextInput
    hint='Empty, Unfocused, Error'
    onChange={onTextInputChanges}
    validationMessage={MULTILINE_ERROR_TEXT}
    validationStatus={TextInput.STATUS.ERROR}
  />
);

export const NormalWithMultilineErrorAndDescription = () => (
  <TextInput
    description={DESCRIPTION_TEXT}
    hint='Empty, Unfocused, Error'
    validationMessage={MULTILINE_ERROR_TEXT}
    validationStatus={TextInput.STATUS.ERROR}
  />
);

export const NormalPassword = () => (
  <TextInput
    hint='Empty, Unfocused, Password'
    onChange={onTextInputChanges}
    type={TextInput.TYPES.PASSWORD}
  />
);

export const NormalEmail = () => (
  <TextInput
    hint='Empty, Unfocused, Email'
    onChange={onTextInputChanges}
    type={TextInput.TYPES.EMAIL}
  />
);

export default {
  title: 'Inputs/Text',
};
