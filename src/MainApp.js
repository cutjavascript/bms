import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from './PropTypes';

class MainApp extends PureComponent {
  getChildContext() {
    return {
      isLoggedOut: this.props.isLoggedOut,
    };
  }

  componentDidMount() {}

  render() {
    const { children } = this.props;

    return <React.Fragment>{children}</React.Fragment>;
  }
}

MainApp.propTypes = {
  children: PropTypes.node.isRequired,
  // isLoggedOut: PropTypes.bool.isRequired,
};

MainApp.childContextTypes = {
   isLoggedOut: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
   isLoggedOut: state.isLoggedOut,
});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MainApp),
);
