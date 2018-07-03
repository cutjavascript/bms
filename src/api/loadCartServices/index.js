import axios from "axios";
import types from "../../action_types";

export default loadCartServices => dispatch => {
  dispatch({ type: types.LOAD_CART_SERVICES_REQUEST, payload: {} });

  async function getCartServices() {
    try {
      const response = await axios.post("http://localhost:8080/bookings/cartServices", {
        ...loadCartServices,
      });

      console.log("===response  Line:19, File:e:gitwork\bmssrcapiloadCartServicesindex.js", response);
      dispatch({
        type: types.LOAD_CART_SERVICES_SUCCESS,
        payload: { data: { ...response.data, loadCartServices } },
      });
    } catch (error) {
      dispatch({
        type: types.LOAD_CART_SERVICES_FAIL,
        payload: "Error loading Cart Services: ",
      });
    }
  }

  getCartServices();
};
