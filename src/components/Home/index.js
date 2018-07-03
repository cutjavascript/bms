import React from "react";
import Modal from "react-awesome-modal";
import Slider from "react-slick";
import Calendar from "../Calendar";
import Services from "../Services";
import banner from "../../assets/images/banner1.jpg";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  openModal() {
    this.props.loadCalendar();

    // this.props.loadCalendar();
    this.setState({
      visible: true,
    });
  }

  closeModal() {
    this.setState({ visible: false });
  }

  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: true,
    };
    return (
      <div className="">
        <div
          className="component component-Image"
          style={{
            left: 0,
            top: 82,
            width: "100%",
            height: 409,
            padding: 0,
            opacity: 1,
            zIndex: 11,
            borderBottom: "1px solid #ddd",
          }}
        >
          <img src={banner} style={{ left: 0, top: 0, width: "100%", height: 409 }} />
        </div>
        <div className="container">
          <div className="" style={{ height: 20 }} />
          <div className="row">
            <div
              className="col-sm-12"
              style={{
                backgroundColor: "rgb(255,255,255)",
                border: "1px solid rgb(102, 204, 255)",
              }}
            >
              <h3 className="studio-title" style={{ margin: "25px 0 25px 0", fontWeight: 700 }}>
                Neelam Studios
              </h3>
              <div className="booknow-block">
                <button className="btn btn-default" onClick={() => this.openModal()}>
                  Book Now
                </button>
              </div>
              <div className="rating-block">
                <label>4.5/5</label>
              </div>
              <p className="studio-descriptions">
                Neelam Films is a leading Media & Entertainment Production House based in Delhi. Pre-production to Post
                production services are available under one roof. We are serving tirelessly with full dedication in the
                Entertainment sector for last 22 Years to make people’s dreams come true. We work 24*7, 365 days year
                delivering QUALITY for money.
              </p>
              <p className="studio-descriptions">
                And Proudly, we would like to convey to our potential dear foreign clients that we could help in
                achieving your shooting purposes in India without any hassle. All your requirements will be fulfilled
                under one roof that is Neelam Films. Give us a chance to give you a Developed Film Shooting Experience
                in a Developing Nation. Neelam Films is a one-stop shop for shooting equipment rentals right from DSLRS
                to HD cameras to Audio equipment to Lights to rigs.
              </p>
              <div className="service-block">
                <h4 className="studio-title" style={{ margin: "25px 0 25px 0", fontWeight: 700 }}>
                  Services offered
                </h4>
                <div className="container service-container" style={{ width: "75%" }}>
                  <div className="row">
                    <div className="col">
                      <div className="">
                        <i className="fa fa-check service-check-icon" aria-hidden="true" />
                        <label className="service-label">Sound Recording</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="">
                        <i className="fa fa-check service-check-icon" aria-hidden="true" />
                        <label className="service-label">Foleys</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="">
                        <i className="fa fa-check service-check-icon" aria-hidden="true" />
                        <label className="service-label">Music Composition</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="">
                        <i className="fa fa-check service-check-icon" aria-hidden="true" />
                        <label className="service-label">Voice Over</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="">
                        <i className="fa fa-check service-check-icon" aria-hidden="true" />
                        <label className="service-label">Sound Mixing</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="">
                        <i className="fa fa-check service-check-icon" aria-hidden="true" />
                        <label className="service-label">Background Scoring</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="">
                        <i className="fa fa-check service-check-icon" aria-hidden="true" />
                        <label className="service-label">Sound Mastering</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="">
                        <i className="fa fa-check service-check-icon" aria-hidden="true" />
                        <label className="service-label">Devotional Music</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="">
                        <i className="fa fa-check service-check-icon" aria-hidden="true" />
                        <label className="service-label">Location Sound</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="">
                        <i className="fa fa-check service-check-icon" aria-hidden="true" />
                        <label className="service-label">Vocal Recording</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-sm-3"></div> */}
          </div>
        </div>

        <Modal
          visible={this.state.visible}
          width="1024"
          height="900"
          effect="fadeInUp"
          overflow-x="scroll"
          onClickAway={() => this.closeModal()}
        >
          <Slider {...settings}>
            {this.props.studioServices && (
              <Services
                loadServices={this.props.loadServices}
                {...this.props.studioServices}
                submit={this.props.submit}
              >
                <h3>1</h3>
              </Services>
            )}
            <div>
              <Calendar {...this.props} />
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </Slider>
        </Modal>
      </div>
    );
  }
}

export default Home;
