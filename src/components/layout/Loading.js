import React from 'react';
import wedges from './wedges.svg';

const Loading = () => {
  return (
    <div>
      <img
        src={wedges}
        alt="Loading"
        style={{ margin: '10vh auto', display: 'block' }}
      />
    </div>
  );
};

export default Loading;
