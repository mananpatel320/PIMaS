import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../spinner/Spinner';
import { getPR, deletePR } from '../../actions/prActions';
import M from 'materialize-css';

import Moment from 'react-moment';

const PR = ({ auth, deletePR, getPR, pr: { pr, loading }, match }) => {
  useEffect(() => {
    getPR(match.params.id);
    window.$(document).ready(function () {
      window.$('.fixed-action-btn').floatingActionButton();
    });
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
        <div className='row'>
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
        </div>
        <div className='row'>
          <div className='s12 center-align'>
            {!auth.loading &&
              pr.postedBy.toString() === auth.user.id.toString() && (
                <button
                  onClick={(e) =>
                    deletePR(pr._id) &&
                    M.toast({ html: 'PR deleted successfully' }) &&
                    window.history.back()
                  }
                  style={{
                    width: '140px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                  }}
                  className='waves-effect waves-light hoverable btn-small black'
                >
                  Delete PR
                </button>
              )}
          </div>
        </div>
      </div>
      {!auth.loading && pr.postedBy.toString() === auth.user.id.toString() && (
        <div className='fixed-action-btn'>
          <Link to='#!' className='btn-floating btn-large green'>
            <i className='large material-icons black-text'>mode_edit</i>
          </Link>
        </div>
      )}
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
