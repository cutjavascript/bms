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

function servicesData(data) {
  const services = data.services || [];
  let output = [];
  let servicesSelected = [];
  if (services.length > 0) {
    services.map(x => {
      servicesSelected.push(x.service_id);
      x.bookings_required > 0 && output.push({ text: x.service_name, value: x.cart_service_id });
    });
  }

  console.log("===output  Line:60, File:e:gitwork\bmssrc\reducersloadCartReducer.js", output);
  console.log("===data  Line:51, File:e:gitwork\bmssrc\reducersloadCartReducer.js", data);

  return { output, servicesSelected };
}
export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_HOME_REQUEST: {
      return { ...state, isLoading: true };
    }

    case types.LOAD_HOME_SUCCESS: {
      console.log(
        "===action.payload.data  Line:71, File:e:gitwork\bmssrc\reducersloadCartReducer.js",
        action.payload.data,
      );
      console.log("===  Line:71, File:e:gitwork\bmssrc\reducersloadCartReducer.js");
      const newObj = bookingData(
        action.payload.data,
        // state,
      );
      const serviceid = action.payload.data.serviceid || 0;
      return { ...state, ...newObj, isLoading: false, serviceid };
    }

    case types.LOAD_HOME_FAIL: {
      return state;
    }

    case types.LOAD_CART_SERVICES_REQUEST: {
      return { ...state, isLoading: true };
    }

    case types.LOAD_CART_SERVICES_SUCCESS: {
      console.log("===  Line:87, File:e:gitwork\bmssrc\reducersloadCartReducer.js");
      const newObj = servicesData(
        action.payload.data,
        // state,
      );
      return { ...state, services: newObj.output, servicesSelected: newObj.servicesSelected, isLoading: false };
    }

    case types.LOAD_CART_SUCCESS: {
      console.log("===  Line:102, File:e:gitwork\bmssrc\reducersloadCartReducer.js");
      return { ...state, cartDetails: { ...action.payload.data, status: true } };
    }

    case types.LOAD_CART_SERVICES_FAIL: {
      return state;
    }

    default: {
      return state;
    }
  }
};
