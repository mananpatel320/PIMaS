import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMyPRS } from '../../actions/prActions';
import Spinner from '../spinner/Spinner';
import PRItem from './PRItem';

const MyPrs = ({ getMyPRS, pr: { prs, loading } }) => {
  useEffect(() => {
    getMyPRS();
  }, [getMyPRS]);
  useEffect(() => {
    window.$(document).ready(function () {
      window.$('.fixed-action-btn').floatingActionButton();
    });
  });
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container valign-wrapper'>
        <div className='row'>
          <div className='col s12 center-align'>
            <h5>
              <b>PURCHASE REQUISITIONS</b>
              <p className='flow-text grey-text text-darken-1'>
                Your latest <b>PRs</b> filed will show here
              </p>
            </h5>
          </div>
        </div>
      </div>
      {/*PR Form*/}
      <div className='prs'>
        {prs.map((pr) => (
          <PRItem key={pr._id} pr={pr} />
        ))}
      </div>
      <div className='fixed-action-btn'>
        <Link to='/pr/add' className='btn-floating btn-large green'>
          <i className='large material-icons black-text'>add</i>
        </Link>
      </div>
    </Fragment>
  );
};

MyPrs.propTypes = {
  getMyPRS: PropTypes.func.isRequired,
  pr: PropTypes.object.isRequired,
};

const mapStateTOProps = (state) => ({
  pr: state.pr,
});

export default connect(mapStateTOProps, { getMyPRS })(MyPrs);
