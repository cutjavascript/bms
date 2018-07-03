import axios from 'axios';
import types from '../../action_types';

export default loadCartServices => dispatch => {
  dispatch({ type: types.LOAD_CART_SERVICES_REQUEST, payload: {} });

  const params = {
    user_id: 2,
    studio_id: 2,
  };

  async function getCartServices() {
    try {
      const response = await axios.post('http://localhost:8080/cartServices', {
        params: {
          ...params,
        },
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
      });
      dispatch({
        type: types.LOAD_CART_SERVICES_SUCCESS,
        payload: { data: { ...response.data, loadCartServices } },
      });
    } catch (error) {
      dispatch({
        type: types.LOAD_CART_SERVICES_FAIL,
        payload: 'Error loading Cart Services: ',
      });
    }
  }

  getCartServices();
};
