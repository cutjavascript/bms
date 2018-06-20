import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PropTypes from '../../PropTypes';
import Home from '../../components/Home';
import loadHome from '../../api/loadHome';
import {ThemeContext} from '../../context';




class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.loadHomePage = this.loadHomePage.bind(this);
    this.onSlotChoosen = this.onSlotChoosen.bind(this);
  }

  componentDidMount() {
    this.loadHomePage();
  }

  loadHomePage() {
    this.props.loadHome();
  }


  onSlotChoosen(params){
    console.log('===params  Line:26, File:e:\gitwork\bms\src\pages\HomePage\index.js',params)
  const slotSelected=  params.startDate.format('YYYYMMDDhhA');
  const slotLower=slotSelected.toLowerCase()
  const bookingId= this.props.simpleReducer.dayIds[slotLower];
  console.log('===bookingId  Line:33, File:e:\gitwork\bms\src\pages\HomePage\index.js',bookingId)
console.log('===typeof slotSelected  Line:34, File:e:\gitwork\bms\src\pages\HomePage\index.js',typeof slotSelected)
  console.log('===slotSelected  Line:33, File:e:\gitwork\bms\src\pages\HomePage\index.js',slotSelected)

  }
  render() {
    console.log('===this.props.simpleReducer  Line:30, File:e:\gitwork\bms\src\pages\HomePage\index.js',this.props.simpleReducer)

const dayIds =this.props.simpleReducer && this.props.simpleReducer.dayIds;
console.log('===dayIds  Line:33, File:e:\gitwork\bms\src\pages\HomePage\index.js',dayIds)
  
  return (
  
    <ThemeContext.Provider value={dayIds}>
    <Home {...this.props.simpleReducer} onSlotChoosen={this.onSlotChoosen} />
  </ThemeContext.Provider>
  
  );
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
