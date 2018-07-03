import axios from "axios";
import types from "../../action_types";

export default loadStudioServices => dispatch => {
  dispatch({ type: types.LOAD_STUDIO_SERVICES_REQUEST, payload: {} });
  console.log("===loadStudioServices  Line:6, File:e:gitwork\bmssrcapiloadStudioServicesindex.js", loadStudioServices);
  async function getStudioServices() {
    try {
      const response = await axios.post("http://localhost:8080/studios/getStudioService", {
        ...loadStudioServices,
      });
      console.log("===response  Line:17, File:e:gitwork\bmssrcapiloadStudioServicesindex.js", response);
      dispatch({
        type: types.LOAD_STUDIO_SERVICES_SUCCESS,
        payload: { data: { ...response.data, ...loadStudioServices } },
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
