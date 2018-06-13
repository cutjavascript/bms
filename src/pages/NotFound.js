import React from 'react';
import { connect } from 'react-redux';

class NotFound extends React.PureComponent {
  componentDidMount() {}

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          paddingTop: '60px',
          alignItems: 'flex-start',
        }}
      >
        {'Page Not Found'}
      </div>
    );
  }
}

const selector = () => ({});

export default connect(
  selector,
  {},
)(NotFound);
