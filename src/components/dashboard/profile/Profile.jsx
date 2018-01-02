import React, { Component } from 'react';
import ProfileContent from './ProfileContent';
import Navbar from '../../navigation/Nav';

class Profile extends Component {
  render(){
    return (
      <div>
        <Navbar />
        <ProfileContent />
      </div>
    );
  }
}

export default Profile;
