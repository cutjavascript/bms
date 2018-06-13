import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Modal from 'react-awesome-modal';
import PropTypes from '../../PropTypes';
import Home from '../../components/Home';
import loadHome from '../../loads/loadHome';

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.loadHomePage = this.loadHomePage.bind(this);
    this.state={visible:false}
  }

  openModal(){
this.setState({
visible:true

})

  }

closeModal()
{
this.setState({visible:false});


}

  componentDidMount() {
    this.loadHomePage();
  }

  loadHomePage() {
    this.props.loadHome();
  }

  render() {
    return (
<div>
<input type="button" value="Book Now" onClick={()=>this.openModal()} />
<Modal visible={this.state.visible} width="1024" height="900" effect="fadeInUp" onClickAway={()=>this.closeModal()}>

</Modal>
  </div>



    );
  }
}

HomePage.propTypes = {
  loadHome: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoggedOut: state.isLoggedOut,
});

const mapDispatchToProps = {
  loadHome,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HomePage),
);
