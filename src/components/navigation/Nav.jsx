import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Navbar extends React.Component {
  render() {
    return (
      <div className='container'>
        <nav className='navbar fixed-top navbar-default'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <img src='http://placehold.it/300x60?text=Logo' width='250' height='60' alt='' />
            </div>
            <ul className='nav navbar-nav navbar-center'>
              <li className='menu-item'><Link to='/register'>Register now</Link></li>
              <li className='menu-item'><Link to='/login'>Log in</Link></li>
            </ul>
            <ul className='nav navbar-nav navbar-right'>
              <li className='menu-item'><Link to='/shareyourskill'>Share your skill</Link></li>
              <li className='menu-item'><Link to='/'>Learn a Skill</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
