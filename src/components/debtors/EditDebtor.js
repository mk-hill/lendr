import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import DebtorForm from './DebtorForm';
import Loading from '../layout/Loading';

export class EditDebtor extends Component {
  static propTypes = {
    firestore: PropTypes.object.isRequired,
    debtor: PropTypes.object,
  };

  state = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    balance: '',
    error: false,
  };

  static getDerivedStateFromProps({ debtor }, { firstName }) {
    return !firstName ? { ...debtor } : null;
  }

  handleChange = e => {
    const { name, value } = e.target;
    const adjustedValue = name === 'balance' ? Number(value) : value;
    this.setState({ [name]: adjustedValue });
  };

  updateDebtor = e => {
    e.preventDefault();
    const {
      state: { error, id, balance, ...formValues },
      props: { firestore, history },
    } = this;

    firestore
      .update(
        { collection: 'debtors', doc: id },
        { ...formValues, balance: balance || 0 }
      )
      .then(() => history.push('/'))
      .catch(() => this.setState({ error: true }));
  };

  render() {
    const {
      handleChange,
      updateDebtor,
      state: { firstName },
    } = this;

    return firstName ? (
      <>
        <Link to="/" className="btn btn-outline-primary mb-4">
          <i className="fas fa-arrow-circle-left mr-1" /> Back to Dashboard
        </Link>
        <DebtorForm
          {...this.state}
          onChange={handleChange}
          onSubmit={updateDebtor}
          title={'Edit Debtor'}
        />
      </>
    ) : (
      <Loading />
    );
  }
}

export default compose(
  firestoreConnect(props => [
    { collection: 'debtors', storeAs: 'debtor', doc: props.match.params.id },
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    debtor: ordered.debtor && ordered.debtor[0],
  }))
)(EditDebtor);
