import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div style={{ height: '75vh' }} className='container valign-wrapper'>
        <div className='row'>
          <div className='col s12 center-align'>
            <h4>
              <b>Welcome to The PIMaS!</b>
            </h4>
            <p className='flow-text grey-text text-darken-1'>
              All your inventory at one place
            </p>
            <br />
            <div className='col s6'>
              <Link
                to='/register'
                style={{
                  width: '140px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                }}
                className='btn btn-large waves-effect waves-light hoverable green'
              >
                Register
              </Link>
            </div>
            <div className='col s6'>
              <Link
                to='/login'
                style={{
                  width: '140px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                }}
                className='btn btn-large waves-effect waves-light hoverable black white-text'
              >
                LogIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
