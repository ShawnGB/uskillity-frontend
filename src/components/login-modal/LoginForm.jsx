import React, { Component } from "react";
import { translate, Trans } from "react-i18next";
import { Link } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: {
        message: ""
      },
      data: ""
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      this.props.handleSubmit(email, password);
    }
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <div className="equidistant">
          <form name="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <button
                className="btn btn-lg btn-facebook btn-block"
                onClick={() => this.props.handleFBbuttonClick()}
                type="button"
              >
                <Trans i18nKey="login.form.button_login_facebook">
                  Log in with Facebook
                </Trans>
              </button>
            </div>
            <div
              style={{
                margin: "12px auto",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <h5>Or</h5>
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder={t("login.form.email_placeholder")}
                name="email"
                type="text"
                onChange={this.onChange}
                value={this.state.email}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder={t("login.form.password_placeholder")}
                name="password"
                type="password"
                onChange={this.onChange}
                value={this.state.password}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-lg btn-primary btn-block"
                disabled={!this.state.email || !this.state.password}
              >
                <Trans i18nKey="login.form.button_login">Log in</Trans>
              </button>
            </div>
          </form>
          <div>{this.state.error.message}</div>
          {this.props.jumpToModal ? (
            <div>
              <Link onClick={this.props.jumpToModal} to="#">
                <Trans i18nKey="login.form.button_register">
                  Not a user? Sign up.
                </Trans>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default translate("translations")(LoginForm);
