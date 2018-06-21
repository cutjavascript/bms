import types from '../action_types';

const postData={studio_id: 0,
  user_id: 0,
  cart_id: 0,
  bookings:[],
  services:[],
  bookingDay:0};
const initialState = {
  cart_id: 0,
  status: false,
  isLoading: false,
  msg: '',
  postData:postData,
};

export default (state = initialState, action) => {
  console.log('===action  Line:11, File:e:\gitwork\bms\src\reducers\addToCartReducer.js',action)
  switch (action.type) {
    case types.ADD_TO_CART_REQUEST: {
      return { ...state, isLoading: true ,       postData:(action.payload || {}).postData|| postData, };
    }
    case types.ADD_TO_CART_SUCCESS: {

      return {
        ...state,
        isLoading: false,
        cart_id: (action.payload || {}).cart_id || 0,
        postData:(action.payload || {}).postData|| postData,
      };
    }
    case types.ADD_TO_CART_FAIL: {
      return {
        ...state,
        isLoading: false,
        msg: (action.payload || {}).msg || 'There is an Issue with this Request, Please try again later.',
        postData:(action.payload || {}).postData|| postData,
      };
    }
    default: {
      return { ...state };
    }
  }
};
