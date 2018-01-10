import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Home from "../components/home/Home";
import About from "../components/about/About";
import Vision from "../components/about/Vision";
import Courses from "../components/courses/Courses";
import Profile from "../components/dashboard/profile/Profile";
import ProfileEdit from "../components/dashboard/profile/ProfileEdit";
import Workshop from "../components/workshop/Workshop";
import ShareSkill from "../components/dashboard/ShareSkill";

export default () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/vision" component={Vision} />
      <Route path="/courses" component={Courses} />
      <Route exact path="/profile/edit" component={ProfileEdit} />
      <Route exact path="/profile" component={Profile} />
      <Route path="/workshop" component={Workshop} />
      <Route path="/shareyourskill" component={ShareSkill} />
    </div>
  </Router>
);
