import React from 'react';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <Link to="/add" className="btn btn-success btn-block">
      <i className="fas fa-user-plus mr-1" /> Add Debtor
    </Link>
  );
};

export default Sidebar;
