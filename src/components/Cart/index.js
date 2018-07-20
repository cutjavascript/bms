import React from "react";
import PropTypes from "prop-types";
import { find, isEqual } from "lodash";
import PaypalExpressBtn from "react-paypal-express-checkout";

import Tickmark from "./tickmark";
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      cartDetails: {},
      cancel: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("===nextProps  Line:14, File:e:gitwork\bmssrccomponentsCartindex.js", nextProps);
    console.log("===prevState  Line:16, File:e:gitwork\bmssrccomponentsCartindex.js", prevState);
    if (!isEqual(nextProps.cartDetails, prevState.cartDetails)) {
      console.log("===  Line:15, File:e:gitwork\0.js");
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

        {x.bookings && (
          <div>
            <div>Day:{x.bookings.day}</div>

            <ul>
              {x.bookings.timings.map(z => (
                <li>
                  Amount:<span>{z.amount}</span>,Time:<span>{z.booking_time}</span>{" "}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ));
    console.log("===formatted  Line:50, File:e:gitwork\bmssrccomponentsCartindex.js", formatted);
    return <div>{formatted}</div>;
  };

  onSuccess = payment => {
    // Congratulation, it came here means everything's fine!
    console.log("The payment was succeeded!", payment);
    // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
  };

  onCancel = data => {
    this.setState({ cancel: true });
    // User pressed "cancel" or close Paypal's popup!
    console.log("The payment was cancelled!", data);
    // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
  };

  onError = err => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    console.log("Error!", err);
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
  };

  render() {
    if (!this.props.cartDetails || !this.props.cartDetails.status) {
      return <div>Loading</div>;
    }
    const client = {
      sandbox: "Ad_BRcV4gzj0VOxt0z5x_YGhcEzjYwCZYu6qZf0fJWMKEuyvK4bQNX-MrhF1JB0J204zxt-W5ziZ4WoO",
      production: "YOUR-PRODUCTION-APP-ID",
    };

    let env = "sandbox"; // you can set here to 'production' for production
    let currency = "USD"; // or you can set this value from your props or state
    let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

    const cartTotal = (this.props.cartDetails.data || {}).cart_total || 0;
    const services = (this.props.cartDetails.data || {}).services || {};
    const formarServices = this.formatServices(services);
    console.log("===formarServices  Line:55, File:e:gitwork\bmssrccomponentsCartindex.js", formarServices);
    // const data = this.props.cartDetails.map(x => {});
    return (
      <div>
        {formarServices}{" "}
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={this.onError}
          onSuccess={this.onSuccess}
          onCancel={this.onCancel}
        />
        {this.state.cancel && <Tickmark />}
      </div>
    );
  }
}

export default Cart;
