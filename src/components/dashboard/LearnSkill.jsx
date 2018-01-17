import React, {Component} from 'react';
import Navbar from '../navigation/Nav';
import Footer from '../../components/footer/Footer';
import {Helper} from '../../utils/Helper';
import './style.css';

class LearnSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: {}
    };
  }
  componentDidMount() {
    fetch(Helper.getServerUrl("/workshops.json")).then((resp) => {
      if (!resp.ok) {
        // TODO: send back to home page
      }
      return resp.json();
    }).then((workshops) => {
      fetch(Helper.getServerUrl("/categories.json")).then((resp) => {
        resp.json().then((categories_data) => {
          let categories = {}
          for (var i = 0; i < workshops.length; i++) {
            let category_id = workshops[i].category_id
            if (!categories[category_id]) {
              categories[category_id] = {}
              categories[category_id].workshops = []
              let category = categories_data.find(c => c.id === category_id)
              categories[category_id].name = category.name
            }
            categories[category_id].workshops.push(workshops[i]);
          }
          this.setState({categories})
          console.log("categories", categories);
        });
      })
      console.log("workshops", workshops);
    });
  }

  render() {
    const {categories} = this.state;
    return <div>
      <Navbar/>
      <div className='container'>
        {Object.keys(categories).map((key, i) => (<CategoryRow name={categories[key].name} workshops={categories[key].workshops} key={i}/>))}
        <Footer/>
      </div>
    </div>
  }
}

const CategoryRow = props => {
  return <div className='row'>
    <p className='skills-heading'>{props.name}</p>
    {
      props.workshops.map((workshop, i) => (<div className="col-sm-4" key={i}>
        <img src={workshop.main_image} width='350' height='220' alt=''/>
        <div className='skill-content'>
          <p className='skill-title'>{workshop.title}</p>
          <p className='skill-author'>Marina Berlin-Kreuzberg</p>
          <p className='skill-price'>14 €</p>
        </div>
      </div>))
    }
  </div>
}

export default LearnSkill;
