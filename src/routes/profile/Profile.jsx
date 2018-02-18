import React from "react";
import { translate, Trans } from "react-i18next";
import { compose } from "redux";
import ProfileCourses from "./ProfileCourses";
import * as profileActions from "app:store/actions/profile";
import * as userActions from "app:store/actions/profile";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import "./style.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId:this.props.match.params.id,
      profile: {
        about: "",
        edu_bg: ""
      },
      isEditing: false, //Default is false, false = pre-edit state, so edit button will appear
      showCancelBtn: false,
      showSaveBtn: false
    };
  }

  componentWillMount() {
    const { session,isLoggedIn } = this.props;
      let userId = null;
      if (isLoggedIn) {
        userId = session.user.id;
      }
      else {
        userId = this.state.userId
      }
      this.props.dispatch(userActions.fetchUserWorkshop(userId));
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
  };
  //React Dropzone requires onDrop to be implemented
  onDrop(acceptedFiles, rejectedFiles) {
    const { session, dispatch } = this.props;
    const { user } = session;
    const userId = user.id;
    dispatch(profileActions.saveUserPic(acceptedFiles[0], userId));
  }

  render() {
    const { session, profile } = this.props;
    const { user, isLoggedIn } = session;
    const { user_workshops } = profile;
    let provider = {};
    if (isLoggedIn) {
      provider = user;
    } else if (user_workshops.length > 0) {
      provider = user_workshops[0].provider;
    }

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
                  src={provider.image}
                  width="250"
                  height="250"
                  alt=""
                  className="img-circle"
                />
              </div>
            </Dropzone>
          </div>
          {this.state.isEditing && this.state.showCancelBtn ? (
            <ProfileEditable provider={provider} handleEdit={this.handleEdit} />
          ) : (
            <ProfileNormal provider={provider} />
          )}
          {isLoggedIn && !this.state.isEditing ? (
            <button
              className="btn btn-primary btn-margin"
              type="button"
              onClick={this.toggleEdit}
            >
              Edit
            </button>
          ) : isLoggedIn && this.state.showSaveBtn ? (
            <button
              className="btn btn-primary btn-margin"
              type="button"
              onClick={this.saveEdit}
            >
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
      {props.provider.first_name}
      {props.provider.name}
    </div>
    <div className="">
      <p>
        {props.provider.profession} - {props.provider.location}{" "}
      </p>
    </div>
    <div className="profile-content-title">
      <Trans i18nKey="profile.header_about_me">About Me</Trans>
    </div>
    <p>{props.provider.about}</p>
    <div className="profile-content-title">
      <Trans i18nKey="profile.header_educational_background">
        Educational Background
      </Trans>
    </div>
    <p>{props.provider.edu_bg}</p>
  </div>
);

const ProfileEditable = props => (
  <div className="col-lg-6">
    <div className="profile-name">
      <input
        name="first_name"
        defaultValue={props.provider.first_name}
        onChange={props.handleEdit}
      />
      <input
        name="name"
        defaultValue={props.provider.name}
        onChange={props.handleEdit}
      />
    </div>
    <div className="">
      <input
        name="profession"
        defaultValue={props.provider.profession}
        onChange={props.handleEdit}
      />
      <input
        name="location"
        defaultValue={props.provider.location}
        onChange={props.handleEdit}
      />
    </div>
    <div className="profile-content-title">
      <Trans i18nKey="profile.header_about_me">About Me</Trans>
    </div>
    <textarea
      rows="4"
      cols="70"
      name="about"
      defaultValue={props.provider.about}
      onChange={props.handleEdit}
    />
    <div className="profile-content-title">
      <Trans i18nKey="profile.header_educational_background">
        Educational Background
      </Trans>
    </div>
    <textarea
      rows="4"
      cols="70"
      name="edu_bg"
      defaultValue={props.provider.edu_bg}
      onChange={props.handleEdit}
    />
  </div>
);

const CancelButton = props => (
  <button
    className="btn btn-primary btn-margin btn-margin"
    type="button"
    onClick={props.onCancel}
  >
    Cancel
  </button>
);

const mapStateToProps = state => ({
  session: state.session,
  profile: state.profile
});

export default compose(translate("translations"), connect(mapStateToProps))(
  Profile
);
