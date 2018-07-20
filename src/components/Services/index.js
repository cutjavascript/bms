import React from "react";
import CheckboxData from "./CheckboxData";

import "../style/main.css";

class Services extends React.Component {
  constructor(props) {
    super(props);
    console.log("===props  Line:9, File:e:gitwork\bmssrccomponentsServicesindex.js", props);
    this.checkbox = this.checkbox.bind(this);
    this.createCheckboxes = this.createCheckboxes.bind(this);
    this.state = { servicesSelected: [] };
  }

  handleCheckboxChange = (studioServiceId, originalStatus) => {
    console.log("===studioServiceId  Line:15, File:e:gitwork\bmssrccomponentsServicesindex.js", studioServiceId);
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
    const servicesSelected = this.props.servicesSelected || [];
    const selected = servicesSelected && servicesSelected.includes(service.studio_service_id);

    const checkbox = (
      <CheckboxData
        label={service.service_name}
        handleCheckboxChange={this.handleCheckboxChange}
        key={service.studio_service_id}
        amount={service.amount}
        slotsRequired={service.slots_required}
        studioServiceId={service.studio_service_id}
        selected={selected}
      />
    );
    // if (selected) {
    //   this.handleCheckboxChange(service.studio_service_id, true);
    //   this.setState((prevState, props) => {
    //     let prevServices = prevState.servicesSelected.slice();

    //     const serviceExists = prevServices.includes(service.studio_service_id);
    //     if (serviceExists) {
    //       // prevServices.splice(prevServices.indexOf(service.studio_service_id), 1);
    //     } else {
    //       prevServices.push(service.studio_service_id);
    //       return { servicesSelected: prevServices };
    //     }
    //   });
    // }
    return checkbox;
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("===nextProps  Line:45, File:e:gitwork\bmssrccomponentsServicesindex.js", nextProps);
    return null;
  }
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
    console.log(
      "===this.state.servicesSelected  Line:80, File:e:gitwork\bmssrccomponentsServicesindex.js",
      this.state.servicesSelected,
    );
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
