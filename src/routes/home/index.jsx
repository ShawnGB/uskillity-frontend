import React from "react";
import CookieConsent from "react-cookie-consent";

import { CustomCarousel } from "app:components/carousel";
import { withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import { translate, Trans } from "react-i18next";
import { compose } from "redux";
import { Link } from "react-router-dom";
import * as service from "app:utils/service";
import * as util from "app:utils/utils";
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
        let workshops = [];
        data.map(ws => {
          return workshops.push(
            <Link to={`/workshop/${ws.id}`}>
              <div
                className="home-random-workshop"
                key={ws.id}
                style={{ backgroundImage: `url(${ws.images[0]})` }}
              >
                <div className="home-workshop-info">
                  <h1 style={{marginTop: "0px"}}>{ws.title}</h1>

                  <div className="about-provider">
                    <h4 className="about-provider-p">...{(ws.provider.about || "").substring(0,200)} ...</h4>
                  </div>

                  <div className="see-more">
                    <h3 style={{margin: "10px"}}>See More...</h3>
                  </div>
                </div>
              </div>
            </Link>
          );
        });
        this.setState({ workshops });
      });
    fetch(service.getServerEndpoint("/categories.json"))
      .then(resp => resp.json())
      .then(data => {
        let categories = [];
        data.map((category, i) => {
          return categories.push(
            <div className="col-sm-6 col-md-4 home-category-wrapper" key={i}>
              <div
                onClick={() => this.goToCategory(category.id)}
                className="home-category"
                key={category.id}
                style={{ backgroundImage: `url(${category.image})` }}
              >
              <div className="overlay">
                  <div id="up">Your new</div>
                  <div id="down">Skills</div>
                </div>
                <h3 className="catDesc">{category.name}</h3>
              </div>
            </div>
          );
        });
        this.setState({ categories });
      });
  }

  goToCategory(categoryId) {
    this.props.history.push(`/learnskill/${categoryId}`);
  }

  componentWillMount() {
    console.log("navigator.language", navigator.language);
    if (util.isGermanNavigator()) {
      this.props.i18n.changeLanguage("de");
    }
    //else {
    //this.props.i18n.changeLanguage("en");
    //}
  }

  render() {
    return (
      <div>
        <CustomCarousel items={this.state.workshops}/>

        <div className="row">
            <p id="banner">
                <Trans i18nKey="home.slogan">Love what you learn, share what you love</Trans>
            </p>
        </div>

        <div className="row row-home category-collection">
          {this.state.categories}
        </div>

        <CookieConsent
          onAccept={() => {alert("You Have Accepted our Cookie Policy")}}
          location="bottom"
          buttonText="Accept"
          cookieName="u/skillityCookie"
          style={{  background: "#9B9B9B",
                    fontSize: "16px"
                  }}
          buttonStyle={{  color: "white",
                          fontSize: "16px",
                          background: "#ff433a",
                          padding: "0 20px 0 20px"
                        }}>
          <Trans i18nKey="home.cookie_text">This  website uses cookies to enhance the user experience.</Trans>{" "}

          <span style={{ fontSize: "14px" }}>
            <Trans i18nKey="home.cookie_subtext">By pressing the "Accept" you are agreeing to our Cookie Policiy as stated in our Terms and Conditions.</Trans>
          </span>
        </CookieConsent>
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
