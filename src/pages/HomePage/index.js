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
import removeSlots from "../../api/removeSlots";
import submitServices from "../../api/submitServices";
import { Context } from "../../context";

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.loadCalendar = this.loadCalendar.bind(this);
    this.onSlotChoosen = this.onSlotChoosen.bind(this);
    this.loadServices = this.loadServices.bind(this);
    this.state = { showPanel: "services" };
    console.log("===this.props  Line:20, File:e:gitwork\bmssrcpagesHomePageindex.js", this.props);
  }

  defaultParams = {
    user_id: 2,
    studio_id: 1,
  };

  loadServices() {
    this.props.loadStudioServices(this.defaultParams);
  }

  componentDidMount() {
    this.state.showPanel === "services" && this.loadCartServices();
    this.state.showPanel === "cart" && this.showCart();
  }

  loadCalendar(serviceId) {
    this.props.loadCalendar(this.defaultParams, serviceId);
  }

  loadCartServices = () => {
    this.props.loadCartServices(this.defaultParams);
  };

  showCart = () => {
    console.log("===  Line:43, File:e:gitwork\bmssrcpagesHomePageindex.js");
    this.setState({ showPanel: "cart" });
    this.props.loadCart(this.defaultParams);
  };

  submitServices = servicesSelected => {
    this.props.submitServices(servicesSelected, this.defaultParams);
  };

  onSlotChoosen(params) {
    console.log("===  Line:48, File:e:gitwork\bmssrcpagesHomePageindex.js");

    const bookingDay = String(params.startDate.format("YYYYMMDDhA")).toLowerCase();

    const bookingId = this.props.loadCartReducer.dayIds[bookingDay];
    const bookingTime = String(params.startDate.format("hA")).toLowerCase();
    console.log(
      "===this.props.loadCartReducer  Line:53, File:e:gitwork\bmssrcpagesHomePageindex.js",
      this.props.loadCartReducer,
    );

    const serviceid = this.props.loadCartReducer.serviceid;

    if (params.isReserved) {
      this.props.removeSlots({
        bookingId,
        bookingTime,
        cartId: (this.props.addSlotsReducer || {}).cart_id || 0, // /// TODO: Need to add cartId
        bookingDay,
        serviceid,
      });
    } else {
      this.props.addSlots({
        bookingId,
        bookingTime,
        cartId: (this.props.addSlotsReducer || {}).cart_id || 0, // /// TODO: Need to add cartId
        bookingDay,
        serviceid,
      });
    }
  }
  render() {
    console.log("===this.props  Line:82, File:e:gitwork\bmssrcpagesHomePageindex.js", this.props);
    const available = this.props.loadCartReducer && this.props.loadCartReducer.available;
    const removeSlotsResult = this.props.removeSlotsReducer;

    return (
      <Context.Provider value={available}>
        <Home
          onSlotChoosen={this.onSlotChoosen}
          addSlotsResult={this.props.addSlotsReducer}
          loadCalendar={this.loadCalendar}
          loadServices={this.loadServices}
          studioServices={this.props.studioServicesReducer}
          submitServices={this.submitServices}
          loadCartServices={this.loadCartServices}
          loadCartReducer={this.props.loadCartReducer}
          removeSlotsResult={removeSlotsResult}
          showCart={this.showCart}
          showPanel={this.state.showPanel}
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
  loadCart,
  removeSlots,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HomePage),
);
