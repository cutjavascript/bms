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

    services: [
      {
        ///#if no services are selected then it will be blank
        service_id: 1,
        count: 0, //#it is 0 as this service requires slots, and CAN'T be increased by itself
      },
      {
        service_id: 2,
        count: 1, //#it is 4 as this service does not require slots, and CAN be increased by itself
      },
    ],
  };

  dispatch({ type: types.SUBMIT_STUDIO_SERVICES_REQUEST, payload: { postData } });
  axios
    .post("http://localhost:8080/bookings/submitServices", {
      ...postData,
    })
    .then(response => {
      console.log("===response  Line:33, File:e:gitwork\bmssrcapisubmitServicesindex.js", response);
      const status = String(((response.data || {}).data || {}).status || "").toLowerCase();
      if (status) {
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
