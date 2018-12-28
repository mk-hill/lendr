import React from 'react';
import PropTypes from 'prop-types';

const DebtorForm = props => {
  const {
    title,
    error,
    onSubmit,
    onChange,
    firstName,
    lastName,
    email,
    phone,
    balance,
  } = props;

  return (
    <div>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className={`card ${error ? 'border-danger' : 'border-dark'}`}>
            <div className="card-header">{title}</div>
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
};

DebtorForm.propTypes = {
  error: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default DebtorForm;
