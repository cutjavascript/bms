import axios from "axios";
import types from "../../action_types";

export default loadStudioServices => dispatch => {
  dispatch({ type: types.LOAD_STUDIO_SERVICES_REQUEST, payload: {} });

  const params = {
    user_id: 1,
    studio_id: 1,
  };

  async function getStudioServices() {
    try {
      const response = await axios.post("http://localhost:8080/studioServices", {
        ...params,
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
