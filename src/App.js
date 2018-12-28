import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';
import AddDebtor from './components/debtors/AddDebtor';
import DebtorDetails from './components/debtors/DebtorDetails';
import EditDebtor from './components/debtors/EditDebtor';
import Login from './components/auth/Login';

import './App.css';
import Loading from './components/layout/Loading';

class App extends Component {
  formatCurrency(num) {
    return num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'usd',
    });
  }

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
                  render={props => (
                    <Dashboard
                      {...props}
                      formatCurrency={this.formatCurrency}
                    />
                  )}
                />
                <Route path="/login" exact component={Login} />
                <Route path="/add" exact component={AddDebtor} />
                <Route
                  path="/debtor/:id"
                  exact
                  render={props => (
                    <DebtorDetails
                      {...props}
                      formatCurrency={this.formatCurrency}
                    />
                  )}
                />
                />
                <Route path="/debtor/edit/:id" exact component={EditDebtor} />
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
