import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PropTypes from '../../PropTypes';
import Home from '../../components/Home';
import loadHome from '../../loads/loadHome';

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.loadHomePage = this.loadHomePage.bind(this);
  }

  componentDidMount() {
    this.loadHomePage();
  }

  loadHomePage() {
    this.props.loadHome();
  }

  render() {
    return <Home {...this.props} />;
  }
}

HomePage.propTypes = {
  loadHome: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = {
  loadHome,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HomePage),
);
