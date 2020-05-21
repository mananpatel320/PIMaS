import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../spinner/Spinner';
import { getPR, deletePR } from '../../actions/prActions';

import Moment from 'react-moment';

const PR = ({ auth, deletePR, getPR, pr: { pr, loading }, match }) => {
  useEffect(() => {
    getPR(match.params.id);
  }, [getPR]);

  return loading || pr === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container'>
        {pr.status === 'pending' ? (
          <h4 className='flow-text red-text text-darken-1 center-align'>
            PENDING : <b>{pr.name}</b>
          </h4>
        ) : (
          <h4 className='flow-text green-text text-darken-1 center-align'>
            PASSED : <b>{pr.name}</b>
          </h4>
        )}
        <div>
          <li>FILED BY : {pr.userName}</li>
          <li>
            DATE CREATED : <Moment format='DD/MM/YYYY'>{pr.created}</Moment>
          </li>
          <li>
            DELIVERY TIME :{' '}
            <Moment format='DD/MM/YYYY'>{pr.deliveryTime}</Moment>
          </li>
          <li>STATUS : {pr.status}</li>
        </div>
        <table className='highlight centered'>
          <thead>
            <tr>
              <th className='grey-text text-darken-1'>MATERIAL CODE</th>
              <th className='grey-text text-darken-1'>MATERIAL NAME</th>
              <th className='grey-text text-darken-1'>QUANTITY</th>
            </tr>
          </thead>

          <tbody>
            {pr.materials.map((mat) => (
              <tr>
                <td>{mat.materialCode}</td>
                <td>{mat.materialName}</td>
                <td>{mat.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='row'>
          <div className='s12 center-align'>
            <div className='col s6'>
              <Link
                to='#'
                style={{
                  width: '140px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                }}
                className='waves-effect waves-light hoverable btn-small black'
              >
                Edit PR
              </Link>
            </div>
            {!auth.loading &&
              pr.postedBy.toString() === auth.user.id.toString() && (
                <div className='col s6'>
                  <button
                    onClick={(e) => deletePR(pr._id) && window.history.back()}
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
    </Fragment>
  );
};

PR.propTypes = {
  getPR: PropTypes.func.isRequired,
  deletePR: PropTypes.func.isRequired,
  pr: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  pr: state.pr,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPR, deletePR })(PR);
