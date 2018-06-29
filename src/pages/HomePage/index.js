import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PropTypes from "../../PropTypes";
import Home from "../../components/Home";
import loadCalendar from "../../api/loadCalendar";
import addSlots from "../../api/addSlots";
import { Context } from "../../context";

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.loadCalendarPage = this.loadCalendarPage.bind(this);
    this.onSlotChoosen = this.onSlotChoosen.bind(this);
  }

  componentDidMount() {}

  loadCalendarPage() {
    this.props.loadCalendar();
  }

  onSlotChoosen(params) {
    const bookingDay = String(params.startDate.format("YYYYMMDDhA")).toLowerCase();

    const bookingId = this.props.simpleReducer.dayIds[bookingDay];
    const bookingTime = String(params.startDate.format("hA")).toLowerCase();

    this.props.addSlots({
      bookingId,
      bookingTime,
      cartId: (this.props.addSlotsReducer || {}).cart_id || 0, // /// TODO: Need to add cartId
      bookingDay,
    });
  }
  render() {
    const available = this.props.simpleReducer && this.props.simpleReducer.available;

    return (
      <Context.Provider value={available}>
        <Home
          {...this.props.simpleReducer}
          onSlotChoosen={this.onSlotChoosen}
          addSlotsResult={this.props.addSlotsReducer}
          loadCalendar={this.loadCalendarPage}
        />
      </Context.Provider>
    );
  }
}

HomePage.propTypes = {
  loadCalendar: PropTypes.func.isRequired,
  addSlots: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = {
  loadCalendar,
  addSlots,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HomePage),
);
