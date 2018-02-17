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
      profile: {
        about: "",
        edu_bg: ""
      },
      isEditing: false,//Default is false, false = pre-edit state, so edit button will appear
      showCancelBtn: false,
      showSaveBtn: false
    };
  }

  toggleEdit = () => {
    this.setState({
      isEditing: true,
      showSaveBtn: true
    });
    this.toggleCancelBtn();
  };

  toggleCancelBtn = () => {
    this.setState({ showCancelBtn: true });
  };

  handleEdit = e => {
    let profile = this.state.profile;
    profile[e.target.name] = e.target.value;
    this.setState({ profile });
    console.log("profile", profile);
  };

  saveEdit = () => {
    const { dispatch, session } = this.props;
    const { user } = session;
    let userId = user.id;
    this.toggleButtons();
    dispatch(profileActions.updateUser(this.state.profile, userId));
  };

  onCancel = () => {
    this.toggleButtons();
  };

  toggleButtons = () => {
    this.setState({
      showCancelBtn: false,
      showSaveBtn: false,
      isEditing: false
    });
  }
//React Dropzone requires onDrop to be implemented
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
            <ProfileEditable user={user} handleEdit={this.handleEdit} />
          ) : (
            <ProfileNormal user={user} />
          )}
          {isLoggedIn && !this.state.isEditing ? (
            <button className="btn btn-primary btn-margin" type="button" onClick={this.toggleEdit}>
              Edit
            </button>
          ) : isLoggedIn && this.state.showSaveBtn ? (
            <button className="btn btn-primary btn-margin" type="button" onClick={this.saveEdit}>
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
      {props.user.first_name}{props.user.name}
    </div>
    <div className="">
      <p>{props.user.profession} - {props.user.location} </p>
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
      <input
        name="first_name"
        defaultValue={props.user.first_name}
        onChange={props.handleEdit}
      />
      <input
        name="name"
        defaultValue={props.user.name}
        onChange={props.handleEdit}
      />
    </div>
    <div className="">
      <input
        name="profession"
        defaultValue={props.user.profession}
        onChange={props.handleEdit}
      />
      <input
        name="location"
        defaultValue={props.user.location}
        onChange={props.handleEdit}
      />
    </div>
    <div className="profile-content-title">
      <Trans i18nKey="profile.header_about_me">About Me</Trans>
    </div>
    <textarea rows="4" cols="70"
      name="about"
      defaultValue={props.user.about}
      onChange={props.handleEdit}
    />
    <div className="profile-content-title">
      <Trans i18nKey="profile.header_educational_background">
        Educational Background
      </Trans>
    </div>
    <textarea rows="4" cols="70"
      name="edu_bg"
      defaultValue={props.user.edu_bg}
      onChange={props.handleEdit}
    />
  </div>
);

const CancelButton = props => (
  <button className="btn btn-primary btn-margin btn-margin" type="button" onClick={props.onCancel}>
    Cancel
  </button>
);

const mapStateToProps = state => ({
  session: state.session
});

export default compose(translate("translations"), connect(mapStateToProps))(
  Profile
);
