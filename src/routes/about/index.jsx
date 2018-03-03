import React from "react";
import { translate, Trans } from "react-i18next";
import { Tab } from "react-bootstrap";
import { Row, Col, NavItem, Nav } from "react-bootstrap";

import "./style.css";

import Vision from "app:components/about/Vision";
import Team from "app:components/about/Team";
import Contact from "app:components/about/Contact";
import Press from "app:components/about/Press";
import Help from "app:components/about/Help";
import Guidelines from "app:components/about/Guidelines";
import TermsConditions from "app:components/about/TermsConditions";

class About extends React.Component {
  render() {
    return (
      <Tab.Container id="left-tabs" defaultActiveKey={this.props.subpath}>
        <Row className="clearfix">
          <Col xs={12} smHidden mdHidden lgHidden>
            <Nav justified>
              <NavItem style={{float: "left"}} eventKey="vision">
                <Trans i18nKey="about.nav.vision">Vision</Trans>
              </NavItem>
              <NavItem style={{float: "left"}} eventKey="team">
                <Trans i18nKey="about.nav.team">Team</Trans>
              </NavItem>
              <NavItem style={{float: "left"}} eventKey="contact">
                <Trans i18nKey="about.nav.contact">Contact</Trans>
              </NavItem>
              <NavItem style={{float: "left"}} eventKey="press">
                <Trans i18nKey="about.nav.press">Press</Trans>
              </NavItem>
              <NavItem style={{float: "left"}} eventKey="help">
                <Trans i18nKey="about.nav.help">Help</Trans>
              </NavItem>
              <NavItem style={{float: "left"}} eventKey="guidelines">
                <Trans i18nKey="about.nav.guidelines">Guidelines</Trans>
              </NavItem>
              <NavItem style={{float: "left"}} eventKey="terms">
                <Trans i18nKey="about.nav.termsandconditions">
                  Terms and Conditions
                </Trans>
              </NavItem>
            </Nav>
          </Col>
          <Col sm={3} xsHidden>
            <Nav stacked>
              <NavItem eventKey="vision">
                <Trans i18nKey="about.nav.vision">Vision</Trans>
              </NavItem>
              <NavItem eventKey="team">
                <Trans i18nKey="about.nav.team">Team</Trans>
              </NavItem>
              <NavItem eventKey="contact">
                <Trans i18nKey="about.nav.contact">Contact</Trans>
              </NavItem>
              <NavItem eventKey="press">
                <Trans i18nKey="about.nav.press">Press</Trans>
              </NavItem>
              <NavItem eventKey="help">
                <Trans i18nKey="about.nav.help">Help</Trans>
              </NavItem>
              <NavItem eventKey="guidelines">
                <Trans i18nKey="about.nav.guidelines">Guidelines</Trans>
              </NavItem>
              <NavItem eventKey="terms">
                <Trans i18nKey="about.nav.termsandconditions">
                  Terms and Conditions
                </Trans>
              </NavItem>
            </Nav>
          </Col>
          <Col sm={9} xs={12}>
            <Tab.Content animation>
              <Tab.Pane eventKey="vision">
                <Vision />
              </Tab.Pane>
              <Tab.Pane eventKey="team">
                <Team />
              </Tab.Pane>
              <Tab.Pane eventKey="contact">
                <Contact />
              </Tab.Pane>
              <Tab.Pane eventKey="press">
                <Press />
              </Tab.Pane>
              <Tab.Pane eventKey="help">
                <Help />
              </Tab.Pane>
              <Tab.Pane eventKey="guidelines">
                <Guidelines />
              </Tab.Pane>
              <Tab.Pane eventKey="terms">
                <TermsConditions />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export default translate("translations")(About);
