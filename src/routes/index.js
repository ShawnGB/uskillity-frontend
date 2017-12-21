import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../components/home/Home';
import About from '../components/about/About';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import Courses from '../components/courses/Courses';
import Profile from '../components/dashboard/profile/Profile';

export default () => (
  <Router>
    <div>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/courses' component={Courses} />
      <Route path='/profile' component={Profile} />
    </div>
  </Router>
);
