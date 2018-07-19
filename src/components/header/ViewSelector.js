import React from "react";

import { ViewType } from "../constant";
import { getSizeModifier } from "../util";

export default class ViewSelector extends React.Component {
  onClickBound = this.onClick.bind(this);

  getModifier(view) {
    return view === this.props.view ? " rbc-view__button--active" : "";
  }
  getServicesDropdown = services => {
    let dropdown = services.map(x => {
      return <option value={x.value}>{x.text}</option>;
    });

    dropdown.unshift(<option value="0">Select Service</option>);

    console.log("===dropdown  Line:19, File:e:gitwork\bmssrccomponentsheaderViewSelector.js", dropdown);
    return dropdown;
  };

  dropDownChange = event => {
    event.target &&
      event.target.value &&
      console.log(
        "===event.target.value  Line:19, File:e:gitwork\bmssrccomponentsheaderViewSelector.js",
        event.target.value,
      );
    console.log("===  Line:20, File:e:gitwork\bmssrccomponentsheaderViewSelector.js");
    this.props.changeSlots(event.target.value);
  };
  render() {
    console.log(
      "===this.props.services  Line:15, File:e:gitwork\bmssrccomponentsheaderViewSelector.js",
      this.props.services,
    );
    const services = this.props.services || [];
    const sizeModifier = "rbc-view" + getSizeModifier(this.props.size);
    return (
      <div className={"rbc-view " + sizeModifier}>
        <select onChange={this.dropDownChange}>
          {this.props.services && this.props.services.length > 0
            ? this.getServicesDropdown(this.props.services)
            : "<option>Loading...</option>"}
        </select>
        {/* {Object.keys(ViewType).map(key => {
          const modifier = this.getModifier(ViewType[key]);
          return (
            <button
              key={key}
              data-view={ViewType[key]}
              className={"rbc-view__button" + modifier}
              onClick={this.onClickBound}
            >
              {this.props.resources[key]}
            </button>
          );
        })} */}
      </div>
    );
  }

  onClick(e) {
    e.preventDefault();

    if (this.props.change) {
      const view = e.currentTarget.dataset.view;
      this.props.change(view);
    }
  }
}
