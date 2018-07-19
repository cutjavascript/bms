import axios from "axios";
import types from "../../action_types";

export default ({ bookingId, bookingTime, cartId = 0, bookingDay, serviceid }) => (dispatch, getState) => {
  const bookings = [],
    services = [];
  bookingId && bookingTime
    ? bookings.push({
        slot_id: bookingId,
        booking_time: bookingTime,
        availed: true,
      })
    : "";
  // {"studio_id":1,"user_id":2,"cart_id":0,"bookings":[{"slot_id":1,"booking_time":"2pm","availed":true}],"services":[],"bookingDay":"201807312pm"}

  // "user_id": 2,
  //         "cart_service_id": 37,
  //         "bookings": [
  //           {
  //           "slot_id": 1,
  //           "booking_time": "5pm",
  //           "availed": true
  //           }
  //         ],
  //         "bookingDay": "201807044pm"
  //       }

  // const bookings=[{ "slot_id": bookingId, "booking_time": bookingTime, "availed": true }, { "slot_id": 2, "booking_time": "9pm", }];
  // const services=[{ "service_id": 1, "service_count": 2, "availed": true  }, { "service_id": 2, "service_count": 1,   }];
  const postData = {
    studio_id: 1,
    user_id: 2,
    cart_id: cartId,
    bookings,
    services,
    bookingDay,
    cart_service_id: Number(serviceid),
  };

  dispatch({ type: types.REMOVE_SLOTS_REQUEST, payload: { postData } });
  axios
    .post("http://localhost:8080/bookings/uncheckSlots", {
      ...postData,
    })
    .then(response => {
      console.log("===response  Line:46, File:e:gitwork\bmssrcapiaddSlotsindex.js", response);

      const status = ((response.data || {}).data || {}).status || false;
      console.log("===status  Line:49, File:e:gitwork\bmssrcapiaddSlotsindex.js", status);
      if (status) {
        dispatch({
          type: types.REMOVE_SLOTS_SUCCESS,
          payload: { ...((response.data || {}).data || {}), postData },
        });
      } else {
        dispatch({ type: types.REMOVE_SLOTS_FAIL, payload: { postData } });
      }
    })
    .catch(error => {
      dispatch({ type: types.REMOVE_SLOTS_FAIL, payload: { ...error, postData } });
    });
};
