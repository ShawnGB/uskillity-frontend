import React from 'react';
import Sidebar from './Sidebar';
import Navbar from '../navigation/Nav';
import Footer from '../footer/Footer';
import './style.css';

export default class Contact extends React.Component{
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
              <h2 className='about-heading'>Contact</h2>
              <p className='about-content'>
                We would love to hear from you!
              </p>
              <p className='about-content'>
                We would love to hear from you! Do you have any questions for us? Suggestions perhaps? Or do you maybe want to collaborate? Send us an email with you query on: office@uskillity.de
              </p>
              <p className='about-content'>
                If you have general questions look at our help secrtion on the left or check our posts on Facebook or Instagram. 
              </p>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
