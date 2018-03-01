import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import MenuBar from "app:components/nav-bar";
import Footer from "app:components/footer";
import ModalRoot from "app:components/modal-root";
import AuthRoot from "app:components/auth-root";

import About from "app:routes/about";
import Home from "app:routes/home";
import Profile from "app:routes/profile/Profile";
import Courses from "app:routes/courses";
import Workshop from "app:routes/workshop";
import ShareSkill from "app:routes/shareSkill";
import LearnSkill from "app:routes/learnSkill";

export default () => (
  <Router>
    <div>
      <MenuBar />
      <div className="container">
        <div style={{ minHeight: "75vh" }}>
          <Route exact path="/" component={Home} />
          <Route path="/about" render={props => <About subpath="vision" />} />
          <Route path="/terms" render={props => <About subpath="terms" />} />
          <Route path="/courses" component={Courses} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route path="/workshop/:id" component={Workshop} />
          <Route exact path="/shareyourskill" render={props => <ShareSkill editable={false}/>} />
          <Route path="/shareyourskill/:id/edit" render={props => <ShareSkill editable={true} {...props}/>} />
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
