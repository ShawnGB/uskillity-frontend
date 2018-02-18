import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Navbar from "app:components/nav-bar";
import Footer from "app:components/footer";
import ModalRoot from "app:components/modal-root";
import AuthRoot from "app:components/auth-root";

import About from "app:routes/about";
import Home from "app:routes/home";
import Profile from "app:routes/profile/Profile";
import ProfileEdit from "app:routes/profile/ProfileEdit";
import Courses from "app:routes/courses";
import Workshop from "app:routes/workshop";
import ShareSkill from "app:routes/shareSkill";
import LearnSkill from "app:routes/learnSkill";

export default () => (
  <Router>
    <div>
      <Navbar />
      <div className="container">
        <div style={{ minHeight: "75vh" }}>
          <Route exact path="/" component={Home} />
          <Route path="/about" render={props => <About subpath="vision" />} />
          <Route path="/terms" render={props => <About subpath="terms" />} />

          <Route path="/courses" component={Courses} />
          <Route exact path="/profile/edit" component={ProfileEdit} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/workshop/:id" component={Workshop} />
          <Route path="/shareyourskill" component={ShareSkill} />
          <Route path="/learnskill" component={LearnSkill} />
          <Route path="/learnskill/:id" component={LearnSkill} />
        </div>
      </div>
      <Footer />
      <ModalRoot />
      <AuthRoot />
    </div>
  </Router>
);
