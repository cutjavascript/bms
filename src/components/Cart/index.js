import React from "react";
import PropTypes from "prop-types";
import { find, isEqual } from "lodash";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      cartDetails: {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("===nextProps  Line:14, File:e:gitwork\bmssrccomponentsCartindex.js", nextProps);
    console.log("===prevState  Line:16, File:e:gitwork\bmssrccomponentsCartindex.js", prevState);
    if (!isEqual(nextProps.cartDetails, prevState.cartDetails)) {
      console.log("===  Line:15, File:e:gitwork\bmssrccomponentsCartindex.js");
      return { cartDetails: nextProps.cartDetails };
    } else return null;
  }
  formatServices = services => {
    console.log("===services  Line:23, File:e:gitwork\bmssrccomponentsCartindex.js", services);
    if (services.lenght == 0) {
      return <div>No Cart Data</div>;
    }

    const formatted = services.map(x => (
      <div>
        <div>Service Name:{x.service_name}</div>
        <div>Required Slots:{x.required_slots}</div>

        {x.bookings &&
          x.bookings.length > 0 &&
          x.bookings.map(y => (
            <div>
              <div>Day:{y.day}</div>
              <ul>
                {y.timings &&
                  y.timings.map(z => (
                    <li>
                      Amount:<span>{z.amount}</span>,Time:<span>{z.booking_time}</span>{" "}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
      </div>
    ));
    console.log("===formatted  Line:50, File:e:gitwork\bmssrccomponentsCartindex.js", formatted);
    return <div>{formatted}</div>;
  };
  render() {
    if (!this.props.cartDetails || !this.props.cartDetails.status) {
      return <div>Loading</div>;
    }
    const cartTotal = (this.props.cartDetails.data || {}).cart_total || 0;
    const services = (this.props.cartDetails.data || {}).services || {};
    const formarServices = this.formatServices(services);
    console.log("===formarServices  Line:55, File:e:gitwork\bmssrccomponentsCartindex.js", formarServices);
    // const data = this.props.cartDetails.map(x => {});
    return <div>{formarServices}</div>;
  }
}

export default Cart;
