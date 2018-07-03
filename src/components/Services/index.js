import React from "react";
import CheckboxData from "./CheckboxData";

import "../style/main.css";

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.checkbox = this.checkbox.bind(this);
    this.createCheckboxes = this.createCheckboxes.bind(this);
    this.state = { servicesSelected: [] };
  }

  handleCheckboxChange = (studioServiceId, originalStatus) => {
    this.setState((prevState, props) => {
      let prevServices = prevState.servicesSelected.slice();
      console.log("===prevServices  Line:16, File:e:gitwork\bmssrccomponentsServicesindex.js", prevServices);
      const serviceExists = prevServices.includes(studioServiceId);
      if (serviceExists) {
        prevServices.splice(prevServices.indexOf(studioServiceId), 1);
      } else {
        prevServices.push(studioServiceId);
      }

      return { servicesSelected: prevServices };
    });

    console.log("===studioServiceId  Line:15, File:e:gitwork\bmssrccomponentsServicesindex.js", studioServiceId);
  };

  checkbox = service => {
    const checkbox = (
      <CheckboxData
        label={service.service_name}
        handleCheckboxChange={this.handleCheckboxChange}
        key={service.studio_service_id}
        amount={service.amount}
        slotsRequired={service.slots_required}
        studioServiceId={service.studio_service_id}
      />
    );

    return checkbox;
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

  submitClicked = () => {
    this.props.submit(this.state.servicesSelected);
  };
  render() {
    console.log("===this.props  Line:43, File:e:gitwork\bmssrccomponentsServicesindex.js", this.props);
    const services = this.props.services || {};
    const studio_id = this.props.studio_id || 0;
    const service_id = this.props.service_id || 0;

    return (
      <div style={{ marginTop: "400px" }} className="servicesBox">
        {this.createCheckboxes(services)}
        <button onClick={this.submitClicked} type="button">
          Submit{" "}
        </button>
      </div>
    );
  }
}

export default Services;
