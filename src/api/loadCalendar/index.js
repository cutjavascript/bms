import axios from "axios";
import types from "../../action_types";

export default (params, serviceid) => dispatch => {
  dispatch({ type: types.LOAD_HOME_REQUEST, payload: {} });

  async function getUser() {
    try {
      const response = await axios.post("http://localhost:8080/studios/fetchServicesSlots", {
        user_id: params.user_id,
        cart_service_id: serviceid,
      });
      dispatch({
        type: types.LOAD_HOME_SUCCESS,
        payload: { data: { ...response.data, ...params, serviceid } },
      });
    } catch (error) {
      dispatch({
        type: types.LOAD_HOME_FAIL,
        payload: "Error fetching message: ",
      });
    }
  }

  getUser();
};
