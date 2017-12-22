import React from 'react';
import { Link } from 'react-router-dom';

class NavLogged extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to='/shareyourskill'>Share your skill</Link></li>
          <li><Link to='/'>Learn a Skill</Link></li>
          <li><Link to='/about'>u/about</Link></li>
          <li><Link to='/'>My Account</Link></li>
          <li><Link to='/'>Log out</Link></li>
        </ul>
      </div>
    );
  }
}

export default NavLogged;
