import React from 'react';
import Modal from 'react-awesome-modal';
import Calendar from '../Calendar';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  openModal() {
    this.setState({
      visible: true,
    });
  }

  closeModal() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <div>
        <input
          type="button"
          value="Book Now"
          onClick={() => this.openModal()}
        />
        <Modal
          visible={this.state.visible}
          width="1024"
          height="900"
          effect="fadeInUp"
          overflow-x="scroll"
          onClickAway={() => this.closeModal()}
        >
          <Calendar />
        </Modal>
      </div>
    );
  }
}

export default Home;
