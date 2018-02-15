import React from "react";
import { CustomCarousel } from "app:components/carousel";
import * as service from "app:utils/service";
import { withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import { translate, Trans } from "react-i18next";
import { compose } from "redux";
import "./style.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      workshops: []
    };
  }

  componentDidMount() {
    fetch(service.getServerEndpoint("/workshops/random.json"))
      .then(resp => resp.json())
      .then(data => {
        console.log("workshops", data);
        let workshops = [];
        data.map(i => {
          return workshops.push(
            <div
              className="home-random-workshop"
              key={i.id}
              onClick={() => this.goToWorkshop(i.id)}
            >
              <img
                src={i.images[0]}
                alt="img"
                className="home-random-workshop-img"
              />
              <span className="home-random-workshop-img-text">{i.title}</span>
            </div>
          );
        });
        this.setState({ workshops });
      });
    fetch(service.getServerEndpoint("/categories.json"))
      .then(resp => resp.json())
      .then(data => {
        console.log("categories", data);
        let categories = [];
        data.map(category => {
          return categories.push(
            <div
              onClick={() => this.goToCategory(category.id)}
              className="col-sm-6 col-md-4 home-category"
              key={category.id}
            >
              <img
                className="home-category-img"
                src={category.image}
                alt="img"
              />
              <span className="home-category-img-text">
                {category.name.toUpperCase()}
              </span>
            </div>
          );
        });
        this.setState({ categories });
      });
  }

  goToCategory(categoryId) {
    this.props.history.push(`/learnskill/${categoryId}`);
  }

  goToWorkshop(workshopId) {
    this.props.history.push(`/workshop/${workshopId}`);
  }

  componentWillMount() {
    console.log("navigator.language", navigator.language);
    if (navigator.language.includes("de")) {
      this.props.i18n.changeLanguage("de");
    }
    //else {
    //this.props.i18n.changeLanguage("en");
    //}
  }

  render() {
    return (
      <div>
        <div className="container">
          <div>
            <CustomCarousel
              items={this.state.workshops}
              style={{ height: "600px", marginBottom: "20px" }}
            />
          </div>
          <div className="row row-home">
            {this.state.categories}
          </div>
          <div className="row">
            <div className="about-home">
              <p className="about-home-header">
                <Trans i18nKey="home.header">ABOUT US</Trans>
              </p>
              <p className="about-home-content">
                <Trans i18nKey="home.body_0">
                  ... Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                  sed diam nonumy eirmod tempor invidunt ut labore et dolore
                  magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                  et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                  no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit
                </Trans>
              </p>
              <p className="about-home-content">
                <Trans i18nKey="home.body_1">
                  ... Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                  sed diam nonumy eirmod tempor invidunt ut labore et dolore
                  magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                  et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                  no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit
                </Trans>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default compose(withRouter, translate("translations"))(Home);

//export default compose(
//withRouter,
//translate("translations"),
//connect(null, null, null, { withRef: true })
//connect(mapStateToProps, mapDispatchToProps)
//)(AuthModals);

//export default compose(translate("translations"), connect(mapStateToProps))(
//Profile
//);
