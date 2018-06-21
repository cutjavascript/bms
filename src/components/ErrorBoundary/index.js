import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      error, // eslint-disable-line react/no-unused-state
      info, // eslint-disable-line react/no-unused-state
      hasError: true,
    });
  }

  render() {
    const { hasError } = this.state;
    return hasError ? (
      <div style={{ padding: 30, textAlign: 'center' }}>
        Sorry, something went wrong. Please try again later, while we fix this issue.
      </div>
    ) : (
      <div style={{ height: '100%' }}>{this.props.children}</div>
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
