import types from "../action_types";

const initialState = { services: [], isLoading: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_STUDIO_SERVICES_REQUEST: {
      return { ...state, isLoading: true };
    }

    case types.LOAD_STUDIO_SERVICES_SUCCESS: {
      const services = ((action.payload.data || {}).data || {}).services || {};
      if (services.length > 0) {
        return { ...state, services: services, isLoading: false };
      }
      console.log("===action  Line:11, File:e:gitwork\bmssrc\reducersloadStudioServices.js", action);

      return { ...state, services: [], isLoading: false };
    }

    case types.LOAD_STUDIO_SERVICES_FAIL: {
      return { ...state, services: [], isLoading: false };
    }
    default: {
      return state;
    }
  }
};
