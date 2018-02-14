import React from "react";
import ProfileCourses from "./ProfileCourses";
import * as profileActions from "app:store/actions/profile";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import "./style.css";

class Profile extends React.Component {

  handleEdit = e => {
    //keyCode:13 = Enter event
    if (e.keyCode === 13) {
      let profile = {};
      profile[e.target.name] = e.target.value;
      this.handleProfileEdit(profile);
    }
  };
  handleProfileEdit = profile => {
    const { dispatch, session } = this.props;
    const { user } = session;
    let userId = user.id;
    dispatch(profileActions.updateUser(profile, userId));
  };

  onDrop(acceptedFiles, rejectedFiles) {
    const { session, dispatch } = this.props;
    const { user } = session;
    const userId = user.id;
    dispatch(profileActions.saveUserPic(acceptedFiles[0], userId));
  }

  render() {
    const { session } = this.props;
    // TODO:use provider from workshops instead of session user, since this user flushes at logout
    const { user } = session;
    const dropzoneStyle = {
      borderRadius: "50%",
      width: "252px",
      height: "252px",
      border: "1px solid grey"
    };
    return (
      <div>
        <div className="container container-profile">
          <div className="row">
            <div className="col-lg-3">
              <Dropzone
                style={dropzoneStyle}
                onDrop={files => this.onDrop(files)}
              >
                <div className="img-container">
                  <img
                    src={user.image}
                    width="250"
                    height="250"
                    alt=""
                    className="img-circle"
                  />
                </div>
              </Dropzone>
            </div>
            <div className="col-lg-6">
              <div className="profile-name">{user.first_name}</div>
              <div className="profile-skill">Profile Skill</div>
              <div className="profile-content-title">About Me</div>
              <input
                onKeyDown={this.handleEdit}
                type="text"
                className="form-control"
                ref={`about_me`}
                name="about"
                defaultValue={user.about}
              />
              <div className="profile-content-title">
                Educational Background
              </div>

              <input
                onKeyDown={this.handleEdit}
                type="text"
                className="form-control"
                ref={`edu_bg`}
                name="edu_bg"
                defaultValue={user.edu_bg}
              />
            </div>
          </div>
          <div className="" />
          <ProfileCourses />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session
});

export default connect(mapStateToProps)(Profile);
