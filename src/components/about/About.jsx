import React from 'react';
import Guidelines from './Guidelines'
import Navbar from '../navigation/Nav';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';

class About extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container about-container">
          <div className='row'>
            <div className='col-md-2'>
              <ul
                className="nav nav-stacked">
                <li className="active">
                  <Link to='/vision'>Vision</Link>
                </li>
                <li>
                  <Link to='/team'>Team</Link>
                </li>
                <li>
                  <Link to='/contact'>Contact</Link>
                </li>
                <li>
                  <Link to='/press'>Press</Link>
                </li>
                <li>
                  <Link to='/help'>Help</Link>
                </li>
                <li>
                  <Link to='/guidelines'>Guidelines</Link>
                </li>
              </ul>
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
