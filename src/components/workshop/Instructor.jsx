import React from 'react';
import './style.css';

class Instructor extends React.Component {
  render() {
    return (
      <div>
        <div className="col-lg-4">
          <p className='workshop-instructor-card-title'> Instructor </p>
          <div className='img-container'>
            <img
              src='http://placehold.it/300x60?text=Logo'
              width='150'
              height='150'
              alt=''
              className='img-circle'/>
          </div>
          <button
            className='btn btn-primary workshop-instructor-card-btn'
            type='button'> Edit </button>
        </div>
      </div>
    );
  }
}

export default Instructor;
