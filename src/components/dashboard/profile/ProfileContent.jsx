import React from 'react';
import ProfileCourses from './ProfileCourses';

class ProfileContent extends React.Component {
  render() {
    return (
      <div>
        <div class='container'>
          Profile Content
          <ProfileCourses />
        </div>
      </div>
    );
  }
}

export default ProfileContent;
