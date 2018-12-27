import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';
import AddDebtor from './components/debtors/AddDebtor';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/add" exact component={AddDebtor} />
                <Route render={() => <p>not found</p>} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
