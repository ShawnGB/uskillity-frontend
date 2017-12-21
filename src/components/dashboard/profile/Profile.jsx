import React, { Component } from 'react';
import ProfileContent from './ProfileContent';
import ProfileCourses from './ProfileCourses';

class Profile extends Component {
  render(){
    return (
      <div>
        <ProfileContent />
        <ProfileCourses />
      </div>
    );
  }
}

export default Profile;
