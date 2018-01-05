import React from 'react';
import Navbar from '../navigation/Nav';
import Footer from '../footer/Footer';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className='container'>
          <div className='jumbotron'>
            <img src='http://placehold.it/900x300?text=Img' width='100%' height='100%' alt='' />
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
