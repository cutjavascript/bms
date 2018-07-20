import axios from "axios";
import types from "../../action_types";

export default (servicesSelected, { user_id, studio_id }) => (dispatch, getState) => {
  console.log("===servicesSelected  Line:5, File:e:gitwork\bmssrcapisubmitServicesindex.js", servicesSelected);
  let services = [];
  if (servicesSelected.length > 0) {
    servicesSelected.map(x => services.push({ service_id: x, count: 0 }));
  }
  console.log("===services  Line:9, File:e:gitwork\bmssrcapisubmitServicesindex.js", services);
  const postData = {
    studio_id: studio_id,
    user_id: user_id,

    services: services,
  };

  dispatch({ type: types.SUBMIT_STUDIO_SERVICES_REQUEST, payload: { postData } });
  axios
    .post("http://localhost:8080/bookings/submitServices", {
      ...postData,
    })
    .then(response => {
      console.log("===response  Line:33, File:e:gitwork\bmssrcapisubmitServicesindex.js", response);
      const status = ((response.data || {}).data || {}).status || false;
      if (status) {
        console.log("===  Line:36, File:e:gitwork\bmssrcapisubmitServicesindex.js");
        dispatch({
          type: types.SUBMIT_STUDIO_SERVICES_SUCCESS,
          payload: { ...((response.data || {}).data || {}), postData },
        });
      } else {
        dispatch({ type: types.SUBMIT_STUDIO_SERVICES_FAIL, payload: { postData } });
      }
    })
    .catch(error => {
      dispatch({ type: types.SUBMIT_STUDIO_SERVICES_FAIL, payload: { ...error, postData } });
    });
};
