import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPRS } from '../../actions/prActions';
import Spinner from '../spinner/Spinner';
import PRItem from '../prs/PRItem';

const Prs = ({ getPRS, pr: { prs, loading } }) => {
  useEffect(() => {
    getPRS();
  }, [getPRS]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container valign-wrapper'>
        <div className='row'>
          <div className='col s12 center-align'>
            <h4>
              <b>PURCHASE REQUISITIONS</b>
              <p className='flow-text grey-text text-darken-1'>
                Latest <b>PRs</b> filed will show here
              </p>
            </h4>
          </div>
        </div>
      </div>
      {/*PR Form*/}
      <div className='prs'>
        {prs.map((pr) => (
          <PRItem key={pr._id} pr={pr} />
        ))}
      </div>
    </Fragment>
  );
};

Prs.propTypes = {
  getPRS: PropTypes.func.isRequired,
  pr: PropTypes.object.isRequired,
};

const mapStateTOProps = (state) => ({
  pr: state.pr,
});

export default connect(mapStateTOProps, { getPRS })(Prs);
