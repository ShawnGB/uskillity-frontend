import React, { Component } from "react";
import { translate, Trans } from "react-i18next";
import { Link } from "react-router-dom";
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
        password_confirmation: ""
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
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-1">
            <div className="panel-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder={
                      <Trans i18nKey="register.form.placehodler_email">
                        Email
                      </Trans>
                    }
                    name="email"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.user.email}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder={
                      <Trans i18nKey="register.form.placehodler_name">
                        Name
                      </Trans>
                    }
                    name="name"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.user.name}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder={
                      <Trans i18nKey="register.form.placehodler_first_name">
                        First Name
                      </Trans>
                    }
                    name="first_name"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.user.first_name}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder={
                      <Trans i18nKey="register.form.placehodler_password">
                        Password
                      </Trans>
                    }
                    name="password"
                    type="password"
                    onChange={this.onChange}
                    value={this.state.user.password}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder={
                      <Trans i18nKey="register.form.placehodler_confirm_password">
                        Confirm Password
                      </Trans>
                    }
                    name="password_confirmation"
                    type="password"
                    onChange={this.onChange}
                    value={this.state.user.password_confirmation}
                  />
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-lg btn-primary btn-block"
                    disabled={
                      !this.state.user.email ||
                      !this.state.user.name ||
                      !this.state.user.first_name ||
                      !this.state.user.password ||
                      !this.state.user.password_confirmation
                    }
                  >
                    <Trans i18nKey="register.form.button_register">
                      Register
                    </Trans>
                  </button>
                </div>
                <button
                  className="btn btn-lg btn-facebook btn-block"
                  type="button"
                >
                  <Trans i18nKey="register.form.button_register_facebook">
                    Register with Facebook
                  </Trans>
                </button>
              </form>
            </div>
            <div>{this.state.error.message}</div>
            <div>
              <Link
                onClick={this.props.jumpToModal}
                style={{ margin: "10%" }}
                to={"#"}
              >
                <Trans i18nKey="register.form.button_login">
                  Do you already have an account? Login here.
                </Trans>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate("translations")(RegisterForm);
