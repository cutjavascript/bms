import axios from "axios";
import types from "../../action_types";

export default loadCart => dispatch => {
  dispatch({ type: types.LOAD_CART_REQUEST, payload: {} });

  const params = {
    user_id: 2,
  };

  async function getCart() {
    try {
      const response = await axios.post("http://localhost:8080/bookings/getCart", {
        ...loadCart,
      });
      console.log("===response  Line:16, File:e:gitwork\bmssrcapiloadCartindex.js", response);

      dispatch({
        type: types.LOAD_CART_SUCCESS,
        payload: { data: { ...response.data, loadCart } },
      });
    } catch (error) {
      dispatch({
        type: types.LOAD_CART_FAIL,
        payload: "Error loading Cart Details: ",
      });
    }
  }

  getCart();
};
