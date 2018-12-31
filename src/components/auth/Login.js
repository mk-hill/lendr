import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import { notifyUser } from '../../actions/notify';
import Alert from '../layout/Alert';

class Login extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
  };

  state = {
    email: '',
    password: '',
    error: false,
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  signIn = e => {
    e.preventDefault();
    const { firebase, notifyUser } = this.props;
    const { error, ...loginInfo } = this.state;
    firebase.login({ ...loginInfo }).catch(e => {
      notifyUser('Email and password does not match', 'error');
      this.setState({ error: true });
    });
  };

  render() {
    const {
      signIn,
      handleChange,
      state: { email, password, error },
      props: { notify },
    } = this;

    const color = error ? 'danger' : 'info';

    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className={`card border-${color} p-3`}>
            <i
              className={`fas fa-sign-in-alt fa-2x text-${color} position-absolute `}
            />
            <div className="card-body pl-5 pr-5">
              <h1 className="text-center">{error ? 'Try again' : 'Log in'}</h1>
              {notify.message ? <Alert {...notify} /> : null}
              <form onSubmit={signIn}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    required
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    required
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className={`btn btn-${color} btn-block mb-2`}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
    }),
    { notifyUser }
  )
)(Login);
