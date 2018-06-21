import moment from 'moment';
import { localDatTime, convertedDateTime, bookedSlot } from '../components/util';
import types from '../action_types';

const initialState = {
  isLoading: false,
  data: {
    studio_id: 123,
    studio_name: 'Neelam Studios',
    bookings: [
      {
        // #if that slot has not been alotted by studio
        booking_id: 1,
        day: '20180625',
        timings: [
          { hour: '10am', amount: 8000, booked: true },
          { hour: '11am', amount: 9000, booked: true },
          { hour: '9pm', amount: 10000, booked: false },
        ],
      },
      {
        booking_id: 1,
        day: '20180626',
        timings: [
          { hour: '9am', amount: 5000, booked: false },
          { hour: '11am', amount: 6000, booked: 'y' },
          { hour: '5pm', amount: 10000, booked: false },
        ],
      },
    ],

    services: [
      {
        service_id: 1,
        service_name: 'Voice Recording',
        slots_required: 2,
        amount: 2000,
      },
      {
        service_id: 2,
        service_name: 'Mixing',
        slots_required: 0,
        amount: 2000,
      },
    ],
  },
};
function bookingData(state) {
  console.log('===state  Line:49, File:e:\gitwork\bms\src\reducers\simpleReducer.js',state)
  let day = '',
    convertedSlot = '';
  let totalSlots = [],
    booked = [],
    available = [];
  const dayIds = {};

  state.data.bookings.map(x => {
    x.timings.map(y => {
      
      day = String(moment(x.day,'YYYYMMDD'+'000000').format("YYYYMMDD")) + String(y.hour);
      console.log("===moment(x.day,'YYYYMMDD'+'000000').format('YYYYMMDD')  Line:61, File:e:\gitwork\bms\src\reducers\simpleReducer.js",moment(x.day,'YYYYMMDD'+'000000').format("YYYYMMDD"))
      convertedSlot = convertedDateTime(day);
      totalSlots.push(convertedSlot);
      y.booked  && booked.push(bookedSlot(day));
      !y.booked  &&
        available.push({
          time: day,
          amount: y.amount,
          booking_id: x.booking_id,
        });
      dayIds[day] = x.booking_id;
    });
  });



  return Object.assign(
    {},
    {
      bookings: booked,
      available,
      totalSlots,
      dayIds,
    },
  );
}
export default (state = initialState, action) => {
  console.log('===action  Line:87, File:e:\gitwork\bms\src\reducers\simpleReducer.js',action)
  switch (action.type) {
    case types.LOAD_HOME_REQUEST: {
      return { ...state, isLoading: true };
    }

    case types.LOAD_HOME_SUCCESS: {
      const newObj = bookingData(
        // action.payload.data
        state
      );
      return { ...state, ...newObj, isLoading: false };
    }

    case types.LOAD_HOME_FAIL: {
      return state;
    }
    default: {
      return state;
    }
  }
};
