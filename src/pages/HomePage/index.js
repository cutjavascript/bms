import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PropTypes from "../../PropTypes";
import Home from "../../components/Home";
import loadCalendar from "../../api/loadCalendar";
import loadStudioServices from "../../api/loadStudioServices";
import loadCartServices from "../../api/loadCartServices";
import loadCart from "../../api/loadCart";
import addSlots from "../../api/addSlots";
import submitServices from "../../api/submitServices";
import { Context } from "../../context";

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.loadCalendarPage = this.loadCalendarPage.bind(this);
    this.onSlotChoosen = this.onSlotChoosen.bind(this);
    this.loadServices = this.loadServices.bind(this);

    console.log("===this.props  Line:20, File:e:gitwork\bmssrcpagesHomePageindex.js", this.props);
  }

  defaultParams = {
    user_id: 1,
    studio_id: 1,
  };

  loadServices() {
    this.props.loadStudioServices(this.defaultParams);
  }

  loadCalendarPage() {
    this.props.loadCalendar();
  }

  loadCartServices = () => {
    this.props.loadCartServices(this.defaultParams);
  };

  loadCart = () => {};

  submitServices = servicesSelected => {
    this.props.submitServices(servicesSelected, this.defaultParams);
  };

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
          loadServices={this.loadServices}
          studioServices={this.props.studioServicesReducer}
          submitServices={this.submitServices}
          loadCartServices={this.loadCartServices}
          loadCartReducer={this.props.loadCartReducer}
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
  loadStudioServices,
  submitServices,
  loadCartServices,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HomePage),
);
