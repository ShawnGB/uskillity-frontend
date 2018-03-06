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
import Version from "app:routes/version";
import Impressum from "app:routes/impressum";
import Datenschutz from "app:routes/datenshutz";

import { ToastContainer } from "react-toastify";

export default () => (
  <Router>
    <div>
      <ToastContainer autoClose={8000} />

      <MenuBar />
      <div className="container">
        <div style={{ minHeight: "75vh" }}>
          <Route exact path="/" component={Home} />
          <Route path="/about" render={props => <About subpath="vision" />} />
          <Route path="/terms" render={props => <About subpath="terms" />} />
          <Route path="/help" render={props => <About subpath="help" />} />
          <Route
            path="/guidelines"
            render={props => <About subpath="guidelines" />}
          />
          <Route path="/team" render={props => <About subpath="team" />} />
          <Route path="/courses" component={Courses} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route path="/workshop/:id" component={Workshop} />
          <Route
            exact
            path="/shareyourskill"
            render={props => <ShareSkill editable={false} />}
          />
          <Route
            path="/shareyourskill/:id/edit"
            render={props => <ShareSkill editable={true} {...props} />}
          />
          <Route exact path="/learnskill" component={LearnSkill} />
          <Route path="/learnskill/:id" component={LearnSkill} />
          <Route path="/version" component={Version} />
          <Route path="/impressum" component={Impressum} />
          <Route path="/datenschutz" component={Datenschutz} />
        </div>
      </div>
      <Footer />
      <ModalRoot />
      <AuthRoot />
    </div>
  </Router>
);
