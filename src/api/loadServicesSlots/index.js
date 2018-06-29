import axios from "axios";
import types from "../../action_types";

export default loadServicesSlots => dispatch => {
  dispatch({ type: types.LOAD_SERVICES_SLOTS_REQUEST, payload: {} });

  const params = {
    user_id: 2,
    cart_service_id: 2,
  };

  async function getServicesSlots() {
    try {
      const response = await axios.post("http://localhost:8080/fetchServicesSlots", {
        params: {
          ...params,
        },
        headers: {
          "content-type": "application/json",
          "cache-control": "no-cache",
        },
      });
      dispatch({
        type: types.LOAD_SERVICES_SLOTS_SUCCESS,
        payload: { data: { ...response.data, loadServicesSlots } },
      });
    } catch (error) {
      dispatch({
        type: types.LOAD_SERVICES_SLOTS_FAIL,
        payload: "Error loading Slots for Services: ",
      });
    }
  }

  getServicesSlots();
};
