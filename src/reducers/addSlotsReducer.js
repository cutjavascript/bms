import types from "../action_types";

const postData = [];
const initialState = {
  cart_id: 0,
  status: false,
  isLoading: false,
  msg: "",
  postData,
};

function removeCartData(postData, state) {
  const bookingsDetails = { day: postData.bookingDay, items: postData.bookings };
  const servicesDetails = {};
  console.log("===state.postData  Line:15, File:e:gitwork\bmssrc\reducersaddSlotsReducer.js", state.postData);
  //

  console.log("===postData  Line:16, File:e:gitwork\bmssrc\reducersaddSlotsReducer.js", postData);

  /////loop thorugh state where studio id already exists, then
  /////loop check if that studio has bookings with that day
  /////if it has bookings with that day then remove them
  /////get the index, then splice from array with that index, return index

  let newCartData = [];
  let newPostData = { studio_id: 0, bookingsDetails: [] };
  if (state.postData.length > 0) {
    state.postData.map(x => {
      if (x.studio_id === postData.studio_id) {
        newPostData.studio_id = x.studio_id;
        if (x.bookingsDetails.length > 0) {
          newPostData.bookingsDetails = x.bookingsDetails.slice();
          let toDeleteIndex = null;
          newPostData.bookingsDetails.map((y, index) => {
            console.log("===index  Line:33, File:e:gitwork\bmssrc\reducersaddSlotsReducer.js", index);
            if (y.day === postData.bookingDay) {
              console.log("===index  Line:37, File:e:gitwork\bmssrc\reducersaddSlotsReducer.js", index);
              console.log("===y.day  Line:34, File:e:gitwork\bmssrc\reducersaddSlotsReducer.js", y.day);
              console.log("===  Line:36, File:e:gitwork\bmssrc\reducersaddSlotsReducer.js");
              toDeleteIndex = index;
            }
          });
          if (toDeleteIndex => 0) {
            newPostData.bookingsDetails.splice(toDeleteIndex, 1);
          }
          // !updateBooking && newPostData.bookingsDetails.push(bookingsDetails);
        } else {
        }

        newCartData.push(newPostData);
      }
    });
    console.log("===newPostData  Line:53, File:e:gitwork\bmssrc\reducersaddSlotsReducer.js", newPostData);

    // newCartData = [{ studio_id: postData.studio_id, bookingsDetails: [bookingsDetails] }];
  }

  console.log("===newCartData  Line:57, File:e:gitwork\bmssrc\reducersaddSlotsReducer.js", newCartData);
  return newCartData;
}

function updateCartData(postData, state) {
  const bookingsDetails = { day: postData.bookingDay, items: postData.bookings };
  const servicesDetails = {};

  // ///if state does not currently hav cart id then add cart id

  // ///else if cartid already exists then just append new details

  // ///if studio id not present in state currently then add studio details only if studio id is the same
  let newCartData = [];
  let newPostData = { studio_id: 0, bookingsDetails: [] };
  if (state.postData && state.postData.length > 0) {
    state.postData.map(x => {
      if (x.studio_id === postData.studio_id) {
        newPostData.studio_id = x.studio_id;
        if (x.bookingsDetails.length > 0) {
          newPostData.bookingsDetails = x.bookingsDetails.slice();
          let updateBooking = false;
          newPostData.bookingsDetails.map(y => {
            if (y.day === postData.bookingDay) {
              updateBooking = true;
            }
          });
          !updateBooking && newPostData.bookingsDetails.push(bookingsDetails);
        } else {
        }

        newCartData.push(newPostData);
      }
    });

    // ///if original state was looped over but did not find entry existing for studio id then insert new
    if (newPostData.studio_id === 0) {
      newPostData = state.postData.slice();
      newPostData.push({ studio_id: postData.studio_id, bookingsDetails: [bookingsDetails] });
      newCartData = newPostData.slice();
    }
  } else {
    newCartData = [{ studio_id: postData.studio_id, bookingsDetails: [bookingsDetails] }];
  }
  // ///else if studio id already exists then append new details to that studio id

  // ///in studio details add bookings if not there
  // ///else if bookings already exists then append

  // if (postData) {
  //   // && state.postData.selected_details.length > 0
  //   if (newState.postData && newState.postData.cart_id) {
  //   }

  //   const selectedDetails = {
  //     studio_id: (postData || {}).studio_id || 0,
  //     bookings: bookingsDetails,
  //     services: servicesDetails,
  //   };

  //   const newCartData = {
  //     cart_id: (postData || {}).cart_id || 0,
  //     user_id: (postData || {}).user_id || 0,

  //     selected_details: [selectedDetails],
  //   };
  // }
  console.log("===newCartData  Line:75, File:e:gitwork\bmssrc\reducersaddSlotsReducer.js", newCartData);
  return newCartData;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_SLOTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        // postData: (action.payload || {}).postData || postData
      };
    }
    case types.ADD_SLOTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        cart_id: (action.payload || {}).cart_id || 0,
        postData: updateCartData((action.payload || {}).postData || {}, state), // (action.payload || {}).postData || postData,
      };
    }
    case types.ADD_SLOTS_FAIL: {
      return {
        ...state,
        isLoading: false,
        msg: (action.payload || {}).msg || "There is an Issue with this Request, Please try again later.",
        // postData: (action.payload || {}).postData || postData,
      };
    }
    case types.REMOVE_SLOTS_SUCCESS: {
      console.log("===  Line:153, File:e:gitwork\bmssrc\reducersaddSlotsReducer.js");
      return {
        ...state,
        isLoading: false,
        cart_id: (action.payload || {}).cart_id || 0,
        postData: removeCartData((action.payload || {}).postData || {}, state), // (action.payload || {}).postData || postData,
      };
    }
    default: {
      return { ...state };
    }
  }
};
