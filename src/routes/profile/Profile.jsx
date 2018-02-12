import React from "react";
import ProfileCourses from "./ProfileCourses";
import * as profileActions from "app:store/actions/profile";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import "./style.css";

class Profile extends React.Component {

  onDrop(acceptedFiles, rejectedFiles) {
    const { session, dispatch } = this.props;
    const { user } = session;
    const userId = user.id;
    dispatch(profileActions.saveUserPic(acceptedFiles[0], userId));
  }

  render() {
    const { session } = this.props;
    console.log("params", session.user);
    return (
      <div>
        <div className="container container-profile">
          <div className="row">
            <div className="col-lg-3">
              <Dropzone onDrop={files => this.onDrop(files)}>
                <div className="img-container">
                  <img
                    src={session.user.image}
                    width="250"
                    height="250"
                    alt=""
                    className="img-circle"
                  />
                </div>
              </Dropzone>
            </div>
            <div className="col-lg-6">
              <div className="profile-name">{session.user.first_name}</div>
              <div className="profile-skill">Profile Skill</div>
              <div className="profile-content-title">About Me</div>
              <div className="profile-content">
                Ich bin Marina, 30 Jahre alt. Neben meiner Arbeit als Lehrerin
                beschäftige ich mich seit zehn Jahren mit Aquarellmalerei. Ich
                gebe Kurse dazu und freue mich über jeden, der Interesse daran
                hat mit mir zu malen und den Umgang mit Pinsel und Farbe zu
                lernen.
              </div>
              <div className="profile-content-title">
                Educational Background
              </div>
              <div className="profile-content">Grundschullehrerin</div>
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
