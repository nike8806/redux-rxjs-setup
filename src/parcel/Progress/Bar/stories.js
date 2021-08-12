import React from 'react';

import ProgressBar from './index';

export default {
  component: ProgressBar,
  title: 'Progress/Bar',
};

export const completeProgress = () => (
  <ProgressBar
    current={100}
  />
);

export const incompleteProgress = () => (
  <ProgressBar
    current={50.4}
  />
);

export const zeroProgress = () => (
  <ProgressBar
    current={0}
  />
);
