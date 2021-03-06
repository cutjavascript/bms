import moment from 'moment';
import { find, filter } from 'lodash';

export function getDateTime(date, time) {
  const values = time.split(':');
  return moment(date).set({
    hour: +values[0],
    minute: +values[1],
    second: 0,
    millisecond: 0,
  });
}

export function getBookingsForDay(bookings, date) {
  return filter(bookings, x => x.startDate.isSame(date, 'days'));
}

export function getBookingsForWeek(bookings, date) {
  const startOfWeek = date.clone().startOf('isoweek');
  const endOfWeek = date.clone().endOf('isoweek');
  return filter(bookings, x => x.startDate.isBetween(startOfWeek, endOfWeek));
}

export function getBookingsForMonth(bookings, date) {
  return filter(bookings, x => x.startDate.isSame(date, 'month'));
}

export function getTimesliceForDay(timeSlices, timeExceptions, date) {
  const current = moment(date.format('L'));
  const exception = find(timeExceptions, x => current.isBetween(moment(x.startDate), moment(x.endDate), null, '[]'));
  if (exception) {
    return {
      date: current.clone(),
      start: exception.startTime,
      end: exception.endTime,
      off: exception.off,
    };
  }
  const timeSlice = find(timeSlices, x => x.day === date.format('dddd'));
  return timeSlice ? { date: current.clone(), start: timeSlice.start, end: timeSlice.end } : undefined;
}

export function getTimesliceForWeek(timeSlices, timeExceptions, date) {
  const startOfWeek = date.clone().startOf('isoweek');
  const endOfWeek = date.clone().endOf('isoweek');

  const result = [];

  let current = startOfWeek.clone();
  while (current <= endOfWeek) {
    const exception = find(timeExceptions, x => current.isBetween(moment(x.startDate), moment(x.endDate), null, '[]'));
    if (exception) {
      result.push({
        date: current.clone(),
        start: exception.startTime,
        end: exception.endTime,
        off: exception.off,
      });
    } else {
      const timeSlice = find(timeSlices, x => x.day === current.format('dddd'));
      if (timeSlice) {
        result.push({
          date: current.clone(),
          start: timeSlice.start,
          end: timeSlice.end,
        });
      }
    }

    current = current.add(1, 'd');
  }

  return result;
}

export function getTimesliceForMonth(timeSlices, timeExceptions, date, totalSlots = []) {
  const result = [];

  const daysInMonth = date.daysInMonth();
  const formattedSlotTime = '';
  for (let i = 1; i <= daysInMonth; i++) {
    const current = moment(date.set('date', i).format('L'));
    /*
    const exception = find(timeExceptions, x =>
      current.isBetween(moment(x.startDate), moment(x.endDate), null, '[]'),
    );
    if (exception) {
      result.push({
        date: current.clone(),
        start: exception.startTime,
        end: exception.endTime,
        off: exception.off,
        price: exception.price,
      });
    } else { */

    const timeSlice = find(timeSlices, x => x.day === current.format('dddd'));
    if (timeSlice) {
      result.push({
        date: current.clone(),
        start: timeSlice.start,
        end: timeSlice.end,
        price: timeSlice.price,
      });
      // }
    }
  }

  return result;
}

export function getStyle(view, numberOfColumn, numberOfSlot) {
  if (view === 'landscape') {
    return {
      width: `76.5px`, // `calc(calc(100% / ${numberOfColumn}) * ${numberOfSlot})`,
    };
  }

  return {
    height: `calc(100px * ${numberOfSlot})`,
  };
}

export function getSizeType(size) {
  if (size.width < 480) {
    return 'small';
  } else if (size.width < 1024) {
    return 'medium';
  }

  return 'big';
}

export function getSizeModifier(size) {
  if (size.width < 480) {
    return '--small';
  } else if (size.width < 1024) {
    return '--medium';
  }

  return '--big';
}

export function getTime(hour, minute) {
  const localDatTime = moment();
  //  .add(1, 'd')
  //  .utc()
  //  .zone(+330)
  return localDatTime
    .clone()
    .startOf('day')
    .hour(hour)
    .minute(minute)
    .format('HH:mm');
}

export const localDatTime = moment();
// .add(1, 'd')
// .utc()
// .zone(+360);

export function convertedDateTime(datetime) {
  return moment(datetime, 'YYYYMMDDA').isValid() ? datetime : null;
}

export function bookedSlot(day) {
  return {
    startDate: moment(day, 'YYYYMMDDhhA').minutes(0),
    endDate: moment(day, 'YYYYMMDDhhA').minutes(59),
  };
}
