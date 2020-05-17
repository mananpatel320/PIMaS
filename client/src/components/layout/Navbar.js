import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/js/sidenav.js';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logoutUser } from '../../actions/authActions';

// https://itnext.io/add-state-and-lifecycle-methods-to-function-components-with-react-hooks-8e2bdc44d43d

const Navbar = ({ auth: { isAuthenticated, loading }, logoutUser }) => {
  useEffect(() => {
    window.$(document).ready(function () {
      window.$('.sidenav').sidenav();
      window.$('.button-collapse').sidenav();
      window.$('.dropdown-trigger').dropdown();
      window.$('.collapsible').collapsible();
    });
  });
  const authLinks = (
    <ul className='right hide-on-med-and-down'>
      <li>
        <Link
          to='#!'
          className='dropdown-trigger black-text'
          data-target='dropdown1'
        >
          Purchase Requisition
          <i className='material-icons right'>arrow_drop_down</i>
        </Link>
      </li>
      <li>
        <Link
          to='#!'
          className='dropdown-trigger black-text'
          data-target='dropdown2'
        >
          Purchase Order
          <i className='material-icons right'>arrow_drop_down</i>
        </Link>
      </li>
      <li>
        <Link onClick={logoutUser} to='#!' className='black-text'>
          <b>Logout</b>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='right hide-on-med-and-down'>
      <li>
        <Link to='#' className='black-text'>
          <b>Developers</b>
        </Link>
      </li>
      <li>
        <Link to='/register' className='black-text'>
          Register
        </Link>
      </li>
      <li>
        <Link to='/login' className='black-text'>
          Login
        </Link>
      </li>
    </ul>
  );

  const guestLinksnav = (
    <ul className='sidenav sidenav-close' id='mobile-demo'>
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
    <ul className='sidenav' id='mobile-demo'>
      <li className='no-padding'>
        <ul className='collapsible collapsible-accordion'>
          <li>
            <Link to='#!' className='collapsible-header'>
              <i className='material-icons'>arrow_drop_down</i>
              Purchase Requisition
            </Link>
            <div className='collapsible-body sidenav-close'>
              <ul>
                <li>
                  <Link to='#!'>New PR</Link>
                </li>
                <li>
                  <Link to='/pr'>All PRs</Link>
                </li>
                <li>
                  <Link to='#!'>My PRs</Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </li>
      <li className='no-padding'>
        <ul className='collapsible collapsible-accordion'>
          <li>
            <Link to='#!' className='collapsible-header'>
              <i className='material-icons'>arrow_drop_down</i>
              Purchase Order
            </Link>
            <div className='collapsible-body sidenav-close'>
              <ul>
                <li>
                  <Link to='#!'>New PO</Link>
                </li>
                <li>
                  <Link to='#!'>All POs</Link>
                </li>
                <li>
                  <Link to='#!'>My POs</Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </li>
      <li className='no-padding'>
        <li>
          <Link onClick={logoutUser} to='#!' className='waves-effect'>
            <i className='material-icons'>input</i>
            <b>Logout</b>
          </Link>
        </li>
      </li>
    </ul>
  );

  return (
    <Fragment>
      <ul id='dropdown1' className='dropdown-content'>
        <li>
          <Link to='#!' className='green-text'>
            New PR
          </Link>
        </li>
        <li>
          <Link to='/pr' className='green-text'>
            All PRs
          </Link>
        </li>
        <li>
          <Link to='#!' className='green-text'>
            My PRs
          </Link>
        </li>
      </ul>
      <ul id='dropdown2' className='dropdown-content'>
        <li>
          <Link to='#!' className='green-text'>
            New PO
          </Link>
        </li>
        <li>
          <Link to='#!' className='green-text'>
            All POs
          </Link>
        </li>
        <li>
          <Link to='#!' className='green-text'>
            My POs
          </Link>
        </li>
      </ul>
      <nav className='z-depth-0'>
        <div className='nav-wrapper green'>
          <Link to='/' className='brand-logo black-text'>
            THE <b>PALM</b>
          </Link>
          <a href='#!' data-target='mobile-demo' className='sidenav-trigger'>
            <i className='material-icons black-text'>menu</i>
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
