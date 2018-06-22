import React from "react";
import moment from "moment";
import bem from "bem-classname";
import _ from "lodash";
import { Context } from "../../context";
import { getSizeType } from "../util";

export default class Slot extends React.Component {
  onClickBound = this.onClick.bind(this);

  isClickable() {
    return this.props.onClick && (!this.props.isBooked || this.props.canViewBooking);
  }

  onClick(e) {
    console.log("===  Line:15, File:e:gitwork\bmssrccomponents\bodySlot.js");
    e.preventDefault();
    if (this.props.onClick) {
      const values = _.omit(this.props, ["className", "style", "onClick", "canViewBooking", "numberOfSlot"]);
      this.props.onClick(values);
    }
  }

  renderBookingLink(slotData = {}) {
    console.log("this.props", this.props);
    console.log("===slotData  Line:26, File:e:gitwork\bmssrccomponents\bodySlot.js", slotData);
    return this.props.isBooked ? (
      <span>Booked</span>
    ) : (
      <span>&#8377;{slotData.amount ? Number(slotData.amount).toLocaleString() : "Book"}</span>
    );
  }

  renderEmptySlot() {
    const className = bem("rbc-slot", ["inactive"]);
    return <div className={className} style={this.props.style} />;
  }

  renderSlot() {
    console.log("===  Line:35, File:e:gitwork\bmssrccomponents\bodySlot.js");

    const sizeTypeModifier = bem("rbc-slot--" + getSizeType(this.props.size));
    const isBookedModifier = bem("rbc-slot", [this.props.isBooked ? "booked" : "free"]);
    const isClickableModifier = bem("rbc-slot", [this.isClickable() ? "clickable" : ""]);
    return (
      <div
        className={isBookedModifier + " " + isClickableModifier + " " + sizeTypeModifier}
        style={this.props.style}
        onClick={this.onClickBound}
      >
        {this.props.children ? (
          this.props.children
        ) : (
          <div>
            <div>
              <span className="rbc-slot__title">{this.props.startDate.format("HH")}</span>
              <div className="rbc-slot__message">
                {" "}
                <Context.Consumer>
                  {values => {
                    const formatteDate =
                      this.props.startDate && String(moment(this.props.startDate).format("YYYYMMDDhA")).toLowerCase();
                    console.log("===formatteDate  Line:59, File:e:gitwork\bmssrccomponents\bodySlot.js", formatteDate);
                    var slotData = _.find(values, { time: formatteDate });
                    console.log("===slotData  Line:61, File:e:gitwork\bmssrccomponents\bodySlot.js", slotData);

                    console.log("===  Line:38, File:e:gitwork\bmssrccomponents\bodySlot.js", values);

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
    console.log("===this.props  Line:61, File:e:gitwork\bmssrccomponents\bodySlot.js", this.props);
    console.log("===this.props.startDate  Line:61, File:e:gitwork\bmssrccomponents\bodySlot.js", this.props.startDate);
    let totalSlots = this.props.totalSlots;
    console.log("===totalSlots  Line:63, File:e:gitwork\bmssrccomponents\bodySlot.js", totalSlots);
    if (this.props.startDate && this.props.startDate.format("HH") && totalSlots && totalSlots.length > 0) {
      let formattedSlotTime = moment(this.props.startDate).format("YYYYMMDDhA");

      if (totalSlots.includes(formattedSlotTime.toLowerCase())) {
        console.log("===formattedSlotTime  Line:105, File:e:gitwork\bmssrccomponentsil.js", formattedSlotTime);

        return this.renderSlot();
      }
    }
    return this.renderEmptySlot();
    return this.props.startDate ? this.renderSlot() : this.renderEmptySlot();
  }
}
