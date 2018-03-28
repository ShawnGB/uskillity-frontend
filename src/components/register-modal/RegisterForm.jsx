import React, { Component } from "react";
import { translate, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import CleverInputReader from "app:components/clever-input-reader";
import { validateContentByLength } from "app:utils/utils";
import "./style.css";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        name: "",
        first_name: "",
        password: "",
        password_confirmation: "",
        is_above_16: false
      },
      error: {
        message: ""
      }
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    const input = e.target.name;
    const user = this.state.user;
    user[input] = e.target.value;
    this.setState({ user });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state.user;
    if (user) {
      this.props.handleSubmit(user);
    }
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <div className="equidistant">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                placeholder={t("register.form.placehodler_email")}
                name="email"
                type="text"
                onChange={this.onChange}
                value={this.state.user.email}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder={t("register.form.placehodler_name")}
                name="name"
                type="text"
                onChange={this.onChange}
                value={this.state.user.name}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder={t("register.form.placehodler_first_name")}
                name="first_name"
                type="text"
                onChange={this.onChange}
                value={this.state.user.first_name}
              />
            </div>
            <div className="form-group">
              <CleverInputReader
                componentClass={"input"}
                type="password"
                name="password"
                placeholder={t("register.form.placehodler_password")}
                value={this.state.user.password}
                onChange={this.onChange}
                demand={"Too short"}
                hint={""}
                validate={c => {
                  return validateContentByLength(c, 8, 999);
                }}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder={t("register.form.placehodler_confirm_password")}
                name="password_confirmation"
                type="password"
                onChange={this.onChange}
                value={this.state.user.password_confirmation}
              />
            </div>
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  value={this.state.user.is_above_16}
                  name="is_above_16"
                  onChange={this.onChange}
                />
                <p style={{ fontSize: "14px" }}>
                  <Trans i18nKey="register.form.older_than_16">
                    I am older than 12 years of age.
                  </Trans>
                </p>
              </label>
            </div>
            <div className="form-group">
              <button
                className="btn btn-lg btn-primary btn-block"
                disabled={
                  !this.state.user.email ||
                  !this.state.user.name ||
                  !this.state.user.first_name ||
                  !this.state.user.password ||
                  !this.state.user.password_confirmation ||
                  !this.state.user.is_above_16
                }
              >
                <Trans i18nKey="register.form.button_register">Register</Trans>
              </button>
              <div className="form-group" style={{ marginTop: "15px" }}>
                <button
                  className="btn btn-lg btn-facebook btn-block"
                  onClick={() => this.props.handleFBbuttonClick()}
                  type="button"
                >
                  <Trans i18nKey="register.form.button_register_facebook">
                    Register with Facebook
                  </Trans>
                </button>
              </div>
            </div>
          </form>

          <div>{this.state.error.message}</div>

          <div>
            <Link onClick={this.props.jumpToModal} to={"#"}>
              <Trans i18nKey="register.form.button_login">
                Do you already have an account? Login here.
              </Trans>
            </Link>
          </div>
        </div>
        <div>{this.state.error.message}</div>
      </div>
    );
  }
}

export default translate("translations")(RegisterForm);
