import React from 'react';

import Spinner from './index';

export const SpinnerCentered = () => (
  <Spinner />
);

export const SpinnerCenteredIntoContainer = () => (
  <div style={{ width: '20rem', height: '20rem', background: 'black' }}>
    <Spinner />
  </div>
);

export default {
  title: 'Progress/Spinner',
};
