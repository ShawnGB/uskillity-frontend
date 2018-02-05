import React from "react";
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
      <div>
        <div className="container about-container">
          <Tab.Container id="left-tabs" defaultActiveKey={this.props.subpath}>
            <Row className="clearfix">
              <Col sm={3}>
                <Nav bsStyle="pills" stacked>
                  <NavItem className="full-width-nav-item" eventKey="vision">Vision</NavItem>
                  <NavItem className="full-width-nav-item" eventKey="team">Team</NavItem>
                  <NavItem className="full-width-nav-item" eventKey="contact">Contact</NavItem>
                  <NavItem className="full-width-nav-item" eventKey="press">Press</NavItem>
                  <NavItem className="full-width-nav-item" eventKey="help">Help</NavItem>
                  <NavItem className="full-width-nav-item" eventKey="guidelines">Guidelines</NavItem>
                  <NavItem className="full-width-nav-item" eventKey="terms">Terms and Conditions</NavItem>
                </Nav>
              </Col>
              <Col sm={9}>
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
        </div>
      </div>
    );
  }
}

export default About;
