import React from "react";
import Modal from "react-awesome-modal";
import Layout from "./layout";
import Calendar from "../Calendar";
import Services from "../Services";
import Cart from "../Cart";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, showPanel: "services" };
    console.log(
      "===this.props.studioServices  Line:14, File:e:gitwork\bmssrccomponentsHomeindex.js",
      this.props.studioServices,
    );
  }

  openModal = () => {
    this.setState({
      visible: true,
    });
  };

  closeModal() {
    this.setState({ visible: false });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("===nextProps  Line:34, File:e:gitwork\bmssrccomponentsHomeindex.js", nextProps);
    const studioServices = (nextProps.studioServices || {}).submitted;
    console.log("===studioServices  Line:36, File:e:gitwork\bmssrccomponentsHomeindex.js", studioServices);
    if (nextProps.showPanel === "cart") {
      return { showPanel: "cart" };
    }
    if (studioServices && prevState.showPanel === "services") {
      return { showPanel: "slots" };
    }
    if (nextProps.loadCartReducer.services) {
      console.log(
        "===nextProps.loadCartReducer.services  Line:41, File:e:gitwork\bmssrccomponentsHomeindex.js",
        nextProps.loadCartReducer.services,
      );
    }

    return null;
  }

  render() {
    console.log("===this.state.showPanel  Line:47, File:e:gitwork\bmssrccomponentsHomeindex.js", this.state.showPanel);

    return (
      <Layout openModal={this.openModal}>
        <Modal
          visible={this.state.visible}
          width="1024"
          height="900"
          effect="fadeInUp"
          overflow-x="scroll"
          onClickAway={() => this.closeModal()}
        >
          {this.props.studioServices && this.state.showPanel === "services" ? (
            <Services
              loadServices={this.props.loadServices}
              {...this.props.studioServices}
              submit={this.props.submitServices}
              servicesSelected={this.props.loadCartReducer.servicesSelected}
            />
          ) : this.state.showPanel === "slots" ? (
            <div>
              <Calendar
                onSlotChoosen={this.props.onSlotChoosen}
                addSlotsResult={this.props.addSlotsResult}
                loadCalendar={this.props.loadCalendar}
                loadCartServices={this.props.loadCartServices}
                changeSlots={this.props.changeSlots}
                {...this.props.loadCartReducer}
                removeSlotsResult={this.props.removeSlotsResult}
                showCart={this.props.showCart}
              />
            </div>
          ) : (
            this.state.showPanel === "cart" && (
              <div>
                <Cart cartDetails={this.props.loadCartReducer.cartDetails} />
              </div>
            )
          )}
        </Modal>
      </Layout>
    );
  }
}

export default Home;
