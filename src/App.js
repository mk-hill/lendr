import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route render={() => <p>not found</p>} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
