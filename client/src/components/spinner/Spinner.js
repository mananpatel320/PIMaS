import React from 'react';

const Spinner = (props) => {
  return (
    <div style={{ height: '75vh' }} className='container valign-wrapper'>
      <div className='row'>
        <div className='col s12 center-align'>
          <div className='preloader-wrapper big active'>
            <div className='spinner-layer spinner-green-only'>
              <div className='circle-clipper left'>
                <div className='circle'></div>
              </div>
              <div className='gap-patch'>
                <div className='circle'></div>
              </div>
              <div className='circle-clipper right'>
                <div className='circle'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
