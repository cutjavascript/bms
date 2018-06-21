import types from '../action_types';

const initialState = {
  cart_id: 0,
  status: false,
  isLoading: false,
  msg: '',
};

export default (state = initialState, action) => {
  console.log('===action.payload  Line:16, File:e:gitwork\bmssrc\reducersaddToCart.js', action.payload);
  switch (action.type) {
    case types.ADD_TO_CART_REQUEST: {
      return { ...state, isLoading: true };
    }
    case types.ADD_TO_CART_SUCCESS: {
      if (!action.payload.data) {
        return state;
      }
      return {
        ...state,
        isLoading: false,
        cart_id: (action.payload || {}).cart_id || 0,
      };
    }
    case types.ADD_TO_CART_FAIL: {
      return {
        ...state,
        isLoading: false,
        msg: (action.payload || {}).msg || 'There is an Issue with this Request, Please try again later.',
      };
    }
    default: {
      return { ...state };
    }
  }
};
