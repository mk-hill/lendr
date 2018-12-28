import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import wedges from './wedges.svg';
import PropTypes from 'prop-types';

class Loading extends Component {
  state = {
    timedOut: false,
    windowTimer: null,
  };

  componentDidMount() {
    const windowTimer = setTimeout(
      () => this.setState({ timedOut: true }),
      this.props.timeout
    );

    this.setState({
      windowTimer,
    });
  }

  componentWillUnmount() {
    clearTimeout(this.state.windowTimer);
  }

  static propTypes = {
    timeout: PropTypes.number,
  };

  static defaultProps = {
    timeout: 5000,
  };

  render() {
    const { timedOut } = this.state;
    return timedOut ? (
      <>
        <Link to="/" className="btn btn-outline-primary">
          {' '}
          <i className="fas fa-arrow-circle-left mr-1" /> Back to Dashboard
        </Link>
        <h2 className="text-center mt-5">Something went wrong :(</h2>
      </>
    ) : (
      <div>
        <img
          src={wedges}
          alt="Loading"
          style={{ margin: '10vh auto', display: 'block' }}
        />
      </div>
    );
  }
}

export default Loading;
