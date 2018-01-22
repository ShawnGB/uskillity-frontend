import React from 'react';
import Navbar from 'app:components/navigation/Nav';
import Footer from 'app:components/footer/Footer';
import { CustomCarousel } from 'app:components/carousel/Carousel';
import {Helper} from 'app:utils/Helper';
import './style.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      workshops: []
    };
  }

  componentDidMount() {
    fetch(Helper.getServerUrl("/workshops/random.json"))
    .then((resp) => resp.json())
    .then((data) => {
      console.log('DATA', data);
      let workshops = [];
      data.map((i => {
        return workshops.push(
          <img src={i.main_image} alt='img' style={{maxHeight: '600px' ,width: '100%'}} key={i.id}></img>
        );
      }))
      this.setState({ workshops });
    });
    fetch(Helper.getServerUrl("/categories.json"))
    .then((resp) => resp.json())
    .then((data) => {
      console.log('DATA', data);
      let categories = [];
      data.map((i => {
        return categories.push(
          <div className='col-sm-4' key={i.id}>
            <img src={i.image} alt='img' style={{width: '100%'}} ></img>
          </div>
        );
      }))
      this.setState({ categories });
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className='container'>
        <div>
          <CustomCarousel items={this.state.workshops} style={{"height":"600px", "marginBottom":"20px"}}/>
        </div>
        <p className='home-heading'>Create a possibility</p>
          <div className='row row-home'>
            {this.state.categories.slice(0, 3)}
          </div>
          <div className='row row-home'>
            {this.state.categories.slice(3, 6)}
          </div>
          <div className='row'>
            <div className='about-home'>
              <p className='about-home-header'>ABOUT US</p>
              <p className='about-home-content'>... Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit </p>
              <p className='about-home-content'>... Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit </p>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Home;