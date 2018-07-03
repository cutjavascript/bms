import types from "../action_types";

const initialState = { services: [], isLoading: false, submitted: false };

export default (state = initialState, action) => {
  console.log("===action  Line:5, File:e:gitwork\bmssrc\reducersstudioServicesReducer.js", action);
  switch (action.type) {
    case types.LOAD_STUDIO_SERVICES_REQUEST: {
      return { ...state, isLoading: true, submitted: false };
    }

    case types.LOAD_STUDIO_SERVICES_SUCCESS: {
      console.log(
        "===action.payload.data  Line:11, File:e:gitwork\bmssrc\reducersstudioServicesReducer.js",
        action.payload.data,
      );
      const services = ((action.payload.data || {}).data || {}).services || {};
      const studio_id = (action.payload.data || {}).studio_id || 0;
      const user_id = (action.payload.data || {}).user_id || 0;

      if (services.length > 0) {
        return { ...state, services, isLoading: false, studio_id: studio_id, user_id: user_id, submitted: false };
      }
      console.log("===action  Line:11, File:e:gitwork\bmssrc\reducersloadStudioServices.js", action);

      return { ...state, services: [], isLoading: false, submitted: false };
    }

    case types.SUBMIT_STUDIO_SERVICES_SUCCESS: {
      console.log("===  Line:28, File:e:gitwork\bmssrc\reducersstudioServicesReducer.js");
      return { ...state, services: [], isLoading: false, submitted: true };
    }

    case types.LOAD_STUDIO_SERVICES_FAIL: {
      return { ...state, services: [], isLoading: false, submitted: false };
    }
    default: {
      return state;
    }
  }
};
