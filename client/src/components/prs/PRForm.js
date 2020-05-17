import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPR } from '../../actions/prActions';

const PRForm = ({ addPost }) => {
  const [text, setText] = useState('');
  return <div></div>;
};

PRForm.propTypes = {
  addPR: PropTypes.func.isRequired,
};

export default connect(null, { addPR })(PRForm);
