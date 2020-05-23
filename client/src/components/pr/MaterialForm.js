import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMaterial } from '../../actions/prActions';

const MaterialForm = ({ prId, addMaterial }) => {
  return (
    <Fragment>
      <ul class='collection with-header'>
        <li class='collection-header'>
          <h4>Add Material</h4>
        </li>
        <li class='collection-item'>
          <div>
            Alvin
            <a href='#!' class='secondary-content'>
              <i class='material-icons'>send</i>
            </a>
          </div>
        </li>
      </ul>
    </Fragment>
  );
};

MaterialForm.propTypes = {
  addMaterial: PropTypes.func.isRequired,
};

export default connect(null, { addMaterial })(MaterialForm);
