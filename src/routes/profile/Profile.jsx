import React from "react";
import { translate, Trans } from "react-i18next";
import { compose } from "redux";
import ProfileCourses from "./ProfileCourses";
import * as profileActions from "app:store/actions/profile";
import * as skillActions from "app:store/actions/skill";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import CleverInputReader from "app:components/clever-input-reader";
import {
  validateContentByLength,
  validateContentByValue,
  validateFeesLimit
} from "app:utils/utils";
import "./style.css";

class Profile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      profile: {
        about: "",
        edu_bg: "",
        first_name: "",
        name: "",
        location: "",
        profession: ""
      },
      isEditing: false, // Default is false, false = pre-edit state, so edit button will appear
      showCancelBtn: false,
      showSaveBtn: false,
      isEligible: false, // If the user is eligble to edit this profile
      provider: null
    };
  }

  componentWillMount() {
    this.setProvider(this.props.match.params.id);
  }

  componentWillReceiveProps = nextProps => {
    // TODO: should check if nextProps has id ?
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.setProvider(nextProps.match.params.id);
    }
  };

  setProvider = pId => {
    const { session } = this.props;
    const { isLoggedIn } = session;

    this.props.dispatch(skillActions.fetchUserWorkshops(pId));

    if (isLoggedIn && session.user.id === +pId) {
      this.setState({
        isEligible: true,
        provider: session.user
      });
    } else {
      this.setState({
        isEligible: false,
        provider: null
      });
      this.props.dispatch(profileActions.fetchProvider(pId));
    }
  };

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
  // React Dropzone requires onDrop to be implemented
  onDrop(acceptedFiles, rejectedFiles) {
    const { session, dispatch } = this.props;
    const { user } = session;
    const userId = user.id;
    dispatch(profileActions.saveUserPic(acceptedFiles[0], userId));
  }

  render() {
    const { profile, t } = this.props;
    let provider = {};
    provider = this.state.provider || profile.provider;
    return (
      <div className="container container-profile">
        <div className="row">
          <div className="col-xs-12">
            <div style={{ float: "right" }}>
              {this.state.isEligible && !this.state.isEditing ? (
                <button
                  className="btn btn-primary btn-margin"
                  type="button"
                  onClick={this.toggleEdit}
                >
                  Edit
                </button>
              ) : this.state.isEligible && this.state.showSaveBtn ? (
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
          </div>
        </div>
        <div className="row">
          <div
            className="col-sm-4 col-md-3"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "16px"
            }}
          >
            <Dropzone
              className="dropzone-style"
              onDrop={files => this.onDrop(files)}
              disableClick={!this.state.isEligible}
            >
              <div className="img-container">
                <img src={provider.image} alt="" className="img-circle" />
              </div>
            </Dropzone>
          </div>
          {this.state.isEligible && this.state.showCancelBtn ? (
            <ProfileEditable
              provider={provider}
              handleEdit={this.handleEdit}
              t={t}
            />
          ) : (
            <ProfileNormal provider={provider} />
          )}
        </div>
        <ProfileCourses
          providerId={
            this.state.provider
              ? this.state.provider.id
              : this.props.match.params.id
          }
        />
      </div>
    );
  }
}

const ProfileNormal = props => (
  <div className="col-sm-8 col-md-9" style={{ marginTop: "16px" }}>
    <div className="profile-name">
      {props.provider.first_name} {props.provider.name}
    </div>
    <div className="">
      <p>
        {props.provider.profession} - {props.provider.location}{" "}
      </p>
    </div>
    <h3>
      <Trans i18nKey="profile.header_about_me">About Me</Trans>
    </h3>
    <p>{props.provider.about}</p>
    <h3>
      <Trans i18nKey="profile.header_educational_background">
        Educational Background
      </Trans>
    </h3>
    <p>{props.provider.edu_bg}</p>
  </div>
);

const ProfileEditable = props => (
  <div className="col-sm-8 col-md-9" style={{ marginTop: "16px" }}>
    <div className="row">
      <div className="col-xs-6">
        <CleverInputReader
          componentClass={"input"}
          type={"input"}
          name={"first_name"}
          defaultValue={props.provider.first_name}
          placeholder={props.t("profile.first_name_placeholder")}
          onChange={props.handleEdit}
          hintless
        />
      </div>
      <div className="col-xs-6">
        <CleverInputReader
          componentClass={"input"}
          type={"input"}
          name={"name"}
          defaultValue={props.provider.name}
          onChange={props.handleEdit}
          placeholder={props.t("profile.name_placeholder")}
          hintless
        />
      </div>
    </div>
    <div className="row" style={{ marginTop: "10px" }}>
      <div className="col-xs-4">
        <CleverInputReader
          componentClass={"input"}
          type={"input"}
          name={"profession"}
          defaultValue={props.provider.profession}
          onChange={props.handleEdit}
          placeholder={props.t("profile.profession_placeholder")}
          hintless
        />
      </div>
      <div className="col-xs-4">
        <CleverInputReader
          componentClass={"input"}
          type={"input"}
          name={"location"}
          placeholder={props.t("profile.location_placeholder")}
          defaultValue={props.provider.location}
          onChange={props.handleEdit}
          hintless
        />
      </div>
    </div>
    <h3>
      <Trans i18nKey="profile.header_about_me">About Me</Trans>
    </h3>
    <CleverInputReader
      componentClass={"textarea"}
      type={"input"}
      name={"about"}
      placeholder={props.t("profile.about_placeholder")}
      defaultValue={props.provider.about}
      onChange={props.handleEdit}
      demand={"Too short"}
      hint={""}
      validate={c => {
        return validateContentByLength(c, 0, 1000);
      }}
    />
    <h3>
      <Trans i18nKey="profile.header_educational_background">
        Educational Background
      </Trans>
    </h3>
    <CleverInputReader
      componentClass={"textarea"}
      type={"input"}
      name={"edu_bg"}
      placeholder={props.t("profile.edu_bg_placeholder")}
      defaultValue={props.provider.edu_bg}
      onChange={props.handleEdit}
      demand={"Too short"}
      hint={""}
      validate={c => {
        return validateContentByLength(c, 0, 1000);
      }}
    />
  </div>
);

const CancelButton = props => (
  <button
    className="btn btn-primary btn-margin"
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
