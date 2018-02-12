import React from "react";
import { connect } from "react-redux";
import * as userActions from "app:store/actions/profile";

class ProfileCourses extends React.Component {
  componentDidMount() {
    const { session } = this.props;
    const user_id = session && session.user.id;
    this.props.dispatch(userActions.fetchUserWorkshop(user_id));
  }
  render() {
    const { profile } = this.props;
    const user_workshops = profile && profile.user_workshops;
    return (
      <div>
        <div className="container container-profile">
          <p className="skills-heading">My Shared Skills</p>
          <div className="row">
            {user_workshops.map((workshop, i) => (
              <div className="col-sm-4" key={i}>
                <img
                  src={workshop.images[0]}
                  width= "306.3"
                  height= "178.8"
                  alt=""
                />
                <div className="skill-content">
                  <p className="skill-provider">{workshop.provider.name} {workshop.provider.first_name}</p>
                  <p className="skill-title">{workshop.title}</p>
                  <p className="skill-author">
                    {workshop.provider.first_name}
                    {workshop.provider.name}{" "}
                  </p>
                  <p className="skill-price">14 €</p>
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
export default connect(mapStateToProps)(ProfileCourses);
