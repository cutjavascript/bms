import React from "react";
import moment from "moment";
import bem from "bem-classname";
import _ from "lodash";
import { PulseLoader } from "react-spinners_new";
import { Context } from "../../context";
import { getSizeType } from "../util";

export default class Slot extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
    this.onClickBound = this.onClick.bind(this);
  }

  isClickable() {
    return true; //this.props.onClick && (!this.props.isBooked || this.props.canViewBooking);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.addSlotsResult && !_.isEqual(this.state.isLoading, nextProps.addSlotsResult.isLoading)) {
      if (!nextProps.addSlotsResult.isLoading) {
        this.setState({ isLoading: false });
      }
    }
  }
  onClick(e) {
    console.log("===  Line:27, File:e:gitwork\bmssrccomponentsCalendarSlot.js");
    e.preventDefault();
    if (this.props.onClick) {
      const values = _.omit(this.props, ["className", "style", "onClick", "canViewBooking", "numberOfSlot"]);
      console.log("===values  Line:32, File:e:gitwork\bmssrccomponentsCalendarSlot.js", values);
      this.setState({ isLoading: true });
      this.props.onClick(values);
    }
  }

  renderBookingLink(slotData = {}) {
    return this.props.isBooked ? (
      <span>{this.props.isReserved ? "Reserved" : "Booked"}</span>
    ) : (
      <span>&#8377;{slotData.amount ? Number(slotData.amount).toLocaleString() : "Book"}</span>
    );
  }

  renderEmptySlot() {
    const className = bem("rbc-slot", ["inactive"]);
    return <div className={className} style={this.props.style} />;
  }

  renderSlot() {
    const sizeTypeModifier = bem(`rbc-slot--${getSizeType(this.props.size)}`);
    const isBookedModifier = bem("rbc-slot", [
      this.props.isBooked ? (this.props.isReserved ? "reserved" : "booked") : "free",
    ]);
    const isClickableModifier = bem("rbc-slot", [this.isClickable() ? "clickable" : ""]);
    return (
      <div
        className={`${isBookedModifier} ${isClickableModifier} ${sizeTypeModifier}`}
        style={this.props.style}
        onClick={this.onClickBound}
      >
        {this.state.isLoading && <PulseLoader size={9} color="#56b4e9" loading />}
        {!this.state.isLoading && (
          // this.props.children
          // ? (
          // this.props.children
          // ) :
          <div>
            <div>
              <span className="rbc-slot__title">{this.props.startDate.format("ha")}</span>
              <div className="rbc-slot__message">
                {" "}
                <Context.Consumer>
                  {values => {
                    const formatteDate =
                      this.props.startDate && String(moment(this.props.startDate).format("YYYYMMDDhA")).toLowerCase();

                    const slotData = _.find(values, { time: formatteDate });

                    return this.renderBookingLink(slotData);
                  }}
                </Context.Consumer>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  render() {
    const totalSlots = this.props.totalSlots;

    if (this.props.startDate && this.props.startDate.format("HH") && totalSlots && totalSlots.length > 0) {
      const formattedSlotTime = moment(this.props.startDate).format("YYYYMMDDhA");

      if (totalSlots.includes(formattedSlotTime.toLowerCase())) {
        return this.renderSlot();
      }
    }
    return this.renderEmptySlot();
  }
}
