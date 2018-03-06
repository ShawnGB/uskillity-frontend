import React from "react";
import { connect } from "react-redux";
import * as sessionActions from "app:store/actions/session";
import * as modalActions from "app:store/actions/modal";

class AuthModals extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.showLoginModal) {
      this.onLoginClicked();
    }
  }

  onLoginClicked() {
    this.props.dispatch(
      modalActions.showModal("MODAL_LOGIN", {
        handleSubmit: (email, password) => this.handleLogin(email, password),
        handleFbLogin: data => this.handleFacebookLogin(data),
        jumpToModal: () => this.onRegisteredClicked(),
        hideModal: () => this.hideModal("MODAL_LOGIN")
      })
    );
  }

  onRegisteredClicked() {
    this.props.dispatch(
      modalActions.showModal("MODAL_REGISTER", {
        handleSubmit: user => this.handleRegister(user),
        handleFbLogin: data => this.handleFacebookLogin(data),
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
