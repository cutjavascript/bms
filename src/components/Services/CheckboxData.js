import React from "react";
import PropTypes from "prop-types";

class CheckboxData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };

    console.log("===props  Line:11, File:e:gitwork\bmssrccomponentsServicescheckbox.js", props);
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;

    this.setState(({ isChecked }) => ({
      isChecked: !isChecked,
    }));

    handleCheckboxChange(label);
  };

  render() {
    console.log("===  Line:19, File:e:gitwork\bmssrccomponentsServicescheckbox.js");
    const { label } = this.props;
    const { isChecked } = this.state;
    console.log("===this.props  Line:22, File:e:gitwork\bmssrccomponentsServicescheckbox.js", this.props);
    return (
      <div className="checkbox">
        <label>
          <input type="checkbox" value={label} checked={isChecked} onChange={this.toggleCheckboxChange} />
          {label}
          Slots Required Amount:{}
        </label>
      </div>
    );
  }
}

export default CheckboxData;
