import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Navbar extends Component {
  state = {
    open: false,
  };

  toggleOpen = () => this.setState(({ open }) => ({ open: !open }));

  render() {
    const {
      state: { open },
      toggleOpen,
    } = this;

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Lendr
          </Link>
          <button className="navbar-toggler" type="button" onClick={toggleOpen}>
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={`${open ? '' : 'collapse '}navbar-collapse`}
            id="navbarMain"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
