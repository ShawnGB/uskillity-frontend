import React from "react";
import { translate, Trans } from "react-i18next";
import { compose } from "redux";
import { connect } from "react-redux";
import WorkshopPreviewDiv from "app:components/workshop-preview";

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
              <Trans i18nKey="profile.courses.no_skill_found">
                You don't share any of your skills yet.Why don't you?
              </Trans>
            </p>
          )}
        </div>
        {user_workshops.map((workshop, i) => (
          <div className="col-sm-6 col-md-4" key={i}>
            <WorkshopPreviewDiv i={i} workshop={workshop} editable />
          </div>
        ))}
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  session: state.session,
  profile: state.profile
});

export default compose(translate("translations"), connect(mapStateToProps))(
  ProfileCourses
);
