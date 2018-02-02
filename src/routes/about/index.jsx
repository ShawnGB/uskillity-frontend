import React from "react";
import Navbar from "app:components/navigation/Nav";
import Footer from "app:components/footer/Footer";
import { Tabs, Tab, TabContainer, TabContent, TabPane } from "react-bootstrap";
import {Row, Col, NavItem, Nav} from "react-bootstrap";

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
        <Navbar />
        <div className="container about-container">
          <Tab.Container id="left-tabs" defaultActiveKey={this.props.subpath}>
            <Row className="clearfix">
              <Col sm={3}>
                <Nav bsStyle="pills" stacked>
                  <NavItem eventKey="vision">Vision</NavItem>
                  <NavItem eventKey="team">Team</NavItem>
                  <NavItem eventKey="contact">Contact</NavItem>
                  <NavItem eventKey="press">Press</NavItem>
                  <NavItem eventKey="help">Help</NavItem>
                  <NavItem eventKey="guidelines">Guidelines</NavItem>
                  <NavItem eventKey="terms">Terms and Conditions</NavItem>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content animation>
                  <Tab.Pane eventKey="vision"><Vision/></Tab.Pane>
                  <Tab.Pane eventKey="team"><Team/></Tab.Pane>
                  <Tab.Pane eventKey="contact"><Contact/></Tab.Pane>
                  <Tab.Pane eventKey="press"><Press/></Tab.Pane>
                  <Tab.Pane eventKey="help"><Help/></Tab.Pane>
                  <Tab.Pane eventKey="guidelines"><Guidelines/></Tab.Pane>
                  <Tab.Pane eventKey="terms"><TermsConditions/></Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
        <Footer />
      </div>
    );
  }
}

export default About;
