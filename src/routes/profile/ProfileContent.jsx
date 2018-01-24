import React from 'react';
import ProfileCourses from './ProfileCourses';
import './style.css';

class ProfileContent extends React.Component {
  render() {
    return (
      <div>
        <div className='container container-profile'>
          <div className="row">
            <div className="col-lg-3">
            <div className='img-container'>
              <img src='http://placehold.it/300x60?text=Logo' width='250' height='250' alt='' className='img-circle'/>
            </div>
            </div>
            <div className="col-lg-6">
              <div className='profile-name'>
                Profile Name
              </div>
              <div className='profile-skill'>
                Profile Skill
              </div>
              <div className='profile-content-title'>
                About Me
              </div>
              <div className='profile-content'>
                Ich bin Marina, 30 Jahre alt. Neben meiner Arbeit als Lehrerin beschäftige ich mich seit zehn Jahren mit Aquarellmalerei. Ich gebe Kurse dazu und freue mich über jeden, der Interesse daran hat mit mir zu malen und den Umgang mit Pinsel und Farbe zu lernen.
              </div>
              <div className='profile-content-title'>
                Educational Background
              </div>
              <div className='profile-content'>
                Grundschullehrerin
              </div>
            </div>
          </div>
          <div className=''>
          </div>
          <ProfileCourses />
        </div>
      </div>
    );
  }
}

export default ProfileContent;
