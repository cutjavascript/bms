import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PropTypes from "../../PropTypes";
import Home from "../../components/Home";
import loadCalendar from "../../api/loadCalendar";
import addToCart from "../../api/addToCart";
import { Context } from "../../context";

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.loadCalendarPage = this.loadCalendarPage.bind(this);
    this.onSlotChoosen = this.onSlotChoosen.bind(this);
  }

  componentDidMount() {
    console.log("===this.props  Line:19, File:e:gitwork\bmssrcpagesHomePageindex.js", this.props);
  }

  loadCalendarPage() {
    this.props.loadCalendar();
  }

  onSlotChoosen(params) {
    const bookingDay = String(params.startDate.format("YYYYMMDDhA")).toLowerCase();

    const bookingId = this.props.simpleReducer.dayIds[bookingDay];
    const bookingTime = String(params.startDate.format("hA")).toLowerCase();

    this.props.addToCart({
      bookingId,
      bookingTime,
      cartId: 0, // /// TODO: Need to add cartId
      bookingDay,
    });
  }
  render() {
    console.log("===this.props  Line:40, File:e:gitwork\bmssrcpagesHomePageindex.js", this.props);
    const available = this.props.simpleReducer && this.props.simpleReducer.available;

    return (
      <Context.Provider value={available}>
        <Home
          {...this.props.simpleReducer}
          onSlotChoosen={this.onSlotChoosen}
          addToCartResult={this.props.addToCartReducer}
          loadCalendar={this.loadCalendarPage}
        />
      </Context.Provider>
    );
  }
}

HomePage.propTypes = {
  loadCalendar: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...state,
});
console.log("===mapStateToProps  Line:59, File:e:gitwork\bmssrcpagesHomePageindex.js", mapStateToProps);
const mapDispatchToProps = {
  loadCalendar,
  addToCart,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HomePage),
);
