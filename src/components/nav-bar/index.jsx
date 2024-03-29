import React from "react";
import { translate, Trans } from "react-i18next";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as sessionActions from "app:store/actions/session";
import { Link } from "react-router-dom";
import "./style.css";
import logo from "../../images/logo.png";
import AuthModals from "app:components/auth-modals";
import { Navbar, Nav, NavItem } from "react-bootstrap";

class MenuBar extends React.Component {

  openExternalURL() {
  window.open("https://www.facebook.com/groups/835973433271160/?source_id=1019044938179452")
}


  render() {
    const { session, history } = this.props;
    const { user } = session;
    const isLoggedIn = session && session.isLoggedIn;

    return (
      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header className="menubar-header" style={{ height: "50px" }}>
            <Link to="/">
              <img src={logo} className="logo" alt="" />
            </Link>

            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>



            <Nav pullRight className="collapse-nav menubar-menu-collection">

              <NavItem onClick={e => history.push("/learnskill")}>
                <Trans i18nKey="navbar.button_learn_skill">Learn a Skill</Trans>
              </NavItem>

              <NavItem onClick={e => history.push("/shareyourskill")}>
                <Trans i18nKey="navbar.button_share_skill">Share a skill</Trans>
              </NavItem>

              <NavItem onClick={e => history.push("/about")}>
                <Trans i18nKey="navbar.button_about">u/about</Trans>
              </NavItem>

              {!isLoggedIn ? (
                <NavItem
                  onClick={() =>
                    this.refs.authModals
                      .getWrappedInstance()
                      .onRegisteredClicked()}
                >
                  <Trans i18nKey="navbar.button_register">Register now</Trans>
                </NavItem>
              ) : (
                <NavItem onClick={e => history.push(`/profile/${user.id}`)}>
                  <Trans i18nKey="navbar.button_my_account">My Account</Trans>
                </NavItem>
              )}
              <NavItem onClick={this.openExternalURL}>
                <Trans i18nKey="navbar.button_community">Community</Trans>
                </NavItem>
              {!isLoggedIn ? (
                <NavItem
                  onClick={() =>
                    this.refs.authModals.getWrappedInstance().onLoginClicked()}
                >
                  <Trans i18nKey="navbar.button_login">Log in</Trans>
                </NavItem>
              ) : (
                <NavItem
                  onClick={() => this.props.dispatch(sessionActions.logout())}
                >
                  <Trans i18nKey="navbar.button_logout">Log out</Trans>
                </NavItem>
              )}

            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AuthModals ref="authModals" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session
});

export default compose(
  withRouter,
  translate("translations"),
  connect(mapStateToProps)
)(MenuBar);
