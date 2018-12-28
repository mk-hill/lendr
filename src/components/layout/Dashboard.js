import React from 'react';
import Debtors from '../debtors/Debtors';
import Sidebar from '../layout/Sidebar';
import PropTypes from 'prop-types';

const Dashboard = props => {
  return (
    <div className="row">
      <div className="col-md-10">
        <Debtors formatCurrency={props.formatCurrency} />
      </div>
      <div className="col-md-2">
        <Sidebar />
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  formatCurrency: PropTypes.func.isRequired,
};

export default Dashboard;
