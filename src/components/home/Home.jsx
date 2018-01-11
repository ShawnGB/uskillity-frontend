import React from 'react';
import Navbar from '../navigation/Nav';
import Footer from '../footer/Footer';

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
          <img src={i.main_image} alt='img' style={{width: '100%'}} key={i.id}></img>
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
        return console.log('categories', i);
      }))
      this.setState({ categories });
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className='container'>

          <div id='myCarousel' className='carousel slide' data-ride='carousel'>

            <ol className='carousel-indicators'>
              <li data-target='#' data-slide-to='0' className='active'></li>
              <li data-target='#' data-slide-to='1'></li>
              <li data-target='#' data-slide-to='2'></li>
            </ol>

            <div className='carousel-inner'>
              <div className='item'>
                {this.state.workshops}
                <div className='carousel-caption'>
                </div>
              </div>
            </div>

            <a className='left carousel-control' data-slide='prev'>
              <span className='glyphicon glyphicon-chevron-left'></span>
              <span className='sr-only'>Previous</span>
            </a>
            <a className='right carousel-control' data-slide='next'>
              <span className='glyphicon glyphicon-chevron-right'></span>
              <span className='sr-only'>Next</span>
            </a>
          </div>

          <div className='row row-home'>
            <div className='col-sm-4'>
              <img src='http://placehold.it/350x220?text=Img' width='350' height='220' alt='' />
            </div>
            <div className='col-sm-4'>
              <img src='http://placehold.it/350x220?text=Img' width='350' height='220' alt='' />
            </div>
            <div className='col-sm-4'>
              <img src='http://placehold.it/350x220?text=Img' width='350' height='220' alt='' />
            </div>
          </div>
          <div className='row row-home'>
            <div className='col-sm-4'>
              <img src='http://placehold.it/350x220?text=Img' width='350' height='220' alt='' />
            </div>
            <div className='col-sm-4'>
              <img src='http://placehold.it/350x220?text=Img' width='350' height='220' alt='' />
            </div>
            <div className='col-sm-4'>
              <img src='http://placehold.it/350x220?text=Img' width='350' height='220' alt='' />
            </div>
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
