import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// { component: Component, ...rest }
const PrivateRoute = props => {
  console.log(props);
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props =>
        true ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
