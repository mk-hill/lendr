import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class People extends Component {
  render() {
    const debtors = [
      {
        id: '123123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'jdoe@doe.com',
        phone: '123-123-1234',
        balance: 59.5,
      },
      {
        id: '143123',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jdoe@jane.com',
        phone: '123-123-1434',
        balance: 590,
      },
    ];

    return debtors ? (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h2>
              <i className="fas fa-users" /> Debtors
            </h2>
          </div>
          <div className="col-md-6">Total owed: $59768</div>
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
                <td>
                  {balance.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'usd',
                  })}
                </td>
                <td className="text-center">
                  <Link
                    to={`/debtor/${id}`}
                    className="btn btn-outline-info btn-sm"
                  >
                    <i className="fas fa-arrow-circle-right" /> Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <h1>Loading</h1>
    );
  }
}

export default People;
