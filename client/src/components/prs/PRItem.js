import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const PRItem = ({
  auth,
  pr: { _id, name, materials, postedBy, deliveryTime, status, created },
}) => {
  const pendingPR = (
    <div className='card-panel hoverable red lighten-5 z-depth-1'>
      <div className='card-content'>
        <span className='card-title red-text darken-1 center-align'>
          <b>
            <h4>PENDING : {name}</h4>
          </b>
        </span>
        <p className='grey-text text-darken-1 center-align'>
          Filed on{' '}
          <b>
            <Moment format='DD/MM/YYYY'>{created}</Moment>
          </b>
        </p>
        <div className='card-action'>
          <div className='row'>
            <div className='s12 center-align'>
              <div className='col s6'>
                <Link
                  to='#!'
                  style={{
                    width: '140px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                  }}
                  class='waves-effect waves-light hoverable btn-small red'
                >
                  View PR
                </Link>
              </div>
              <div className='col s6'>
                <Link
                  to='#!'
                  style={{
                    width: '140px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                  }}
                  class='waves-effect waves-light hoverable btn-small black'
                >
                  Delete PR
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const passedPR = (
    <div className='card-panel hoverable green lighten-5 z-depth-1'>
      <div className='card-content'>
        <span className='card-title green-text darken-1 center-align'>
          <b>
            <h4>PASSED : {name}</h4>
          </b>
        </span>
        <p className='grey-text text-darken-1 center-align'>
          Filed on{' '}
          <b>
            <Moment format='DD/MM/YYYY'>{created}</Moment>
          </b>
        </p>
        <div className='card-action'>
          <div className='row'>
            <div className='s12 center-align'>
              <div className='col s6'>
                <Link
                  to='#!'
                  style={{
                    width: '140px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                  }}
                  class='waves-effect waves-light hoverable btn-small green'
                >
                  View PR
                </Link>
              </div>
              <div className='col s6'>
                <Link
                  to='#!'
                  style={{
                    width: '140px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                  }}
                  class='waves-effect waves-light hoverable btn-small black'
                >
                  Delete PR
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className='row'>
      <div className='col s12 m16'>
        {status === 'pending' ? pendingPR : passedPR}
      </div>
    </div>
  );
};

PRItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PRItem);
