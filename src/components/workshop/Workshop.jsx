import React from 'react';
import Navbar from '../navigation/Nav';
import Sidebar from './Sidebar'
import './style.css';

class Workshop extends React.Component {
  render() {
    return	(
      <div>
        <Navbar />
        <div className='container'>
          <div className='jumbotron'>
            <img
              src='http://placehold.it/900x300?text=Img'
              width='100%'
              height='100%'
              alt='' />
          </div>
          <div className='row row-spacing'>
            <div className='col-lg-6'>
              <p className='workshop-name'>
                Aquarell malen Grundkenntnisse
              </p>
            </div>
          </div>
          <div className='row row-spacing'>
            <div className='col-lg-8'>
              <p className='workshop-title'>Description</p>
              <p className='workshop-content'>
                ... Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              </p>
            </div>
          </div>
          <div className='row row-spacing'>
            <div className='col-lg-8'>
              <p className='workshop-title'>Requirements</p>
              <p className='workshop-content'>
                ... Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              </p>
            </div>
          </div>
          <div className='row row-spacing'>
            <div className='col-lg-8'>
              <p className='workshop-title'>
                Who can attend
              </p>
              <p className='workshop-content'>
                ... Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              </p>
            </div>
          </div>
          <div className='row row-spacing'>
            <div className='col-lg-8'>
              <p className='workshop-title'>
                About the instructor
              </p>
              <p className='workshop-content'>
                ... Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              </p>
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    );
  }
}

export default Workshop;
