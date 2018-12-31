import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit,
} from '../../actions/settings';

export class Settings extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    setAllowRegistration: PropTypes.func.isRequired,
    setDisableBalanceOnAdd: PropTypes.func.isRequired,
    setDisableBalanceOnEdit: PropTypes.func.isRequired,
  };

  toggleSetting = e => {
    const action = this.props[
      `set${e.target.name[0].toUpperCase() + e.target.name.slice(1)}`
    ];
    action();
  };

  render() {
    const {
      allowRegistration,
      disableBalanceOnAdd,
      disableBalanceOnEdit,
    } = this.props.settings;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-outline-primary">
              <i className="fas fa-arrow-circle-left mr-1" /> Back to Dashboard
            </Link>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-header">
            <h3 className="text-center mb-0">Settings</h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Allow Registration</label>
                <input
                  className="ml-2"
                  type="checkbox"
                  name="allowRegistration"
                  checked={allowRegistration}
                  onChange={this.toggleSetting}
                />
              </div>
              <div className="form-group">
                <label>Disable Balance on Add</label>
                <input
                  className="ml-2"
                  type="checkbox"
                  name="disableBalanceOnAdd"
                  checked={disableBalanceOnAdd}
                  onChange={this.toggleSetting}
                />
              </div>
              <div className="form-group">
                <label>Disable Balance on Edit</label>
                <input
                  className="ml-2"
                  type="checkbox"
                  name="disableBalanceOnEdit"
                  checked={disableBalanceOnEdit}
                  onChange={this.toggleSetting}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings,
  }),
  { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings);
