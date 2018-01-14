import React, { Component } from 'react';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import './style.css';
import Facebook from 'react-icons/lib/fa/facebook';
import Instagram from 'react-icons/lib/fa/instagram';

export default class Footer extends Component {
  render(){
    return (
      <div className='row'>
        <p className='border'></p>
        <div className='col-sm-3'>
          <img src={logo} width='220' height='80' alt='' />
          <p className='copyright'>© 2017 Nikolovska Becker UG - u/skillity</p>
        </div>
        <div className='col-sm-3'>
          <p className='footer-title'>Connect</p>
          <p className='footer-item'>office@uskillity.de</p>
          <p className='footer-item'>
            <Facebook size={30} />
            <Instagram size={30}/>
          </p>
        </div>
        <div className='col-sm-3'>
          <p className='footer-title'>u/Skillity</p>
          <p className='footer-item'>Vision</p>
          <p className='footer-item'>Team</p>
          <p className='footer-item'>Press</p>
          <p className='footer-item'>Guidelines</p>
        </div>
        <div className='col-sm-3'>
          <br></br>
          <p className='footer-item'>Help</p>
          <p className='footer-item'>Impressum</p>
          <p className='footer-item'><Link to='/terms'>Terms and Conditions</Link></p>
        </div>
      </div>
    );
  }
}
