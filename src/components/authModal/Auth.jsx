import React from "react";
import { connect } from "react-redux";
import * as sessionActions from "app:store/actions/session.actions";
import * as modalActions from "app:store/actions/modal";

class Auth extends React.Component {
  jumpToModal(modalType) {
    this.props.dispatch(modalActions.showModal(modalType));
  }

  onLoginClicked() {
    this.props.dispatch(
      modalActions.showModal("MODAL_LOGIN", {
        handleSubmit: (email, password) => this.handleLogin(email, password),
        jumpToModal: () => this.jumpToModal("MODAL_REGISTER"),
        hideModal: () => this.hideModal("MODAL_LOGIN")
      })
    );
  }

  onRegisteredClicked() {
    this.props.dispatch(
      modalActions.showModal("MODAL_REGISTER", {
        handleSubmit: user => this.handleRegister(user),
        jumpToModal: () => this.jumpToModal("MODAL_LOGIN"),
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

  handleRegister(user) {
    this.props.dispatch(sessionActions.register(user));
  }

  render() {
    return null;
  }
}

// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(null, null, null, { withRef: true })(Auth);
