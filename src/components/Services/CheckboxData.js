import React from "react";

class CheckboxData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.selected,
    };

    console.log("===props  Line:11, File:e:gitwork\bmssrccomponentsServicescheckbox.js", props);
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label, studioServiceId } = this.props;
    console.log("===  Line:15, File:e:gitwork\bmssrccomponentsServicesCheckboxData.js");
    let originalStatus = false;
    if (this.state.isChecked) {
      originalStatus = true;
    }

    this.setState(({ isChecked }) => ({
      isChecked: !isChecked,
    }));

    handleCheckboxChange(studioServiceId, originalStatus);
  };

  render() {
    console.log("===  Line:19, File:e:gitwork\bmssrccomponentsServicescheckbox.js");
    const { label, amount, studioServiceId, slotsRequired } = this.props;
    const { isChecked } = this.state;

    console.log("===this.props  Line:22, File:e:gitwork\bmssrccomponentsServicescheckbox.js", this.props);
    // if (servicesSelected) {
    //   // const selected = servicesSelected && servicesSelected.includes(studioServiceId);
    // }
    // console.log("===selected  Line:34, File:e:gitwork\bmssrccomponentsServicesCheckboxData.js", selected);
    return (
      <div className="checkbox">
        <label>
          <input type="checkbox" value={studioServiceId} checked={isChecked} onChange={this.toggleCheckboxChange} />
          {label}
          <span>Slots Required:{slotsRequired}</span> <span>Amount:{amount}</span>
        </label>
      </div>
    );
  }
}

export default CheckboxData;
