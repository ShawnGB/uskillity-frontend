import React from "react";
import { translate, Trans } from "react-i18next";
import { compose } from "redux";
import { connect } from "react-redux";
import WorkshopPreviewDiv from "app:components/workshop-preview";

class ProfileCourses extends React.Component {
  render() {
    const { providerId, skills, session } = this.props;
    const editable =
      session.isLoggedIn && session.user && session.user.id === +providerId;
    const workshops = skills.workshops.filter(workshop => {
      return workshop.provider_id === +providerId;
    });

    return (
      <div className="row" style={{ marginTop: "12px" }}>
        <div className="col">
          {workshops.length > 0 ? (
            <h2 style={{ marginLeft: "15px" }}>
              <Trans i18nKey="profile.courses.header">My Shared Skills</Trans>
            </h2>
          ) : (
            <h3>
              <Trans i18nKey="profile.courses.no_skill_found">
                You are not sharing any of your skills.
              </Trans>
            </h3>
          )}
        </div>
        {workshops.map((workshop, i) => (
          <div className="col-sm-6 col-md-4" key={i}>
            <WorkshopPreviewDiv i={i} workshop={workshop} editable={editable} />
          </div>
        ))}
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  session: state.session,
  skills: state.skills
});

export default compose(translate("translations"), connect(mapStateToProps))(
  ProfileCourses
);
