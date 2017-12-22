import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
    return (
      <div className='container'>
        <nav class='navbar fixed-top navbar-default'>
          <div class='container-fluid'>
            <div class='navbar-header'>
              <img src='http://placehold.it/300x60?text=Logo' width='250' height='60' alt='' />
            </div>
            <ul class='nav navbar-nav navbar-center'>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/register'>Register</Link></li>
            </ul>
            <ul class='nav navbar-nav navbar-right'>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/about'>About</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
