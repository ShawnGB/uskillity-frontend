import React, {Component} from 'react';
import Navbar from 'app:components/navigation/Nav';
import {Link} from 'react-router-dom';
import Footer from 'app:components/footer/Footer';
import * as service from 'app:utils/service';
import Slider from 'react-slick';
import './style.css';

class LearnSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: {}
    };
  }
  componentDidMount() {
    fetch(service.getServerEndpoint("/workshops.json")).then((resp) => {
      if (!resp.ok) {
        // TODO: send back to home page
      }
      return resp.json();
    }).then((workshops) => {
      fetch(service.getServerEndpoint("/categories.json")).then((resp) => {
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
  var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
}]
    };
  return <div className='row row-margin'>
    <p className='skills-heading'>{props.name}</p>
    <Slider {...settings}>
    {
      props.workshops.map((workshop, i) => (<div key={i}>
        <Link to={`/workshop/${workshop.id}`}><img src={workshop.main_image} width='350' height='220' alt=''/></Link>
        <div className='skill-content'>
          <p className='skill-title'>{workshop.title}</p>
          <p className='skill-author'>Marina Berlin-Kreuzberg</p>
          <p className='skill-price'>14 €</p>
        </div>
      </div>))
    }
    </Slider>
  </div>
}

export default LearnSkill;
