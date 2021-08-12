import React from 'react';

import './styles.scss';

const Title = ({ children, label }) => {
  const content = label || children;
  return (
    <h1 className='title'>
      {content}
    </h1>
  );
};

export default Title;
