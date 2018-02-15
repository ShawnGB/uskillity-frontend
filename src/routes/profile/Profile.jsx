import React from "react";
import { translate, Trans } from "react-i18next";
import { compose } from "redux";
import ProfileCourses from "./ProfileCourses";
import * as profileActions from "app:store/actions/profile";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import "./style.css";

class Profile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      about: "",
      edu_bg: "",
      isEditing: false,
      showCancelBtn: false,
      showSaveBtn: false,
    };
  }

  toggleEdit = () => {
    this.setState({
      isEditing: true,
      showSaveBtn:true
    });
    this.toggleCancelBtn();
  };

  saveEdit = () => {
    this.setState({
      about: "about"
    });
    console.log("save clicked");
  };

  toggleCancelBtn = () => {
    this.setState({ showCancelBtn: true });
  };

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

  onCancel = () => {
    this.setState({
      showCancelBtn: false,
      showSaveBtn:false,
      isEditing:false
    });
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
    const { user, isLoggedIn } = session;
    const dropzoneStyle = {
      borderRadius: "50%",
      width: "252px",
      height: "252px",
      border: "1px solid grey"
    };
    return (
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
          {this.state.isEditing && this.state.showCancelBtn ? (
            <ProfileEditable user={user} />
          ) : (
            <ProfileNormal user={user} />
          )}
          {isLoggedIn && !this.state.isEditing ? (
            <button type="button" onClick={this.toggleEdit}>
              Edit
            </button>
          ) : isLoggedIn && this.state.showSaveBtn ? (
            <button type="button" onClick={this.saveEdit}>
              Save
            </button>
          ) : null}
          {this.state.showCancelBtn ? (
            <CancelButton onCancel={this.onCancel} />
          ) : null}
        </div>
        <ProfileCourses />
      </div>
    );
  }
}

const ProfileNormal = props => (
  <div className="col-lg-6">
    <div className="profile-name">
      {props.user.first_name} {props.user.name}
    </div>
    <div className="profile-skill">
      <Trans i18nKey="profile.header_skill">Profile Skill</Trans>
    </div>
    <div className="profile-content-title">
      <Trans i18nKey="profile.header_about_me">About Me</Trans>
    </div>
    <p>{props.user.about}</p>
    <div className="profile-content-title">
      <Trans i18nKey="profile.header_educational_background">
        Educational Background
      </Trans>
    </div>
    <p>{props.user.edu_bg}</p>
  </div>
);

const ProfileEditable = props => (
  <div className="col-lg-6">
    <div className="profile-name">
      {props.user.first_name} {props.user.name}
    </div>
    <div className="profile-skill">
      <Trans i18nKey="profile.header_skill">Profile Skill</Trans>
    </div>
    <div className="profile-content-title">
      <Trans i18nKey="profile.header_about_me">About Me</Trans>
    </div>
    <input defaultValue={props.user.about} />
    <div className="profile-content-title">
      <Trans i18nKey="profile.header_educational_background">
        Educational Background
      </Trans>
    </div>
    <input defaultValue={props.user.edu_bg} />
  </div>
);

const CancelButton = props => (
  <button type="button" onClick={props.onCancel}>
    Cancel
  </button>
);

const mapStateToProps = state => ({
  session: state.session
});

export default compose(translate("translations"), connect(mapStateToProps))(
  Profile
);
