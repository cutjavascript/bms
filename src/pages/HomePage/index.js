import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PropTypes from '../../PropTypes';
import Home from '../../components/Home';
import loadHome from '../../api/loadHome';
import addToCart from '../../api/addToCart';
import { ThemeContext } from '../../context';

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.loadHomePage = this.loadHomePage.bind(this);
    this.onSlotChoosen = this.onSlotChoosen.bind(this);
  }

  componentDidMount() {
    console.log('===this.props  Line:19, File:e:\gitwork\bms\src\pages\HomePage\index.js',this.props)
    this.loadHomePage();
  }

  loadHomePage() {
    this.props.loadHome();
  }

  onSlotChoosen(params) {

    const slotLower = String(params.startDate.format('YYYYMMDDhhA')).toLowerCase();

    const bookingId = this.props.simpleReducer.dayIds[slotLower];
    const bookingTime = String(params.startDate.format('hA')).toLowerCase();


    this.props.addToCart({
      bookingId,
      bookingTime,
    });
  }
  render() {
    console.log('===this.props  Line:40, File:e:\gitwork\bms\src\pages\HomePage\index.js',this.props)
    const dayIds = this.props.simpleReducer && this.props.simpleReducer.dayIds;

    return (
      <ThemeContext.Provider value={dayIds}>
        <Home {...this.props.simpleReducer} onSlotChoosen={this.onSlotChoosen} />
      </ThemeContext.Provider>
    );
  }
}

HomePage.propTypes = {
  loadHome: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...state,
});
console.log('===mapStateToProps  Line:59, File:e:\gitwork\bms\src\pages\HomePage\index.js',mapStateToProps)
const mapDispatchToProps = {
  loadHome,
  addToCart,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HomePage),
);
