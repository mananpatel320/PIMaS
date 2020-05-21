import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePR } from '../../actions/prActions';

const PRItem = ({
  deletePR,
  auth,
  pr: {
    _id,
    name,
    materials,
    postedBy,
    deliveryTime,
    status,
    created,
    userName,
  },
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
          </b>{' '}
          by <b>{userName}</b>
        </p>
        <div className='card-action'>
          <div className='row'>
            <div className='s12 center-align'>
              <div className='col s6'>
                <Link
                  to={`/pr/viewpr/${_id}`}
                  style={{
                    width: '140px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                  }}
                  className='waves-effect waves-light hoverable btn-small red'
                >
                  View PR
                </Link>
              </div>
              {!auth.loading &&
                postedBy.toString() === auth.user.id.toString() && (
                  <div className='col s6'>
                    <button
                      onClick={(e) => deletePR(_id)}
                      style={{
                        width: '140px',
                        borderRadius: '3px',
                        letterSpacing: '1.5px',
                      }}
                      className='waves-effect waves-light hoverable btn-small black'
                    >
                      Delete PR
                    </button>
                  </div>
                )}
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
          </b>{' '}
          by <b>{userName}</b>
        </p>
        <div className='card-action'>
          <div className='row'>
            <div className='s12 center-align'>
              <div className='col s6'>
                <Link
                  to={`/pr/viewpr/${_id}`}
                  style={{
                    width: '140px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                  }}
                  className='waves-effect waves-light hoverable btn-small green'
                >
                  View PR
                </Link>
              </div>
              {!auth.loading &&
                postedBy.toString() === auth.user.id.toString() && (
                  <div className='col s6'>
                    <button
                      onClick={(e) => deletePR(_id)}
                      style={{
                        width: '140px',
                        borderRadius: '3px',
                        letterSpacing: '1.5px',
                      }}
                      className='waves-effect waves-light hoverable btn-small black'
                    >
                      Delete PR
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className='container'>
      <div className='row'>
        <div className='col s12 m16'>
          {status === 'pending' ? pendingPR : passedPR}
        </div>
      </div>
    </div>
  );
};

PRItem.propTypes = {
  pr: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePR: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePR })(PRItem);
