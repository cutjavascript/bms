import React from 'react';
import moment from 'moment';
import { find, isEqual } from 'lodash';
import { PacmanLoader } from 'react-spinners_new';
import Month from './Month';
import Day from './Day';
import Week from './Week';
import { getBookingsForDay } from '../util';
import { ViewType } from '../constant';

export default class CalendarBody extends React.Component {
  onSlotClicked(datas) {
    if (this.props.slotCliked) {
      this.props.slotCliked(datas.startDate);
    }
  }

  renderDayView() {
    return (
      <Day
        onClick={this.props.slotClicked}
        date={this.props.date}
        canOpenBookedSlot={this.props.canViewBooking}
        timeSlice={this.props.timeSlices}
        timeSlot={this.props.timeSlot}
        bookings={this.props.bookings}
        displayPast={this.props.displayPast}
        view={this.props.view}
        size={this.props.size}
        totalSlots={this.props.totalSlots}
        addToCartResult={this.props.addToCartResult}
      />
    );
  }

  renderWeekView() {
    return (
      <Week
        onClick={this.props.slotClicked}
        date={this.props.date}
        canViewBooking={this.props.canViewBooking}
        timeSlices={this.props.timeSlices}
        timeSlot={this.props.timeSlot}
        bookings={this.props.bookings}
        displayPast={this.props.displayPast}
        view={this.props.view}
        size={this.props.size}
        totalSlots={this.props.totalSlots}
        addToCartResult={this.props.addToCartResult}
      />
    );
  }

  renderMonthView() {
    return (
      <Month
        onDayClick={this.props.slotClicked}
        onSlotClick={this.props.dayClicked}
        date={this.props.date}
        view={this.props.view}
        canViewBooking={this.props.canViewBooking}
        timeSlices={this.props.timeSlices}
        timeSlot={this.props.timeSlot}
        bookings={this.props.bookings}
        displayPast={this.props.displayPast}
        view={this.props.view}
        size={this.props.size}
        totalSlots={this.props.totalSlots}
        addToCartResult={this.props.addToCartResult}
      />
    );
  }

  render() {
    console.log('===  Line:69, File:e:gitwork\bmssrccomponents\bodyCalendarBody.js');
    return this.props.isLoading ? (
      <div className="rbc-body-loading">
        {' '}
        <PacmanLoader color="#d55e00" loading>
          <span>&#9836;</span>
        </PacmanLoader>
        <div> Loading Slots...</div>
      </div>
    ) : (
      <div className="rbc-body">
        {this.props.view === ViewType.Day && this.renderDayView()}
        {this.props.view === ViewType.Week && this.renderWeekView()}
        {this.props.view === ViewType.Month && this.renderMonthView()}
      </div>
    );
  }
}
