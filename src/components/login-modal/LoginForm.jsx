import React, { Component } from "react";
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
                    Log in with Facebook
                  </button>
                </div>
                <div className="form-group">
                  <label style={{ margin: "0% 0 5% 50%" }}> or </label>
                  <input
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.email}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Password"
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
                    Log in
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
                Not a user? Sign up.
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
