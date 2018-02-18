import React from "react";
import { translate, Trans } from "react-i18next";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as userActions from "app:store/actions/profile";

class ProfileCourses extends React.Component {
  componentDidMount() {
    const { session,isLoggedIn } = this.props;
      const user_id = session && session.user.id;
      this.props.dispatch(userActions.fetchUserWorkshop(user_id));
  }
  render() {
    const { profile } = this.props;
    const user_workshops = profile && profile.user_workshops;
    return (
      <div>
        <div className="container container-profile">
          {user_workshops.length > 0 ? (
            <p className="skills-heading">
              <Trans i18nKey="profile.courses.header">My Shared Skills</Trans>
            </p>
          ) : (
            <p>
              {" "}
              <Trans i18nKey="profile.courses.no_skill_found">
                {" "}
                You don't share any of your skills yet.Why don't you?
              </Trans>
            </p>
          )}

          <div className="row">
            {user_workshops.map((workshop, i) => (
              <div className="col-sm-4" key={i}>
                <Link to={`/workshop/${workshop.id}`}>
                  <img
                    src={workshop.images[0]}
                    width="306.3"
                    height="178.8"
                    alt=""
                  />
                </Link>
                <div className="skill-content">
                    <button className="btn_edit_skill" type="button">
                      {" "}
                      Edit{" "}
                    </button>
                  <p className="skill-title">{workshop.title}</p>
                  <p className="skill-author">
                    {workshop.provider.first_name} {workshop.provider.name}
                  </p>
                  <p className="skill-price">{workshop.fees} €</p>
                </div>
              </div>
            ))}
          </div>
        </div>
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
