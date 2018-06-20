import axios from 'axios';
import types from '../../action_types';

export default submitBooking => dispatch => {
  dispatch({ type: types.SUBMIT_BOOKING_REQUEST, payload: {} });

  async function getUser() {
    try {
      const response = await axios.get('http://localhost:8080/studios/getStudioService/1');
      dispatch({
        type: types.SUBMIT_BOOKING_SUCCESS,
        payload: { data: { ...response.data, loadHome } },
      });
    } catch (error) {
      dispatch({
        type: types.SUBMIT_BOOKING_FAIL,
        payload: 'Error fetching message: ',
      });
    }
  }

  getUser();
};
