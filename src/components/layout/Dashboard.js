import React from 'react';
import Debtors from '../debtors/Debtors';
import Sidebar from '../layout/Sidebar';

import formatCurrency from '../../util/formatCurrency';

const Dashboard = props => {
  return (
    <div className="row">
      <div className="col-md-10">
        <Debtors formatCurrency={formatCurrency} />
      </div>
      <div className="col-md-2">
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
