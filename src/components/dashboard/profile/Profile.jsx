import React, { Component } from 'react';
import ProfileContent from './ProfileContent';
import Navbar from '../../navigation/Nav';
import Footer from '../../footer/Footer';

class Profile extends Component {
  render(){
    return (
      <div>
        <Navbar />
        <div className='container'>
          <ProfileContent />
          <Footer />
        </div>
      </div>
    );
  }
}

export default Profile;
