import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Home from "../components/home/Home";
import Vision from "../components/about/Vision";
import Team from "../components/about/Team";
import Contact from "../components/about/Contact";
import Help from "../components/about/Help";
import Press from "../components/about/Press";
import Courses from "../components/courses/Courses";
import Profile from "../components/dashboard/profile/Profile";
import ProfileEdit from "../components/dashboard/profile/ProfileEdit";
import Workshop from "../components/workshop/Workshop";
import ShareSkill from "../components/dashboard/ShareSkill";
import LearnSkill from "../components/dashboard/LearnSkill"
import TermsConditions from "../components/about/TermsConditions"
import Guidelines from "../components/about/Guidelines"

export default () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={Vision} />
      <Route path="/vision" component={Vision} />
      <Route path="/team" component={Team} />
      <Route path="/courses" component={Courses} />
      <Route path="/contact" component={Contact} />
      <Route path="/help" component={Help} />
      <Route path="/press" component={Press} />
      <Route path="/guidelines" component={Guidelines} />
      <Route path="/terms" component={TermsConditions} />
      <Route exact path="/profile/edit" component={ProfileEdit} />
      <Route exact path="/profile" component={Profile} />
      <Route path="/workshop/:id" component={Workshop} />
      <Route path="/shareyourskill" component={ShareSkill} />
      <Route path="/learnskill" component={LearnSkill} />
    </div>
  </Router>
);
