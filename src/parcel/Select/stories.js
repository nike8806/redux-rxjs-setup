import { action } from '@storybook/addon-actions';
import React, { useEffect, useRef } from 'react';

import Select from './index';

const ERROR_TEXT = 'Error message pushes next component down';
const MULTILINE_ERROR_TEXT = 'Error message pushes next component down. Error message pushes next component down. Error message pushes next component down. Error message pushes next component down. Error message pushes next component down';
const DESCRIPTION_TEXT = 'Description line over multiple lines. Description line over multiple lines. Description line over multiple lines. Description line over multiple lines. Description line over multiple lines. Description line over multiple lines. Description line over multiple lines. Description line over multiple lines. Description line over multiple lines. Description line over multiple lines.';

const OPTIONS = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
  { label: 'Option 6', value: '6' },
];

const onSelectChange = (value) => action(`Value: ${value}`)();

/**
 * Function to Wrap TextInput component to add focus state
 * @param {object} props
 */
const SelectFocused = (props) => {
  const r = useRef(null);
  useEffect(() => {
    r.current.focus();
  }, [r]);

  return (<Select ref={r} {...props} />);
};

export const NormalUnselected = () => (
  <Select
    hint='Unselected, Unfocused'
    onChange={onSelectChange}
    options={OPTIONS}
  />
);

export const FocusUnselected = () => (
  <SelectFocused
    hint='Unselected, Focused'
    onChange={onSelectChange}
    options={OPTIONS}
  />
);

export const NormalSelected = () => (
  <Select
    initialValue={OPTIONS[0].value}
    onChange={onSelectChange}
    options={OPTIONS}
  />
);

export const FocusSelected = () => (
  <SelectFocused
    initialValue={OPTIONS[1].value}
    onChange={onSelectChange}
    options={OPTIONS}
  />
);

export const NormalSelectedError = () => (
  <Select
    initialValue={OPTIONS[2].value}
    onChange={onSelectChange}
    options={OPTIONS}
    validation={{ message: ERROR_TEXT, status: Select.STATUS.ERROR }}
  />
);

export const FocusSelectedError = () => (
  <SelectFocused
    initialValue={OPTIONS[3].value}
    onChange={onSelectChange}
    options={OPTIONS}
    validation={{ message: ERROR_TEXT, status: Select.STATUS.ERROR }}
  />
);

export const NormalSelectedValid = () => (
  <Select
    initialValue={OPTIONS[4].value}
    onChange={onSelectChange}
    options={OPTIONS}
    validation={{ status: Select.STATUS.VALID }}
  />
);

export const FocusSelectedValid = () => (
  <SelectFocused
    initialValue={OPTIONS[5].value}
    onChange={onSelectChange}
    options={OPTIONS}
    validation={{ status: Select.STATUS.VALID }}
  />
);

export const NormalWithMultilineDescription = () => (
  <Select
    description={DESCRIPTION_TEXT}
    hint='Unselected, Unfocused, Description'
    onChange={onSelectChange}
    options={OPTIONS}
  />
);

export const NormalWithMultilineError = () => (
  <Select
    hint='Unselected, Unfocused, Error'
    onChange={onSelectChange}
    options={OPTIONS}
    validation={{ message: MULTILINE_ERROR_TEXT, status: Select.STATUS.ERROR }}
  />
);

export const NormalWithMultilineErrorAndDescription = () => (
  <Select
    description={DESCRIPTION_TEXT}
    hint='Unselected, Unfocused, Error'
    onChange={onSelectChange}
    options={OPTIONS}
    validation={{ message: MULTILINE_ERROR_TEXT, status: Select.STATUS.ERROR }}
  />
);

export default {
  title: 'Select',
};
