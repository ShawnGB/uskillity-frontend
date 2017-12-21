import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../components/home/Home';
import About from '../components/about/About';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import Courses from '../components/courses/Courses';
import Profile from '../components/dashboard/profile/Profile';
import Workshop from '../components/workshop/Workshop';
import ShareSkill from '../components/dashboard/ShareSkill';

export default () => (
  <Router>
    <div>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/courses' component={Courses} />
      <Route path='/profile' component={Profile} />
      <Route path='/workshop' component={Workshop} />
      <Route path='/shareyourskill' component={ShareSkill} />
    </div>
  </Router>
);
