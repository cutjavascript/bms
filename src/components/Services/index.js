import React from "react";

import "../style/main.css";

class Services extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadServices();
  }

  render() {
    return <div>a</div>;
  }
}

export default Services;
