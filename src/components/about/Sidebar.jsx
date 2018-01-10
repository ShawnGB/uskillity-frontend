import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
  render() {
    return (
      <div>
        <ul
          className="nav nav-stacked">
          <li className="active">
            <Link to='/vision'>Vision</Link>
          </li>
          <li>
            <Link to='/team'>Team</Link>
          </li>
          <li>
            <Link to='/contact'>Contact</Link>
          </li>
          <li>
            <Link to='/press'>Press</Link>
          </li>
          <li>
            <Link to='/help'>Help</Link>
          </li>
          <li>
            <Link to='/guidelines'>Guidelines</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
