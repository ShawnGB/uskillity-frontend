import React from 'react'
import { translate, Trans } from 'react-i18next'
import { compose } from 'redux'
import { connect } from 'react-redux'
import * as sessionActions from 'app:store/actions/session'
import { Link } from 'react-router-dom'
import './style.css'
import logo from '../../images/logo.png'
import AuthModals from 'app:components/auth-modals'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

class MenuBar extends React.Component {
  render () {
    const { session } = this.props
    const { user } = session
    const isLoggedIn = session && session.isLoggedIn
    return (
      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header className="menubar-header">
            <Link to='/'>
              <img src={logo} width='138' height='50' alt='' />
            </Link>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight className='collapse-nav'>
              <div className='menubar-menu-collection'>
                {!isLoggedIn ? (
                  <NavItem
                    to='#'
                    onClick={() =>
                      this.refs.authModals
                        .getWrappedInstance()
                        .onRegisteredClicked()
                    }
                  >
                    <Trans i18nKey='navbar.button_register'>Register now</Trans>
                  </NavItem>
                ) : (
                  <NavItem to={`/profile/${user.id}`}>
                    <Trans i18nKey='navbar.button_my_account'>My Account</Trans>
                  </NavItem>
                )}
                {!isLoggedIn ? (
                  <NavItem
                    to='#'
                    onClick={() =>
                      this.refs.authModals.getWrappedInstance().onLoginClicked()
                    }
                  >
                    <Trans i18nKey='navbar.button_login'>Log in</Trans>
                  </NavItem>
                ) : (
                  <NavItem
                    to='#'
                    onClick={() => this.props.dispatch(sessionActions.logout())}
                  >
                    <Trans i18nKey='navbar.button_logout'>Log out</Trans>
                  </NavItem>
                )}
                <NavItem to='/shareyourskill'>
                  <Trans i18nKey='navbar.button_share_skill'>
                    Share your skill
                  </Trans>
                </NavItem>
                <NavItem to='/learnskill'>
                  <Trans i18nKey='navbar.button_learn_skill'>
                    Learn a Skill
                  </Trans>
                </NavItem>
                <NavItem to='/about'>
                  <Trans i18nKey='navbar.button_about'>u/about</Trans>
                </NavItem>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AuthModals ref='authModals' />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  session: state.session
})

export default compose(translate('translations'), connect(mapStateToProps))(
  MenuBar
)
