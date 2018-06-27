import axios from 'axios';
import types from '../../action_types';

export default ({ bookingId, bookingTime, cartId = 0, bookingDay }) => (dispatch, getState) => {
  const bookings = [],
    services = [];
  bookingId && bookingTime
    ? bookings.push({
        slot_id: bookingId,
        booking_time: bookingTime,
        availed: true,
      })
    : '';

  // const bookings=[{ "slot_id": bookingId, "booking_time": bookingTime, "availed": true }, { "slot_id": 2, "booking_time": "9pm", }];
  // const services=[{ "service_id": 1, "service_count": 2, "availed": true  }, { "service_id": 2, "service_count": 1,   }];
  const postData = {
    studio_id: 1,
    user_id: 2,
    cart_id: cartId,
    bookings,
    services,
    bookingDay,
  };

  dispatch({ type: types.ADD_TO_CART_REQUEST, payload: { postData } });
  axios
    .post('http://localhost:8080/bookings/setCarts', {
      ...postData,
    })
    .then(response => {
      const status = String(((response.data || {}).data || {}).status || '').toLowerCase();
      if (status) {
        dispatch({
          type: types.ADD_TO_CART_SUCCESS,
          payload: { ...((response.data || {}).data || {}), postData },
        });
      } else {
        dispatch({ type: types.ADD_TO_CART_FAIL, payload: { postData } });
      }
    })
    .catch(error => {
      dispatch({ type: types.ADD_TO_CART_FAIL, payload: { ...error, postData } });
    });
};
