import moment from "moment";
import { localDatTime, convertedDateTime, bookedSlot } from "../components/util";
import types from "../action_types";

const initialState = {
  isLoading: false,
  data: {
    studio_id: 0,
    studio_name: "",
    bookings: [],

    services: [],
  },
};
function bookingData(state) {
  let day = "",
    convertedSlot = "";
  let totalSlots = [],
    booked = [],
    available = [];
  const dayIds = {};

  state.data.bookings.map(x => {
    x.timings.map(y => {
      day = String(moment(x.day, "YYYYMMDD").format("YYYYMMDD")) + String(y.hour);

      convertedSlot = convertedDateTime(day);
      totalSlots.push(convertedSlot);
      y.booked && booked.push(bookedSlot(day));
      !y.booked &&
        available.push({
          time: day,
          amount: y.amount,
          booking_id: x.slot_id,
        });
      dayIds[day] = x.slot_id;
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
  switch (action.type) {
    case types.LOAD_HOME_REQUEST: {
      return { ...state, isLoading: true };
    }

    case types.LOAD_HOME_SUCCESS: {
      const newObj = bookingData(
        action.payload.data,
        // state,
      );
      return { ...state, ...newObj, isLoading: false };
    }

    case types.LOAD_HOME_FAIL: {
      return state;
    }

    case types.LOAD_CART_SERVICES_REQUEST: {
      return { ...state, isLoading: true };
    }

    case types.LOAD_CART_SERVICES_SUCCESS: {
      const newObj = bookingData(
        action.payload.data,
        // state,
      );
      return { ...state, ...newObj, isLoading: false };
    }

    case types.LOAD_CART_SERVICES_FAIL: {
      return state;
    }

    default: {
      return state;
    }
  }
};
