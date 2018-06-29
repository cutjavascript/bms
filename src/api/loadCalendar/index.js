import axios from "axios";
import types from "../../action_types";

export default loadCalendar => dispatch => {
  dispatch({ type: types.LOAD_HOME_REQUEST, payload: {} });

  async function getUser() {
    try {
      const response = await axios.get("http://localhost:8080/studios/getStudioService/1", {
        params: {
          id: 1,
        },
        headers: {
          "content-type": "application/json",
          "cache-control": "no-cache",
        },
      });
      dispatch({
        type: types.LOAD_HOME_SUCCESS,
        payload: { data: { ...response.data, loadCalendar } },
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
