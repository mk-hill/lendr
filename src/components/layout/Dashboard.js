import React from 'react';
import Debtors from '../debtors/Debtors';
import Sidebar from '../layout/Sidebar';

const Dashboard = () => {
  return (
    <div className="row">
      <div className="col-md-10">
        <Debtors />
      </div>
      <div className="col-md-2">
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
