import React, { Component } from 'react';
import Navbar from '../navigation/Nav';
import Footer from '../../components/footer/Footer';
import './style.css';

const SERVER = process.env.REACT_APP_SERVER;

class LearnSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshops: []
    };
  }
  componentDidMount(){
    fetch(`${SERVER}/workshops.json`)
    .then((resp) => {
      if (!resp.ok) {
        // TODO: send back to home page
      }
      return resp.json();
    })
    .then((workshops) => {
      console.log("workshops",workshops);
      this.setState({workshops})
    });
  }

  render() {
    const { workshops } = this.state;
    return(
      <div>
        <Navbar />
        <div className='container'>
        {workshops.map((data,i) =>(
          <div className='col-sm-4' key={i}>
            <p className='skills-heading'>Category</p>
            <img src='http://placehold.it/350x220?text=Img' width='350' height='220' alt='' />
            <div className='skill-content'>
              <p className='skill-title'>{data.title}</p>
              <p className='skill-author'>Marina Berlin-Kreuzberg</p>
              <p className='skill-price'>14 €</p>
            </div>
          </div>
        ))}

          <Footer />
        </div>\
      </div>
    )
  }
}

export default LearnSkill;
