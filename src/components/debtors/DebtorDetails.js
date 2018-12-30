import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Loading from '../layout/Loading';

class DebtorDetails extends Component {
  static propTypes = {
    firestore: PropTypes.object.isRequired,
    debtor: PropTypes.object,
    formatCurrency: PropTypes.func.isRequired,
  };

  state = {
    showBalanceInput: false,
    balanceInput: '',
    error: false,
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  updateBalance = e => {
    e.preventDefault();
    const {
      state: { balanceInput },
      props: { firestore, debtor },
    } = this;

    firestore
      .update(
        { collection: 'debtors', doc: debtor.id },
        { balance: Number(balanceInput) }
      )
      .catch(e =>
        this.setState({
          showBalanceInput: true,
          error: true,
          balanceInput: debtor.balance,
        })
      );
    // Optimistic update for responsiveness, input will show again
    // with reset amount if error occurs while updating db
    this.setState({ showBalanceInput: false, error: false });
  };

  deleteDebtor = () => {
    const { debtor, firestore, history } = this.props;
    firestore
      .delete({ collection: 'debtors', doc: debtor.id })
      .then(history.push('/'))
      .catch(e =>
        this.setState({
          error: true,
        })
      );
  };

  render() {
    const {
      updateBalance,
      onChange,
      deleteDebtor,
      props: { debtor, formatCurrency },
      state: { showBalanceInput, balanceInput, error },
    } = this;
    if (!debtor) return <Loading />;
    const { firstName, lastName, email, phone, balance, id } = debtor;

    const balanceForm = (
      <form onSubmit={updateBalance}>
        <div className="input-group">
          <input
            type="number"
            className={`form-control${error ? ' bg-danger' : ''}`}
            name="balanceInput"
            step="0.01"
            placeholder={balance}
            value={balanceInput}
            onChange={onChange}
          />
          <div className="input-group-append">
            <input
              type="submit"
              value="Update"
              className="btn btn-info border-dark "
            />
          </div>
        </div>
      </form>
    );

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <Link to="/" className="btn btn-outline-primary mb-2">
              <i className="fas fa-arrow-circle-left mr-1" /> Back{' '}
              {window.innerWidth > 405 ? 'to Dashboard' : ''}
            </Link>
            <div className="btn-group float-right">
              <Link to={`/debtor/edit/${id}`} className="btn btn-info mr-3">
                <i className="fas fa-user-cog mr-1" /> Edit
              </Link>
              <button className="btn btn-danger" onClick={deleteDebtor}>
                <i className="fas fa-user-slash mr-1" /> Delete
              </button>
            </div>
          </div>
          <div className="col-md-6" />
        </div>
        <div
          className={`card mt-3${error ? ' border-danger' : ' border-dark'}`}
        >
          <h3 className="card-header">{`${firstName} ${lastName}`}</h3>
          <div className="card-body">
            <div className="row">
              <div className="col-md-8 col-sm-6">
                <h4>
                  Debtor ID: <span className="text-muted"> {id}</span>
                </h4>
              </div>
              <div className="col-md-4 col-sm-6">
                <h3 className="pull-right">
                  Balance:{' '}
                  <span
                    className={balance > 0 ? 'text-danger' : 'text-success'}
                  >
                    {formatCurrency(balance)}
                  </span>
                  <a
                    style={{
                      display: 'inline-block',
                      transform: 'translateY(-.2em)',
                      fontSize: '.8em',
                    }}
                    href="#!"
                    onClick={() =>
                      this.setState(prevState => ({
                        showBalanceInput: !prevState.showBalanceInput,
                        balanceInput: balance,
                      }))
                    }
                  >
                    <i className="fas fa-pencil-alt fa-xs text-info ml-2" />
                  </a>
                </h3>
                {showBalanceInput ? balanceForm : null}
              </div>
            </div>
            <hr />
            <ul className="list-group">
              <li className="list-group-item border-bottom">
                Contact Email: {email}
              </li>
              <li className="list-group-item">Contact Phone: {phone}</li>
            </ul>
          </div>
        </div>
      </div>
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
)(DebtorDetails);
