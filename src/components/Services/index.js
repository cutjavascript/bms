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
    const vv = (
      <CheckboxData
        label={service.service_name}
        handleCheckboxChange={this.toggleCheckbox}
        key={service.studio_service_id}
        amount={service.amount}
        slotsRequired={service.slots_required}
        studioServiceId={service.studio_service_id}
      />
    );

    return vv;
  };

  componentDidMount() {
    this.props.loadServices();
  }
  createCheckboxes = services => {
    const chks =
      services &&
      services.length > 0 &&
      services.map(x => {
        return this.checkbox(x);
      });
    return chks;
    console.log("===chks  Line:42, File:e:gitwork\bmssrccomponentsServicesindex.js", chks);
  };
  render() {
    const services = this.props.services || {};

    return <div className="servicesBox">{this.createCheckboxes(services)}</div>;
  }
}

export default Services;
