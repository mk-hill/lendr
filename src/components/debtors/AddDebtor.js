import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import DebtorForm from './DebtorForm';

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

  handleChange = e => {
    const { name, value } = e.target;
    const adjustedValue = name === 'balance' ? Number(value) : value;
    this.setState({ [name]: adjustedValue });
  };

  addDebtorToDb = e => {
    e.preventDefault();
    const { balance, ...formValues } = this.state;

    const { firestore, history } = this.props;
    firestore
      .add({ collection: 'debtors' }, { balance: balance || 0, ...formValues })
      .then(() => history.push('/'))
      .catch(() => this.setState({ error: true }));
  };

  render() {
    const { addDebtorToDb, handleChange } = this;

    return (
      <>
        <Link to="/" className="btn btn-outline-primary mb-4">
          <i className="fas fa-arrow-circle-left mr-1" /> Back to Dashboard
        </Link>
        <DebtorForm
          {...this.state}
          onChange={handleChange}
          onSubmit={addDebtorToDb}
          title={'Add Debtor'}
        />
      </>
    );
  }
}

export default firestoreConnect()(AddDebtor);
