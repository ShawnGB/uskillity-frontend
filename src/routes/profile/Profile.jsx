import React from "react";
import { translate, Trans } from "react-i18next";
import { compose } from "redux";
import {Elements} from 'react-stripe-elements';
import ProfileCourses from "./ProfileCourses";
import * as profileActions from "app:store/actions/profile";
import * as skillActions from "app:store/actions/skill";
import * as sessionActions from "app:store/actions/session";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import CleverInputReader from "app:components/clever-input-reader";
import PaymentMethodForm from "app:components/payment-method-form";
import { validateContentByLength } from "app:utils/utils";
import "./style.css";

class Profile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      profile: null,
      isEditing: false, // Default is false, false = pre-edit state, so edit button will appear
      showCancelBtn: false,
      showSaveBtn: false,
      isEligible: false, // If the user is eligble to edit this profile
      files: null
    };
    this.deletePaymentMethod = this.deletePaymentMethod.bind(this);
  }

  componentWillMount() {
    this.setProvider(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.setProvider(nextProps.match.params.id);
    }
  }

  isEligible(pId) {
    const { session } = this.props;
    const { isLoggedIn, user } = session;
    return isLoggedIn && user.id === +pId;
  }

  setProvider(pId) {
    const { session } = this.props;

    this.props.dispatch(skillActions.fetchUserWorkshops(pId));

    if (this.isEligible(pId)) {
      this.setState({
        isEligible: true,
        profile: { ...session.user }
      });
    } else {
      this.setState({
        isEligible: false
      });
      this.props.dispatch(profileActions.fetchProvider(pId));
    }
  }

  deletePaymentMethod() {
    const { session } = this.props;
    const { user } = session;
    this.props.dispatch(sessionActions.deletePaymentMethod(user.id));
    this.toggleEdit();
  }

  toggleEdit() {
    const { session } = this.props;
    const { user } = session;
    this.props.dispatch(sessionActions.fetchUser(user.id));
    this.props.dispatch(sessionActions.fetchUserPaymentMethods(user.id));
    if (!user.stripe_provider || user.stripe_provider === "") {
      this.props.dispatch(profileActions.connectStripe(user.id));
    }
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  handleEdit(e) {
    let profile = this.state.profile;
    profile[e.target.name] = e.target.value;
    this.setState({ profile });
  }

  saveEdit() {
    const { dispatch, session } = this.props;
    this.toggleEdit();
    dispatch(profileActions.updateUser(this.state.profile, session.user.id));
  }

  onCancel() {
    this.toggleEdit();

    this.setProvider(this.props.match.params.id);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    const { session, dispatch } = this.props;
    this.setState({ file: acceptedFiles[0] });
    dispatch(profileActions.saveUserPic(acceptedFiles[0], session.user.id));
  }

  render() {
    const { profile, t } = this.props;
    const provider = this.state.profile || profile.provider;
    const isEligible = this.isEligible(this.props.match.params.id);
    const isEditing = this.state.isEditing;
    const imgUrl = this.state.file ? this.state.file.preview : provider.image;
    const dropzoneStyle = {
      cursor: isEligible ? "pointer" : ""
    };
    return (
      <div className="container container-profile">
        <div className="row">
          <div className="col-xs-12">
            <div style={{ float: "right" }}>
              {isEligible &&
                (!isEditing ? (
                  <button
                    className="btn btn-primary btn-margin"
                    type="button"
                    onClick={() => this.toggleEdit()}
                  >
                    Edit
                  </button>
                ) : (
                  <div>
                    <button
                      className="btn btn-primary btn-margin"
                      type="button"
                      onClick={() => this.saveEdit()}
                      disabled={
                        !provider.first_name
                      }
                    >
                      Save
                    </button>

                    <button
                      className="btn btn-primary btn-margin"
                      type="button"
                      onClick={() => this.onCancel()}
                    >
                      Cancel
                    </button>
                  </div>
                ))}
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
              disableClick={!isEligible}
              style={dropzoneStyle}
              multiple={false}
            >
              <div
                className="profile-img-container"
                style={{ backgroundImage: `url(${imgUrl})` }}
              />
            </Dropzone>
          </div>
          {isEligible && isEditing ? (
            <ProfileEditable
              provider={provider}
              handleEdit={e => this.handleEdit(e)}
              t={t}
              stripe_connect_url={this.props.profile.stripe_connect_url}
              deletePaymentMethod={this.deletePaymentMethod}
              paymentMethod={this.props.session.paymentMethod}
            />
          ) : (
            <ProfileNormal provider={provider} />
          )}
        </div>
        <ProfileCourses providerId={provider.id} />
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

const ProfileEditable = props => {
  return (
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
          demand={"Too short"}
          hint={props.t("profile.first_name_hint_text")}
          validate={c => {
            return validateContentByLength(c, 4, 32);
          }}
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
    <h3>
      <Trans>
        Payment Details
      </Trans>
    </h3>
    {props.paymentMethod && props.paymentMethod.brand &&
      <div>
        <p>You have registered a {props.paymentMethod.brand} card, ending with {props.paymentMethod.last4}</p>
        <button style={{margin: "8px auto"}}
          className="btn btn-default uski-button-style"
          type="button"
          onClick={() => props.deletePaymentMethod()}
          >
            <Trans>Delete Payment Method</Trans>
          </button>
      </div>
    }
    {(!props.paymentMethod || !props.paymentMethod.brand) &&
      <Elements>
        <PaymentMethodForm cardholder={props.provider.first_name + ' ' + props.provider.name} dispatch={props.dispatch}/>
      </Elements>
    }
    <h3>
      <Trans>
        Course Provider - Connect your Stripe Account
      </Trans>
    </h3>
    {props.provider.stripe_provider &&
      <div>
        Stripe is connected
      </div>
    }
    {(!props.provider.stripe_provider) &&
      <div>
        You won't be able to offer workshops until you connect your Stripe account.
        By clicking this button, you will be redirected to Stripe, to connect your stripe account.
        In case you do not have a stripe account yet, please create a stripe account.
        <button
          className="btn btn-default btn-margin"
          type="button"
          onClick={() => openInNewTab(props.stripe_connect_url)}
        >
          Connect Stripe
        </button>
      </div>
    }
  </div>
)};

const openInNewTab = (url) => {
  var win = window.open(url, '_blank');
  win.focus();
}

const mapStateToProps = state => ({
  session: state.session,
  profile: state.profile
});

export default compose(translate("translations"), connect(mapStateToProps))(
  Profile
);
