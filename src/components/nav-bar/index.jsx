import React from "react";
import { translate, Trans } from "react-i18next";
import { compose } from "redux";
import { connect } from "react-redux";
import * as sessionActions from "app:store/actions/session";
import { Link } from "react-router-dom";
import "./style.css";
import logo from "../../images/logo.png";
import AuthModals from "app:components/auth-modals";

class Navbar extends React.Component {
  render() {
    const { session } = this.props;
    const isLoggedIn = session && session.isLoggedIn;
    return (
      <div className="row">
        <div className="col-sm-offset-1 col-sm-10">
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
                          .onRegisteredClicked()
                      }
                    >
                      <Trans i18nKey="navbar.button_register">
                        Register now
                      </Trans>
                    </Link>
                  </li>
                ) : (
                  <li className="menu-item">
                    <Link to="/profile">
                      <Trans i18nKey="navbar.button_my_account">
                        My Account
                      </Trans>
                    </Link>
                  </li>
                )}
                {!isLoggedIn ? (
                  <li className="menu-item">
                    <Link
                      to="#"
                      onClick={() =>
                        this.refs.authModals
                          .getWrappedInstance()
                          .onLoginClicked()
                      }
                    >
                      <Trans i18nKey="navbar.button_login">Log in</Trans>
                    </Link>
                  </li>
                ) : (
                  <li className="menu-item">
                    <Link
                      to="#"
                      onClick={() =>
                        this.props.dispatch(sessionActions.logout())
                      }
                    >
                      <Trans i18nKey="navbar.button_logout">Log out</Trans>
                    </Link>
                  </li>
                )}
              </ul>
              <ul className="nav navbar-nav navbar-center">
                <li className="menu-item">
                  <Link to="/shareyourskill">
                    <Trans i18nKey="navbar.button_share_skill">
                      Share your skill
                    </Trans>
                  </Link>
                </li>
                <li className="menu-item">
                  <Link to="/learnskill">
                    <Trans i18nKey="navbar.button_learn_skill">
                      Learn a Skill
                    </Trans>
                  </Link>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-left">
                <li className="menu-item">
                  <Link to="/about">
                    <Trans i18nKey="navbar.button_about">u/about</Trans>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <AuthModals ref="authModals" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session
});

export default compose(translate("translations"), connect(mapStateToProps))(
  Navbar
);
