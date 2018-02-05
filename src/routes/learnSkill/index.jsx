import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as skillActions from "app:store/actions/skill";
import Slider from "react-slick";
import "./style.css";

class LearnSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: {}
    };
    this.prepareWorkshops = this.prepareWorkshops.bind(this);
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(skillActions.fetchWorkshops());
    dispatch(skillActions.fetchCategories());
  }

  componentDidMount() {
    this.prepareWorkshops();
  }

  prepareWorkshops() {
    const { skills } = this.props;
    const { workshops, categories } = skills;
    let categories_data = {};
    for (var i = 0; i < workshops.length; i++) {
      let category_id = workshops[i].category_id;
      if (!categories_data[category_id]) {
        categories_data[category_id] = {};
        categories_data[category_id].workshops_data = [];
        let category = categories.find(c => c.id === category_id);
        categories_data[category_id].name = category.name;
      }
      categories_data[category_id].workshops_data.push(workshops[i]);
      this.setState({ categories: categories_data });
    }
  }

  render() {
    const categories_data = this.state.categories;
    return (
      <div>
        <div className="container">
          {Object.keys(categories_data).map((key, i) => (
            <CategoryRow
              name={categories_data[key].name}
              workshops={categories_data[key].workshops_data}
              key={i}
            />
          ))}
        </div>
      </div>
    );
  }
}

const NextArrow = props => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        background: "rgb(143, 143, 143)",
        margin: "-50px 30px 30px -10px"
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = props => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        background: "rgb(143, 143, 143)",
        margin: "-50px 30px 30px -10px"
      }}
      onClick={onClick}
    />
  );
};

const CategoryRow = props => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="row row-margin">
      <p className="skills-heading">{props.name}</p>
      <Slider {...settings}>
        {props.workshops.map((workshop, i) => (
          <div key={i}>
            <Link to={`/workshop/${workshop.id}`}>
              <img src={workshop.main_image} width="350" height="220" alt="" />
            </Link>
            <div className="skill-content">
              <p className="skill-title">{workshop.title}</p>
              <p className="skill-author">Marina Berlin-Kreuzberg</p>
              <p className="skill-price">14 €</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export const mapStateToProps = state => ({
  skills: state.skills
});
export default connect(mapStateToProps)(LearnSkill);
