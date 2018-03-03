import React from "react";
import { Route } from "react-router-dom";
import { translate, Trans } from "react-i18next";
import "./style.css";

class Instructor extends React.Component {
  render() {
    const provider = this.props.workshop.provider || {};
    console.log("provider", provider);
    return (
      <div className="Instructior-Box">
        <h4>
          {" "}
          <Trans i18nKey="workshop.instructor.header">Instructor</Trans>{" "}
        </h4>
        <div
          className="profile-img-container"
          style={{ backgroundImage: `url(${provider.image})` }}
        />
        <h4>
          {provider.name} {provider.first_name}{" "}
        </h4>
        <Button provider={provider} dispatch={this.props.dispatch} />
      </div>
    );
  }
}

const Button = props => (
  <Route
    render={({ history }) => (
      <button
        className="See-Profile-Box"
        type="button"
        onClick={() => {
          history.push(`/profile/${props.provider.id}`);
        }}
      >
        <Trans i18nKey="workshop.instructor.button_see_profile">
          See Profile
        </Trans>
      </button>
    )}
  />
);

export default translate("translations")(Instructor);
