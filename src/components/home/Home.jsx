import React from 'react';
import Navbar from '../navigation/Nav';
import Footer from '../footer/Footer';
import { CustomCarousel } from '../carousel/Carousel';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      workshops: []
    };
  }

  componentDidMount() {
    fetch('https://bluecarbuncle-staging.herokuapp.com/workshops/random.json')
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
    fetch('https://bluecarbuncle-staging.herokuapp.com/categories.json')
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
