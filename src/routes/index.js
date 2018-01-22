import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Home from "app:components/home/Home";
import Vision from "app:components/about/Vision";
import Team from "app:components/about/Team";
import Contact from "app:components/about/Contact";
import Help from "app:components/about/Help";
import Press from "app:components/about/Press";
import Courses from "app:components/courses/Courses";
import Profile from "app:components/dashboard/profile/Profile";
import ProfileEdit from "app:components/dashboard/profile/ProfileEdit";
import Workshop from "app:components/workshop/Workshop";
import ShareSkill from "app:components/dashboard/ShareSkill";
import LearnSkill from "app:components/dashboard/LearnSkill";
import TermsConditions from "app:components/about/TermsConditions";
import Guidelines from "app:components/about/Guidelines";

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
