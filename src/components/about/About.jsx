import React from 'react';
import Guidelines from './Guidelines';
import Sidebar from './Sidebar';
import Navbar from '../navigation/Nav';
import Footer from '../footer/Footer';

class About extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container about-container">
          <div className='row'>
            <div className='col-md-2'>
              <Sidebar />
            </div>
            <div className='col-md-8'>
              <Guidelines />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default About;
