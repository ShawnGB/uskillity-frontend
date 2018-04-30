import React, { Component } from "react";
import { connect } from "react-redux";
import * as skillActions from "app:store/actions/skill";
import Slider from "react-slick";
import "../shareSkill/style.css";
import WorkshopPreviewDiv from "app:components/workshop-preview";
import leftArrow from "../../images/left_arrow.png";
import rightArrow from "../../images/right_arrow.png";

class LearnSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: {}
    };
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(skillActions.fetchWorkshops());
    dispatch(skillActions.fetchCategories());
  }

  componentDidMount() {
    const categoryId = this.props.match.params.id;
    if (categoryId) {
      this.scrollToElement(categoryId);
    }
  }

  groupWorkshops({ workshops = [], categories = [] }) {
    let groupedWorkshops = {};

    workshops.forEach(workshop => {
      let category_id = workshop.category_id;
      if (!groupedWorkshops[category_id]) {
        groupedWorkshops[category_id] = {};
        groupedWorkshops[category_id].workshops_data = [];
        let category = categories.find(c => c.id === category_id);
        groupedWorkshops[category_id].name = category.name;
        groupedWorkshops[category_id].categoryId = category.id;
      }
      groupedWorkshops[category_id].workshops_data.push(workshop);
    });
    return groupedWorkshops;
  }

  scrollToElement(categoryId) {
    const categoryElement = document.getElementById(categoryId);
    if (categoryElement) {
      window.scrollTo(0, categoryElement.offsetTop);
    }
  }

  render() {
    const categories = this.groupWorkshops(this.props.skills);
    return (
      <div>
        <div className="container">
          {Object.keys(categories).map((key, i) => (
            <CategoryRow
              name={categories[key].name}
              workshops={categories[key].workshops_data}
              key={i}
            />
          ))}
        </div>
      </div>
    );
  }
}

const NextArrow = props => {
  const { style, onClick } = props;
  return (
    <div
      className="slick-arrow"
      style={{
        ...style,
        display: "block",
        float: "right",
        marginTop: "-200px",
        marginRight: "-30px"
      }}
      onClick={onClick}
    >
      <img src={rightArrow} alt="<" className="arrow-class" onClick={onClick} />
    </div>
  );
};

const PrevArrow = props => {
  const { style, onClick } = props;
  return (
    <div
      className="slick-arrow"
      style={{
        ...style,
        display: "block",
        marginTop: "0px",
        marginLeft: "-30px",
        float: "left",
        paddingTop: "180px"
      }}
      onClick={onClick}
    >
      <img src={leftArrow} alt=">" className="arrow-class" onClick={onClick} />
    </div>
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
    rtl: props.workshops.length < 3,
    responsive: [
      {
        breakpoint: 4000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true
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
      <div className="col-xs-12">
        <h2>{props.name}</h2>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div style={{ margin: "0px auto" }}>
            <Slider {...settings}>
              {props.workshops.map((workshop, i) => (
                <div key={i}>
                  <WorkshopPreviewDiv i={i} workshop={workshop} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};
export const mapStateToProps = state => ({
  skills: state.skills
});
export default connect(mapStateToProps)(LearnSkill);
