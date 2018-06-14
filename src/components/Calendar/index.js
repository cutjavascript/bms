import React from 'react';
import moment from 'moment';
import {omit, isEqual} from 'lodash';
import sizeMe from 'react-sizeme';

import CalendarHeader from '../header/CalendarHeader';
import CalendarBody from '../body/CalendarBody';
import {ViewType} from '../constant';

import '../style/main.css';

import {
    getBookingsForDay,
    getBookingsForWeek,
    getBookingsForMonth,
    getTimesliceForDay,
    getTimesliceForWeek,
    getTimesliceForMonth,
    getTime
} from '../util';

class Calendar extends React.Component {
    onDateChangedBound = this.onDateChanged.bind(this);
    onViewChangedBound = this.onViewChanged.bind(this);
    onDayChoosenBound = this.onDayChoosen.bind(this);

  
  
    
    static defaultProps = {
        bookings: [],
        timeSlices: [{ day: 'Monday', start:getTime(10, 0), end: getTime(18, 0) },
        { day: 'Tuesday', start: getTime(9, 30), end: getTime(16, 0) },
        { day: 'Wednesday', start: getTime(9, 30), end: getTime(17, 0) },
        { day: 'Thursday', start: getTime(10, 30), end: getTime(16, 30) },
        { day: 'Friday', start: getTime(8, 30), end: getTime(17, 30) },
        { day: 'Saturday', start: getTime(10, 30), end: getTime(16, 30) },
        { day: 'Sunday', start: getTime(8, 30), end: getTime(15, 30) }],//
        timeSlot: 60,
        timeExceptions: [],
        displayPast: false,
        view: ViewType.Month,
        date: moment(),
        resources: {
            view: {
                Day: 'Day',
                Week: 'Week',
                Month: 'Month'
            }
        }
    };

    constructor(props) {
        super(props);



// PARIS TIMEZONE



        const bookings = props.bookings.map(booking => {
            booking.startDate = moment.isMoment(booking.startDate) ? booking.startDate : moment(booking.startDate);
            booking.endDate = moment.isMoment(booking.endDate) ? booking.endDate : moment(booking.endDate)
            booking.isBooked = true;
            return booking;
        });

        this.state = {
            date: moment(props.date),
            view: props.view,
            bookings: bookings,
            timeSlices: props.timeSlices,
            timeExceptions: props.timeExceptions,
            booking: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.state.bookings, nextProps.bookings)) {
            const bookings = nextProps.bookings.map(booking => {
                booking.startDate = moment.isMoment(booking.startDate) ? booking.startDate : moment(booking.startDate);
                booking.endDate = moment.isMoment(booking.endDate) ? booking.endDate : moment(booking.endDate)
                booking.isBooked = true;
                return booking;
            });

            this.setState({ bookings });
        }

        if (!isEqual(this.state.timeSlices, nextProps.timeSlices)) {
            this.setState({ timeSlices: nextProps.timeSlices });
        }

        if (!isEqual(this.state.timeExceptions, nextProps.timeExceptions)) {
            this.setState({ timeExceptions: nextProps.timeExceptions });
        }
    }

    getBookings() {
        return this.state.view === ViewType.Day
            ? getBookingsForDay(this.state.bookings, this.state.date)
            : this.state.view === ViewType.Week
                ? getBookingsForWeek(this.state.bookings, this.state.date)
                : getBookingsForMonth(this.state.bookings, this.state.date);
    }

    getTimetable() {
        return this.state.view === ViewType.Day
            ? getTimesliceForDay(this.state.timeSlices, this.state.timeExceptions, this.state.date)
            : this.state.view === ViewType.Week
                ? getTimesliceForWeek(this.state.timeSlices, this.state.timeExceptions, this.state.date)
                : getTimesliceForMonth(this.state.timeSlices, this.state.timeExceptions, this.state.date);
    }

    render() {
        return (
            <div className='rbc-calendar' style={{width:"1024px", height:"900px",  overflowX:"scroll"}}>
                <CalendarHeader pastAvailable={this.props.displayPast}
                    date={this.state.date}
                    view={this.state.view}
                    viewChanged={this.onViewChangedBound}
                    dateChanged={this.onDateChangedBound}
                    resources={this.props.resources}
                    size={this.props.size} />

                <CalendarBody bookings={this.getBookings()}
                    timeSlot={this.props.timeSlot}
                    timeSlices={this.getTimetable()}
                    view={this.state.view}
                    date={this.state.date}
                    displayPast={this.props.displayPast}
                    canViewBooking={this.props.canViewBooking}
                    displayDayView={this.props.displayDayView}
                    dayClicked={this.onDayChoosenBound}
                    slotClicked={this.props.onSlotChoosen}
                    size={this.props.size} />
            </div>
        );
    }

    onDateChanged(date) {
        this.setState({ date });
    }

    onViewChanged(view) {
        this.setState({ view });
    }

    onDayChoosen(booking) {
        this.setState({ view: ViewType.Day, date: booking.startDate });
    }
}

export default sizeMe()(Calendar);
