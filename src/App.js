import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/auth';

import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';
import AddDebtor from './components/debtors/AddDebtor';
import DebtorDetails from './components/debtors/DebtorDetails';
import EditDebtor from './components/debtors/EditDebtor';
import Login from './components/auth/Login';
import Settings from './components/settings/Settings';

import './App.css';
import Loading from './components/layout/Loading';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Switch>
                <Route
                  path="/"
                  exact
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  path="/add"
                  exact
                  component={UserIsAuthenticated(AddDebtor)}
                />
                <Route
                  path="/debtor/:id"
                  exact
                  component={UserIsAuthenticated(DebtorDetails)}
                />
                />
                <Route
                  path="/debtor/edit/:id"
                  exact
                  component={UserIsAuthenticated(EditDebtor)}
                />
                <Route
                  path="/settings"
                  exact
                  component={UserIsAuthenticated(Settings)}
                />
                <Route
                  path="/login"
                  exact
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  render={() => (
                    <Loading timeout={1000} text="Page not found :(" />
                  )}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
