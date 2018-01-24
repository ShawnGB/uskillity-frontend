import React from 'react';
import './style.css';

class Instructor extends React.Component {
  render() {
    return (
      <div>
        <div className="col-lg-3 Instructior-Box">
          <p className='Instructor'> Instructor </p>
          <div className='img-container'>
            <img
              src='http://placehold.it/300x60?text=Logo'
              width='179.1'
              height='178.2'
              alt=''
              className='img-circle Ellipse-3'/>
          </div>
          <button
            className='See-Profile-Box'
            type='button'> See Profile </button>
        </div>
      </div>
    );
  }
}

export default Instructor;
