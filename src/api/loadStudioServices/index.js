import axios from "axios";
import types from "../../action_types";

export default loadStudioServices => dispatch => {
  dispatch({ type: types.LOAD_STUDIO_SERVICES_REQUEST, payload: {} });

  const params = {
    user_id: 2,
    studio_id: 2,
  };

  async function getStudioServices() {
    try {
      const response = await axios.get("http://localhost:8080/fetchServicesSlots", {
        params: {
          ...params,
        },
        headers: {
          "content-type": "application/json",
          "cache-control": "no-cache",
        },
      });
      dispatch({
        type: types.LOAD_STUDIO_SERVICES_SUCCESS,
        payload: { data: { ...response.data, loadStudioServices } },
      });
    } catch (error) {
      dispatch({
        type: types.LOAD_STUDIO_SERVICES_FAIL,
        payload: "Error loading Services for Studio: ",
      });
    }
  }

  getStudioServices();
};
