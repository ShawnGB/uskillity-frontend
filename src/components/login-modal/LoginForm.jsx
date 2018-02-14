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
      }
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
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-1">
            <div className="panel-body">
              <form name="form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <button
                    className="btn btn-lg btn-facebook btn-block"
                    type="button"
                  >
                    <Trans i18nKey="login.form.button_login_facebook">
                      Log in with Facebook
                    </Trans>
                  </button>
                </div>
                <div className="form-group">
                  <label style={{ margin: "0% 0 5% 50%" }}> or </label>
                  <input
                    className="form-control"
                    placeholder={
                      <Trans i18nKey="login.form.placeholder_email">
                        Email
                      </Trans>
                    }
                    name="email"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.email}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder={
                      <Trans i18nKey="login.form.placeholder_password">
                        Password
                      </Trans>
                    }
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
            </div>
            <div>{this.state.error.message}</div>
            <div>
              <Link
                onClick={this.props.jumpToModal}
                style={{ margin: "30%" }}
                to="#"
              >
                <Trans i18nKey="login.form.button_register">
                  Not a user? Sign up.
                </Trans>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate("translations")(LoginForm);
