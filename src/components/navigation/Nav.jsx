import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../images/logo.png';
import Auth from '../authModal/Auth'

class Navbar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
      return (
        <div className='container'>
          <nav className='navbar fixed-top navbar-default'>
            <div className='container-fluid'>
              <div className='navbar-header'>
                <img src={logo} width='138' height='50' alt='' />
              </div>
              <ul className='nav navbar-nav navbar-center'>
                <li className='menu-item'>
                  <Link
                    to='#'
                    onClick={() => this.refs.authComponent.onRegisteredClicked()}>
                    Register now
                  </Link>
                </li>
                <li className='menu-item'>
                  <Link
                    to='#'
                    onClick={() => this.refs.authComponent.onLoginClicked()}>
                    Log in
                  </Link>
                </li>
              </ul>
              <ul className='nav navbar-nav navbar-left'>
                <li className='menu-item'>
                  <Link to='/about'>
                    u/about
                  </Link>
                </li>
              </ul>
              <ul className='nav navbar-nav navbar-right'>
                <li className='menu-item'>
                  <Link to='/shareyourskill'>
                    Share your skill
                  </Link>
                </li>
                <li className='menu-item'>
                  <Link to='/learnskill'>
                    Learn a Skill
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <Auth ref="authComponent" />
        </div>
      );
    }
  }

  export default Navbar;
