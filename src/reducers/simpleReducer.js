import moment from 'moment';

const initialState = {
               "data":{
              "studio_id":123,
              "studio_name":"Neelam Studios",
                "bookings":[{//#if that slot has not been alotted by studio
                    "booking_id":11,
                    "day":"20180618",
                    "10am" : {"amount": 8000,"booked":"y"},
                    "11am" : {"amount": 9000,"booked":"y"},
                    "9pm" : {"amount": 10000,"booked":"n"},
                  },{
                  "booking_id":12,
                  "day":"20180619",
                  "9am" : {"amount": 5000,"booked":"n"},
                  "11am" : {"amount": 6000,"booked":"y"},
                  "5pm" : {"amount": 10000,"booked":"n"},
                    }],

                    "services":[{
                      "service_id":1,
                      "service_name":"Voice Recording",
                      "slots_required":2,
                      "amount":2000
                    },{
                      "service_id":2,
                      "service_name":"Mixing",
                      "slots_required":0,
                      "amount":2000
                    }]
              }
};

export default (state = initialState, action) => {
console.log('===state',state);

  switch (action.type) {
    default:
      return state;
  }
};
