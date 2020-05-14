import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logoutUser } from '../../actions/authActions';
// import M from 'materialize-css';

// https://itnext.io/add-state-and-lifecycle-methods-to-function-components-with-react-hooks-8e2bdc44d43d

const Navbar = ({ auth: { isAuthenticated, loading }, logoutUser }) => {
  // useEffect(() => {
  //   document.addEventListener('DOMContentLoaded', function () {
  //     var elems = document.querySelectorAll('.sidenav');
  //     var instances = M.Sidenav.init(elems, {});
  //   });
  // });
  const authLinks = (
    <ul class='right hide-on-med-and-down'>
      <li>
        <Link to='#!' class='black-text'>
          PR
        </Link>
      </li>
      <li>
        <Link to='#!' class='black-text'>
          PO
        </Link>
      </li>
      <li>
        <Link onClick={logoutUser} to='#!' class='black-text'>
          <b>Logout</b>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul class='right hide-on-med-and-down'>
      <li>
        <Link to='#' class='black-text'>
          <b>Developers</b>
        </Link>
      </li>
      <li>
        <Link to='/register' class='black-text'>
          Register
        </Link>
      </li>
      <li>
        <Link to='/login' class='black-text'>
          Login
        </Link>
      </li>
    </ul>
  );

  const guestLinksnav = (
    <ul class='sidenav' id='mobile-demo'>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='#!'>
          <b>Developers</b>
        </Link>
      </li>
    </ul>
  );

  const authLinksnav = (
    <ul class='sidenav' id='mobile-demo'>
      <li>
        <Link to='#!'>PR</Link>
      </li>
      <li>
        <Link to='#!'>PO</Link>
      </li>
      <li>
        <Link onClick={logoutUser} to='#!'>
          <b>Logout</b>
        </Link>
      </li>
    </ul>
  );

  return (
    <Fragment>
      <nav className='z-depth-0'>
        <div className='nav-wrapper green'>
          <Link to='/' className='brand-logo black-text'>
            THE <b>PALM</b>
          </Link>
          <a href='#!' data-target='mobile-demo' class='sidenav-trigger'>
            <i class='material-icons black-text'>menu</i>
          </a>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </div>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinksnav : guestLinksnav}</Fragment>
        )}
      </nav>
    </Fragment>
  );
};

Navbar.prototype = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
