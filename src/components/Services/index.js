import React from "react";
import CheckboxData from "./CheckboxData";

import "../style/main.css";

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.checkbox = this.checkbox.bind(this);
    this.createCheckboxes = this.createCheckboxes.bind(this);
  }

  toggleCheckbox() {}

  checkbox = service => {
    <CheckboxData
      label={service.service_name}
      handleCheckboxChange={this.toggleCheckbox}
      key={service.studio_service_id}
      amount={service.amount}
      slotsRequired={service.slots_required}
      studioServiceId={service.studio_service_id}
    />;
  };

  componentDidMount() {
    this.props.loadServices();
  }
  createCheckboxes = services => {
    console.log("===services  Line:27, File:e:gitwork\bmssrccomponentsServicesindex.js", services);

    services &&
      services.length > 0 &&
      services.map(x => {
        console.log("===  Line:29, File:e:gitwork\bmssrccomponentsServicesindex.js");
        this.checkbox(x);
      });
  };
  render() {
    console.log("===this.props  Line:36, File:e:gitwork\bmssrccomponentsServicesindex.js", this.props);
    const services = this.props.services || {};
    console.log("===services  Line:39, File:e:gitwork\bmssrccomponentsServicesindex.js", services);
    console.log("===this.props  Line:29, File:e:gitwork\bmssrccomponentsServicesindex.js", this.props);
    return <div className="servicesBox">{this.createCheckboxes(services)}</div>;
  }
}

export default Services;
