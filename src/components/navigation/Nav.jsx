import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../images/logo.png';
import Auth from '../authModal/Auth'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalType: '',
      showModal: false
    }
    this.clickedModal = this.clickedModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  clickedModal(modalType,showModal){
    this.setState({
      modalType,
      showModal
    });
  }

  closeModal() {
     this.setState({showModal: false})
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
                    onClick={() => this.clickedModal("register",true)}>
                    Register now
                  </Link>
                </li>
                <li className='menu-item'>
                  <Link
                    to='#'
                    onClick={() => this.clickedModal("login",true)}>
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
                  <Link to='/'>
                    Learn a Skill
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <Auth
            modalType = {this.state.modalType}
            showModal = {this.state.showModal}
            closeModal = {this.closeModal} />
        </div>
      );
    }
  }

  export default Navbar;
