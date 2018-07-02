import types from "../action_types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_STUDIO_SERVICES_REQUEST: {
      return { ...state, isLoading: true };
    }

    case types.LOAD_STUDIO_SERVICES_SUCCESS: {
      const newObj = bookingData(
        action.payload.data,
        // state,
      );
      return { ...state, ...newObj, isLoading: false };
    }

    case types.LOAD_STUDIO_SERVICES_FAIL: {
      return state;
    }
    default: {
      return state;
    }
  }
};
