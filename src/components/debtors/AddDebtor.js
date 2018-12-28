import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddDebtor extends Component {
  static propTypes = {
    firestore: PropTypes.object.isRequired,
  };

  state = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    balance: '',
    error: false,
  };

  onChange = e => {
    const { name, value } = e.target;
    const adjustedValue = name === 'balance' ? Number(value) : value;
    this.setState({ [name]: adjustedValue });
  };

  onSubmit = e => {
    e.preventDefault();
    let { balance, ...formValues } = this.state;
    balance = balance || 0;

    const { firestore, history } = this.props;
    firestore
      .add({ collection: 'debtors' }, { balance, ...formValues })
      .then(() => history.push('/'))
      .catch(() => this.setState({ error: true }));
  };

  render() {
    const {
      onSubmit,
      onChange,
      state: { firstName, lastName, phone, email, balance, error },
    } = this;

    return (
      <div>
        <Link to="/" className="btn btn-outline-primary mb-4">
          <i className="fas fa-arrow-circle-left mr-1" /> Back to Dashboard
        </Link>
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className={`card ${error ? 'border-danger' : 'border-dark'}`}>
              <div className="card-header">Add Debtor</div>
              <div className="card-body">
                <form onSubmit={onSubmit}>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      minLength="2"
                      required
                      onChange={onChange}
                      value={firstName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      minLength="2"
                      onChange={onChange}
                      value={lastName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={onChange}
                      value={email}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      minLength="10"
                      onChange={onChange}
                      value={phone}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="balance">Balance</label>
                    <input
                      type="number"
                      min="0.00"
                      step="0.01"
                      className="form-control"
                      name="balance"
                      onChange={onChange}
                      value={balance}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-success btn-block"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default firestoreConnect()(AddDebtor);
