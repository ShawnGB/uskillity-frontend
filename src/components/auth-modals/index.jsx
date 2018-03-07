/*global FB*/
import React from "react";
import { connect } from "react-redux";
import * as sessionActions from "app:store/actions/session";
import * as modalActions from "app:store/actions/modal";

const FB_APP_ID = process.env.FB_APP_ID;

class AuthModals extends React.Component {
  componentDidMount() {
    window.fbAsyncInit = function() {
      FB.init({
        appId: FB_APP_ID,
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse social plugins on this page
        version: "v2.11" // use version 2.11
      });

      // Now that we've initialized the JavaScript SDK, we call
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.
      FB.getLoginStatus(
        function(response) {
          this.statusChangeCallback(response);
        }.bind(this)
      );
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11&appId=${FB_APP_ID}`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  testAPI() {
    FB.api("/me", function(response) {
      console.log("Successful login for: " + response.name);
    });
  }

  // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback(response) {
    console.log("statusChangeCallback");
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === "connected") {
      // Logged into your app and Facebook.
      this.testAPI();
      this.handleFacebookLogin(response);
    } else if (response.status === "not_authorized") {
      // The person is logged into Facebook, but not your app.
      //document.getElementById('status').innerHTML = 'Please log into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      //document.getElementById('status').innerHTML = 'Please log into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  checkLoginState() {
    console.log("checking login state");
    FB.getLoginStatus(
      function(response) {
        this.statusChangeCallback(response);
      }.bind(this)
    );
  }

  handleFBbuttonClick() {
    console.log("handling button click");
    FB.login(this.checkLoginState(), { scope: "email" });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showLoginModal) {
      this.onLoginClicked();
    }
  }

  onLoginClicked() {
    this.props.dispatch(
      modalActions.showModal("MODAL_LOGIN", {
        handleSubmit: (email, password) => this.handleLogin(email, password),
        handleFBbuttonClick: data => this.handleFBbuttonClick(),
        jumpToModal: () => this.onRegisteredClicked(),
        hideModal: () => this.hideModal("MODAL_LOGIN")
      })
    );
  }

  onRegisteredClicked() {
    this.props.dispatch(
      modalActions.showModal("MODAL_REGISTER", {
        handleSubmit: user => this.handleRegister(user),
        handleFBbuttonClick: data => this.handleFBbuttonClick(),
        jumpToModal: () => this.onLoginClicked(),
        hideModal: () => this.hideModal("MODAL_REGISTER")
      })
    );
  }

  hideModal(modalType) {
    this.props.dispatch(modalActions.hideModal(modalType));
  }

  handleLogin(email, password) {
    this.props.dispatch(sessionActions.login(email, password));
  }

  handleFacebookLogin(data) {
    this.props.dispatch(sessionActions.fbLogin(data));
  }

  handleRegister(user) {
    this.props.dispatch(sessionActions.register(user));
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  showLoginModal: state.notifier.showLoginModal
});

export default connect(mapStateToProps, null, null, { withRef: true })(
  AuthModals
);
