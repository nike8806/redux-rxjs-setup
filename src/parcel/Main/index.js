import React from 'react';

import './styles.scss';

const Main = ({ children }) => (
  <main role='main' className='container-fluid'>
    <div className='main'>
      {children}
    </div>
  </main>
);

export default Main;
