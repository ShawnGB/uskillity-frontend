import React, { Component } from 'react';
import ProfileContent from './ProfileContent';
import Navbar from 'app:components/navigation/Nav';
import Footer from 'app:components/footer/Footer';

class Profile extends Component {
  render(){
    return (
      <div>
        <Navbar />
        <div className='container'>
          <ProfileContent/>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Profile;
