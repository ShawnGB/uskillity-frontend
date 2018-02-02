import React from "react";
import { connect } from "react-redux";
import * as sessionActions from "app:store/actions/session";
import { Link } from "react-router-dom";
import "./style.css";
import logo from "../../images/logo.png";
import Auth from "app:components/authModal/Auth";

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
                      this.refs.authComponent.onRegisteredClicked()}
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
                    onClick={() => this.refs.authComponent.onLoginClicked()}
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
        <Auth ref="authComponent" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session
});

export default connect(mapStateToProps)(Navbar);
