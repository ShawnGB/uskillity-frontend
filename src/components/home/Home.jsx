import React from 'react';
import Navbar from '../navigation/Nav';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className='container'>
          <div className='jumbotron'>
            <img src='http://placehold.it/900x300?text=Img' width='100%' height='100%' alt='' />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
