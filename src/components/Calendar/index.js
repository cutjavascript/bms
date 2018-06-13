import React from 'react';
import Modal from 'react-awesome-modal';
import moment from 'moment';
import {omit, isEqual} from 'lodash';
import sizeMe from 'react-sizeme';
// import { ViewType } from './components/constant';


class Home extends React.PureComponent {
  constructor(props) {
    super(props);
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

export default Home;
