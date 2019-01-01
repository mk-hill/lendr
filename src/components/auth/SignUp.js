import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import { notifyUser } from '../../actions/notify';
import Alert from '../layout/Alert';

class SignUp extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    notify: PropTypes.object.isRequired,
    notifyUser: PropTypes.func.isRequired,
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
    const { error, ...userInfo } = this.state;

    firebase.createUser(userInfo).catch(e => {
      this.setState({ error: true });
      notifyUser('User already exists.', 'error');
    });
  };

  render() {
    const {
      signIn,
      handleChange,
      state: { email, password, error },
      props: { notify, settings },
    } = this;

    const color = error ? 'danger' : 'success';

    return settings.allowRegistration ? (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className={`card border-${color} p-3`}>
            <i
              className={`fas fa-id-card-alt fa-2x text-${color} position-absolute `}
            />
            <div className="card-body pl-5 pr-5">
              <h1 className="text-center">{error ? 'Try again' : 'Sign up'}</h1>
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
                    autoComplete="username"
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
                    autoComplete="current-password"
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
    ) : (
      <Redirect to="/" />
    );
  }
}

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
      settings: state.settings,
    }),
    { notifyUser }
  )
)(SignUp);
