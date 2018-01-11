import React, { Component } from 'react';
import Navbar from '../navigation/Nav';
import Footer from '../../components/footer/Footer';
import './style.css';

class LearnSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <div>
        <Navbar />
        <div className='container'>
          <div className='row row-home'>
            <p>Category</p>
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
            <p>Category</p>
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
            <p>Category</p>
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
            <p>Category</p>
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
            <p>Category</p>
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
            <p>Category</p>
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
          <Footer />
        </div>
      </div>
    )
  }
}

export default LearnSkill;
