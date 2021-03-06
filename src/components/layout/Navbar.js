import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

class Navbar extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
  };

  state = {
    isOpen: false,
    isAuthed: false,
  };

  static getDerivedStateFromProps({ auth }) {
    return auth.uid ? { isAuthed: true } : { isAuthed: false };
  }

  toggleOpen = () => this.setState(({ isOpen }) => ({ isOpen: !isOpen }));

  handleLogout = e => {
    e.preventDefault();
    this.props.firebase.logout();
    this.toggleOpen();
  };

  render() {
    const {
      toggleOpen,
      handleLogout,
      state: { isOpen, isAuthed },
    } = this;
    const { allowRegistration } = this.props.settings;
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <i className="fas fa-hand-holding-usd mr-1 text-info" /> Lendr
          </Link>
          <button className="navbar-toggler" type="button" onClick={toggleOpen}>
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={`${isOpen ? '' : 'collapse '}navbar-collapse`}
            id="navbarMain"
          >
            <ul className="navbar-nav ml-auto">
              {isAuthed ? (
                <>
                  <li className="nav-item">
                    <Link to="/" className="nav-link" onClick={toggleOpen}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/settings"
                      className="nav-link"
                      onClick={toggleOpen}
                    >
                      Settings
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="#!" className="nav-link" onClick={handleLogout}>
                      Log out
                    </a>
                  </li>
                </>
              ) : allowRegistration ? (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link" onClick={toggleOpen}>
                      Log in
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/signup"
                      className="nav-link"
                      onClick={toggleOpen}
                    >
                      Sign up
                    </Link>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings,
  }))
)(Navbar);
