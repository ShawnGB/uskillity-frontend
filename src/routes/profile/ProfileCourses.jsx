import React from "react";
import { translate, Trans } from "react-i18next";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";

class ProfileCourses extends React.Component {
  render() {
    const { profile } = this.props;
    const user_workshops = profile && profile.user_workshops;
    return (
      <div className="row">
        <div className="col">
          {user_workshops.length > 0 ? (
            <h2 style={{ marginLeft: "15px" }}>
              <Trans i18nKey="profile.courses.header">My Shared Skills</Trans>
            </h2>
          ) : (
            <p>
              {" "}
              <Trans i18nKey="profile.courses.no_skill_found">
                {" "}
                You don't share any of your skills yet.Why don't you?
              </Trans>
            </p>
          )}
        </div>

        {user_workshops.map((workshop, i) => (
          <div className="col-sm-6 col-md-4" key={i}>
            <div className="home-category-wrapper">
              <Link to={`/workshop/${workshop.id}`}>
                <div
                  className="home-category"
                  key={workshop.id}
                  style={{ backgroundImage: `url(${workshop.images[0]})` }}
                />
              </Link>
            </div>
            <div className="row" style={{ marginTop: "12px" }}>
              <div className="col-xs-8">
                <p className="skill-title">{workshop.title}</p>
              </div>
              <div className="col-xs-4">
                <Button skillId={workshop.id} />
              </div>
              <div
                className="col-xs-12"
                style={{ margin: "0px", height: "22px" }}
              >
                <p>
                  {workshop.provider.first_name} {workshop.provider.name}
                </p>
              </div>
              <div className="col-xs-12">
                <p className="skill-price">{workshop.fees} €</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const Button = props => (
  <Route
    render={({ history }) => (
      <button
        className="btn_edit_skill"
        type="button"
        onClick={() => {
          history.push(`/shareyourskill/edit/${props.skillId}`);
        }}
      >
        <Trans i18nKey="workshop.instructor.button_edit_workshop">Edit</Trans>
      </button>
    )}
  />
);

export const mapStateToProps = state => ({
  session: state.session,
  profile: state.profile
});

export default compose(translate("translations"), connect(mapStateToProps))(
  ProfileCourses
);
