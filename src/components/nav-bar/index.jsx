import React from "react";
import { connect } from "react-redux";
import * as sessionActions from "app:store/actions/session.actions";
import { Link } from "react-router-dom";
import "./style.css";
import logo from "../../images/logo.png";
import AuthModals from "app:components/auth-modals";

class Navbar extends React.Component {
  render() {
    const { session } = this.props;
    const isLoggedIn = session && session.isLoggedIn;
    return (
      <div>
        <nav className="navbar fixed-top navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/">
                <img src={logo} width="138" height="50" alt="" />
              </Link>
            </div>
            <ul className="nav navbar-nav navbar-right">
              {!isLoggedIn ? (
                <li className="menu-item">
                  <Link
                    to="#"
                    onClick={() =>
                      this.refs.authModals
                        .getWrappedInstance()
                        .onRegisteredClicked()}
                  >
                    Register now
                  </Link>
                </li>
              ) : (
                <li className="menu-item">
                  <Link to="/profile">My Account</Link>
                </li>
              )}
              {!isLoggedIn ? (
                <li className="menu-item">
                  <Link
                    to="#"
                    onClick={() =>
                      this.refs.authModals
                        .getWrappedInstance()
                        .onLoginClicked()}
                  >
                    Log in
                  </Link>
                </li>
              ) : (
                <li className="menu-item">
                  <Link
                    to="#"
                    onClick={() => this.props.dispatch(sessionActions.logout())}
                  >
                    Log out
                  </Link>
                </li>
              )}
            </ul>
            <ul className="nav navbar-nav navbar-center">
              <li className="menu-item">
                <Link to="/shareyourskill">Share your skill</Link>
              </li>
              <li className="menu-item">
                <Link to="/learnskill">Learn a Skill</Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-left">
              <li className="menu-item">
                <Link to="/about">u/about</Link>
              </li>
            </ul>
          </div>
        </nav>
        <AuthModals ref="authModals" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session
});

export default connect(mapStateToProps)(Navbar);