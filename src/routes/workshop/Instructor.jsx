import React from "react";
import { translate, Trans } from "react-i18next";
import "./style.css";

class Instructor extends React.Component {
  render() {
    const provider = this.props.workshop.provider || {};
    return (
      <div>
        <div className="Instructior-Box">
          <p className="Instructor">
            {" "}
            <Trans i18nKey="workshop.instructor.header">Instructor</Trans>{" "}
          </p>
          <div className="img-container">
            <img
              src={provider.image}
              width="179.1"
              height="178.2"
              alt=""
              className="img-circle Ellipse-3"
            />
          </div>
          <p className="instructor-name"> {provider.name} </p>
          <button className="See-Profile-Box" type="button">
            <Trans i18nKey="workshop.instructor.button_see_profile">
              See Profile
            </Trans>
          </button>
        </div>
      </div>
    );
  }
}

export default translate("translations")(Instructor);
