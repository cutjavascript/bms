import moment from 'moment';
import { localDatTime, convertedDateTime } from '../components/util';
import types from '../action_types';

const initialState = {
  data: {
    studio_id: 123,
    studio_name: 'Neelam Studios',
    bookings: [
      {
        // #if that slot has not been alotted by studio
        booking_id: 11,
        day: '20180618',
        timings: [
          { hour: '10am', amount: 8000, booked: 'y' },
          { hour: '11am', amount: 9000, booked: 'y' },
          { hour: '9pm', amount: 10000, booked: 'n' },
        ],
      },
      {
        booking_id: 12,
        day: '20180619',
        timings: [
          { hour: '9am', amount: 5000, booked: 'n' },
          { hour: '11am', amount: 6000, booked: 'y' },
          { hour: '5pm', amount: 10000, booked: 'n' },
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
function bookingData(state)
{



const booked = [];
// /// not available
const available = [];
let day = '';
state.data.bookings.map(x => {

  x.timings.map(y => {
    day = String(x.day) + String(y.hour);
    y.booked == 'y' && booked.push({ time: day });
    y.booked == 'n' && available.push({ time: day, amount: y.amount,booking_id:x.booking_id });
  });
});


return Object.assign({},{booked:booked,available:available});

}
export default (state = initialState, action) => {
  console.log('===state', state);

  /*
bookings
            {
                startDate: localDatTime.clone().add(-2, 'd').seconds(0).milliseconds(0).hours(10).minutes(0),
                endDate: localDatTime.clone().add(-2, 'd').seconds(0).milliseconds(0).hours(10).minutes(30)
            },{
                startDate: localDatTime.clone().add(2, 'd').seconds(0).milliseconds(0).hours(10).minutes(0),
                endDate: localDatTime.clone().add(2, 'd').seconds(0).milliseconds(0).hours(10).minutes(30)
            },
            {
                startDate: localDatTime.clone().add(1, 'd').seconds(0).milliseconds(0).hours(12).minutes(0),
                endDate: localDatTime.clone().add(1, 'd').seconds(0).milliseconds(0).hours(13).minutes(30)
            }



            [{ day: 'Monday', start:getTime(10, 0), end: getTime(18, 0),price:2000 },
            { day: 'Tuesday', start: getTime(9, 30), end: getTime(16, 0) ,price:3000},
            { day: 'Wednesday', start: getTime(9, 30), end: getTime(17, 0),price:4000 },
            { day: 'Thursday', start: getTime(10, 30), end: getTime(16, 30),price:5000 },
            { day: 'Friday', start: getTime(8, 30), end: getTime(17, 30),price:6000 },
            { day: 'Saturday', start: getTime(10, 30), end: getTime(16, 30),price:7000 },
            { day: 'Sunday', start: getTime(0, 30), end: getTime(23, 30),price:8000 }]




            timeExceptions: [ {
              startDate: localDatTime.clone().add(3, 'd').format('L'),
              endDate: localDatTime.clone().add(5, 'd').format('L'),
              startTime: getTime(9, 0),
              endTime: getTime(17, 0)
          },
          {
              startDate: localDatTime.clone().add(6, 'd').format('L'),
              endDate: localDatTime.clone().add(7, 'd').format('L'),
              startTime: getTime(11, 0),
              endTime: getTime(14, 0),
              off: true
          }],
*/






  switch (action.type) {
    case types.LOAD_HOME_SUCCESS:{

return state;
      console.log('===  Line:122, File:e:\gitwork\bms\src\reducers\simpleReducer.js',)
    }
    default:{
      const newObj=bookingData(state);
      console.log('===newObj  Line:121, File:e:\gitwork\bms\src\reducers\simpleReducer.js',newObj)
      return {...state,...newObj};

  }
}
};
