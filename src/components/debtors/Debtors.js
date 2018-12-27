import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Loading from '../layout/Loading';

class Debtors extends Component {
  state = {
    totalOwed: null,
  };

  static getDerivedStateFromProps(props, state) {
    const { debtors } = props;
    const totalOwed = debtors
      ? debtors.reduce((total, { balance }) => total + balance, 0)
      : null;

    return { totalOwed };
  }

  static propTypes = {
    firestore: PropTypes.object.isRequired,
    debtors: PropTypes.array,
  };

  formatCurrency(num) {
    return num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'usd',
    });
  }

  render() {
    const {
      formatCurrency,
      props: { debtors },
      state: { totalOwed },
    } = this;

    return debtors ? (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h2>
              <i className="fas fa-users mr-1" /> Debtors
            </h2>
          </div>
          <div className="col-md-6">
            <h5 className="text-right text-muted">
              Total Owed:
              <span className="text-info"> {formatCurrency(totalOwed)}</span>
            </h5>
          </div>
        </div>
        <table className="table table-dark table-striped">
          <thead className="">
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Balance</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {debtors.map(({ id, firstName, lastName, phone, balance }) => (
              <tr key={id}>
                <td>{`${firstName} ${lastName}`}</td>
                <td>{phone}</td>
                <td>{formatCurrency(balance)}</td>
                <td className="text-center">
                  <Link
                    to={`/debtor/${id}`}
                    className="btn btn-outline-info btn-sm"
                  >
                    <i className="fas fa-arrow-circle-right mr-1" /> Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <Loading />
    );
  }
}

export default compose(
  firestoreConnect([{ collection: 'debtors' }]),
  connect((state, props) => ({
    debtors: state.firestore.ordered.debtors,
  }))
)(Debtors);
