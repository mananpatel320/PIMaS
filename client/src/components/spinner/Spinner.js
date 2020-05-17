import React from 'react';

const Spinner = (props) => {
  return (
    <div style={{ height: '75vh' }} className='container valign-wrapper'>
      <div className='row'>
        <div className='col s12 center-align'>
          <div class='preloader-wrapper big active'>
            <div class='spinner-layer spinner-green-only'>
              <div class='circle-clipper left'>
                <div class='circle'></div>
              </div>
              <div class='gap-patch'>
                <div class='circle'></div>
              </div>
              <div class='circle-clipper right'>
                <div class='circle'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
