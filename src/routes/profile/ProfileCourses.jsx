import React from 'react';

class ProfileCourses extends React.Component {
  render() {
    return (
      <div>
        <div className='container container-profile'>
          <p className='skills-heading'>My Shared Courses</p>
          <div className='row'>
            <div className='col-sm-3'>
              <img src='http://placehold.it/300x60?text=Img' width='250' height='180' alt='' />
              <div className='skill-content'>
                <p className='skill-category'>Arts & Crafts</p>
                <p className='skill-title'>Aquarell painting for beginners</p>
                <p className='skill-author'>Marina Berlin-Kreuzberg</p>
                <p className='skill-price'>14 €</p>
              </div>
            </div>
            <div className='col-sm-3'>
              <img src='http://placehold.it/300x60?text=Img' width='250' height='180' alt='' />
              <div className='skill-content'>
                <p className='skill-category'>Arts & Crafts</p>
                <p className='skill-title'>Aquarell painting for beginners</p>
                <p className='skill-author'>Marina Berlin-Kreuzberg</p>
                <p className='skill-price'>14 €</p>
              </div>
            </div>
            <div className='col-sm-3'>
              <img src='http://placehold.it/300x60?text=Img' width='250' height='180' alt='' />
              <div className='skill-content'>
                <p className='skill-category'>Arts & Crafts</p>
                <p className='skill-title'>Aquarell painting for beginners</p>
                <p className='skill-author'>Marina Berlin-Kreuzberg</p>
                <p className='skill-price'>14 €</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCourses;
