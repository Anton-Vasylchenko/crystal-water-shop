import React from 'react';
import './spinner.scss';

const Spinner = () => {
  return (
    <div className="loadingio-spinner-double-ring mt-2 mb-2">
      <div className="ldio">
        <div></div>
        <div></div>
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;