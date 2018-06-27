import types from "../action_types";

const postData = [];
const initialState = {
  cart_id: 0,
  status: false,
  isLoading: false,
  msg: "",
  postData,
};

function updateCartData(postData, state) {
  console.log("===zz state  Line:13, File:e:gitwork\bmssrc\reducersaddToCartReducer.js", state);

  const bookingsDetails = { day: postData.bookingDay, items: postData.bookings };
  const servicesDetails = {};

  /////if state does not currently hav cart id then add cart id
  console.log("===zz state  Line:19, File:e:gitwork\bmssrc\reducersaddToCartReducer.js", state);
  /////else if cartid already exists then just append new details
  console.log("===zz postData  Line:21, File:e:gitwork\bmssrc\reducersaddToCartReducer.js", postData);
  /////if studio id not present in state currently then add studio details only if studio id is the same
  let newCartData = [];
  let newPostData = { studio_id: 0, bookingsDetails: [] };
  if (state.postData.length > 0) {
    console.log("===  Line:25, File:e:gitwork\bmssrc\reducersaddToCartReducer.js");
    state.postData.map(x => {
      console.log("===x  Line:27, File:e:gitwork\bmssrc\reducersaddToCartReducer.js", x);
      if (x.studio_id === postData.studio_id) {
        console.log("===  Line:30, File:e:gitwork\bmssrc\reducersaddToCartReducer.js");
        newPostData.studio_id = x.studio_id;
        if (x.bookingsDetails.length > 0) {
          console.log("===  Line:32, File:e:gitwork\bmssrc\reducersaddToCartReducer.js");

          newPostData.bookingsDetails = x.bookingsDetails.slice();
          let updateBooking = false;
          newPostData.bookingsDetails.map(y => {
            console.log("===  Line:37, File:e:gitwork\bmssrc\reducersaddToCartReducer.js");
            if (y.day === postData.bookingDay) {
              updateBooking = true;
              console.log("===  Line:38, File:e:gitwork\bmssrc\reducersaddToCartReducer.js");
            }
          });
          !updateBooking && newPostData.bookingsDetails.push(bookingsDetails);
        } else {
          console.log("===  Line:34, File:e:gitwork\bmssrc\reducersaddToCartReducer.js");
        }
        console.log("===  Line:35, File:e:gitwork\bmssrc\reducersaddToCartReducer.js");

        console.log("===  Line:38, File:e:gitwork\bmssrc\reducersaddToCartReducer.js");
        console.log("===bookingsDetails  Line:45, File:e:gitwork\bmssrc\reducersaddToCartReducer.js", bookingsDetails);

        console.log("===newPostData  Line:39, File:e:gitwork\bmssrc\reducersaddToCartReducer.js", newPostData);
        newCartData.push(newPostData);
      }
    });

    console.log("===newPostData  Line:49, File:e:gitwork\bmssrc\reducersaddToCartReducer.js", newPostData);
    /////if original state was looped over but did not find entry existing for studio id then insert new
    if (newPostData.studio_id === 0) {
      console.log("===  Line:49, File:e:gitwork\bmssrc\reducersaddToCartReducer.js");
      newPostData = state.postData.slice();
      console.log("===newPostData  Line:54, File:e:gitwork\bmssrc\reducersaddToCartReducer.js", newPostData);
      console.log("===newPostData  Line:55, File:e:gitwork\bmssrc\reducersaddToCartReducer.js", newPostData);
      newPostData.push({ studio_id: postData.studio_id, bookingsDetails: [bookingsDetails] });
      console.log("===newPostData  Line:57, File:e:gitwork\bmssrc\reducersaddToCartReducer.js", newPostData);
      newCartData = newPostData.slice();
      console.log("===newCartData  Line:59, File:e:gitwork\bmssrc\reducersaddToCartReducer.js", newCartData);
    }
  } else {
    newCartData = [{ studio_id: postData.studio_id, bookingsDetails: [bookingsDetails] }];
  }
  /////else if studio id already exists then append new details to that studio id

  /////in studio details add bookings if not there
  /////else if bookings already exists then append

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

  console.log("===zz newPostData  Line:82, File:e:gitwork\bmssrc\reducersaddToCartReducer.js", newCartData);

  return newCartData;
}

export default (state = initialState, action) => {
  console.log("===action  Line:11, File:e:gitwork\bmssrc\reducersaddToCartReducer.js", action);
  switch (action.type) {
    case types.ADD_TO_CART_REQUEST: {
      return {
        ...state,
        isLoading: true,
        // postData: (action.payload || {}).postData || postData
      };
    }
    case types.ADD_TO_CART_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        cart_id: (action.payload || {}).cart_id || 0,
        postData: updateCartData((action.payload || {}).postData || {}, state), //(action.payload || {}).postData || postData,
      };
    }
    case types.ADD_TO_CART_FAIL: {
      return {
        ...state,
        isLoading: false,
        msg: (action.payload || {}).msg || "There is an Issue with this Request, Please try again later.",
        // postData: (action.payload || {}).postData || postData,
      };
    }
    default: {
      return { ...initialState };
    }
  }
};
