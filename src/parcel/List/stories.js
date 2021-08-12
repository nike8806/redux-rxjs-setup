import { action } from '@storybook/addon-actions';
import React from 'react';

import List from './index';

export default {
  component: List,
  title: 'List',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const listData = Array.from(Array(10)).map((item, index) => ({ labelPrimary: `Test ${index + 1}` }));
export const listDisabledData = Array.from(Array(10)).map((item, index) => ({ disabled: true, labelPrimary: `Test ${index + 1}` }));
export const listWithSecondaryLabelData = Array.from(Array(10)).map((item, index) => ({ labelPrimary: `Test ${index + 1}`, labelSecondary: 'secondary' }));
export const listDisabledWithSecondaryLabelData = Array.from(Array(10)).map((item, index) => ({ disabled: true, labelPrimary: `Test ${index + 1}`, labelSecondary: 'secondary' }));

export const actionsData = {
  onItemSelected: action('onItemSelected'),
};

export const Default = () => (
  <List
    items={listData}
    {...actionsData}
  />
);

export const DefaultDisabled = () => (
  <List
    items={listDisabledData}
    {...actionsData}
  />
);

export const DefaultWithSecondaryLabel = () => (
  <List
    items={listWithSecondaryLabelData}
    {...actionsData}
  />
);

export const DefaultDisabledWithSecondaryLabel = () => (
  <List
    items={listDisabledWithSecondaryLabelData}
    {...actionsData}
  />
);

export const Small = () => (
  <List
    items={listData}
    size='small'
    {...actionsData}
  />
);

export const SmallDisabled = () => (
  <List
    items={listDisabledData}
    size='small'
    {...actionsData}
  />
);

export const SmallWithSecondaryLabel = () => (
  <List
    items={listWithSecondaryLabelData}
    size='small'
    {...actionsData}
  />
);

export const SmallDisabledWithSecondaryLabel = () => (
  <List
    items={listDisabledWithSecondaryLabelData}
    size='small'
    {...actionsData}
  />
);
