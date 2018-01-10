import React, { Component } from 'react';
import Navbar from '../navigation/Nav';
import Footer from '../../components/footer/Footer';
import './style.css';

class LearnSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <div>
        <Navbar />
        <div className='container'>
          Hello from Learn Skill page
          <Footer />
        </div>
      </div>
    )
  }
}

export default LearnSkill;
