import React, { Component } from "react";
import { connect } from "react-redux";
import * as skillActions from "app:store/actions/skill";
import Slider from "react-slick";
import "../shareSkill/style.css";
import WorkshopPreviewDiv from "app:components/workshop-preview";

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
    this.prepareWorkshops();
  }

  componentDidMount() {
    const categoryId = this.props.match.params.id;
    if (categoryId) {
      this.scrollToElement(categoryId);
    }
  }

  prepareWorkshops() {
    const { workshops, categories } = this.props.skills;
    let categories_data = {};
    /* eslint-disable */
    workshops.map((workshop, i) => {
      let category_id = workshop.category_id;
      if (!categories_data[category_id]) {
        categories_data[category_id] = {};
        categories_data[category_id].workshops_data = [];
        let category = categories.find(c => c.id === category_id);
        categories_data[category_id].name = category.name;
        categories_data[category_id].categoryId = category.id;
      }
      categories_data[category_id].workshops_data.push(workshop);
    });
    /* eslint-enable */
    this.setState({ categories: categories_data });
    console.log(categories_data);
  }

  scrollToElement(categoryId) {
    const categoryElement = document.getElementById(categoryId);
    if (categoryElement) {
      window.scrollTo(0, categoryElement.offsetTop);
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
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 4000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div id={props.categoryId} className="row row-margin">
      <h2>{props.name}</h2>
      <Slider {...settings}>
        {props.workshops.map((workshop, i) => (
          <div key={i}>
            <WorkshopPreviewDiv i={i} workshop={workshop} />
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
