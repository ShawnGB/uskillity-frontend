import React from 'react';
import Sidebar from './Sidebar';
import Navbar from '../navigation/Nav';
import Footer from '../footer/Footer';
import './style.css';

export default class TermsConditions extends React.Component{
  render(){
    return(
      <div>
        <Navbar />
        <div className='container about-container'>
          <div className='row'>
            <div className='col-md-2'>
              <Sidebar />
            </div>
            <div className='col-md-8'>
              <h2 className='about-heading'> Terms & Conditions </h2>
              <p className='about-content'>
                Please read these Terms of Service carefully as they contain important information about your legal rights,
                remedies and obligations. By accessing or using the u/skillity Platform, you agree to comply with and be bound
                by these Terms of Service.
              </p>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
