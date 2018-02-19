/*global FB*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { service } from '../../services/service'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      }
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const APP_ID = "618914508265405"
    window.fbAsyncInit = function() {
      FB.init({
        appId      : APP_ID,
        cookie     : true,  // enable cookies to allow the server to access the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.11' // use version 2.11
      });

      // Now that we've initialized the JavaScript SDK, we call
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.
      FB.getLoginStatus(function(response) {
        this.statusChangeCallback(response);
      }.bind(this));
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11&appId=${APP_ID}`;
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
    });
  }

  // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      this.testAPI();
      service.fblogin(response);
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      //document.getElementById('status').innerHTML = 'Please log into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      //document.getElementById('status').innerHTML = 'Please log into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  checkLoginState() {
    console.log("checking login state");
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }

  handleFBbuttonClick() {
    console.log("handling button click")
    FB.login(this.checkLoginState());
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e){
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      service.login(email,password);
    }
    console.log('signin', this.state);
  }

  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-1">
            <div className="panel-body">
              <form>
                <fieldset>
                  <div className="form-group">
                    <div id='social-login-button-facebook'>
                      <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="true" onClick={() => this.handleFBbuttonClick()}></div>
                    </div>
                    <button className='btn btn-lg btn-facebook btn-block' type='button' onClick={() => this.handleFBbuttonClick()}>
                      Log in with Facebook
                    </button>
                    <label style={{ margin: '5% 0 5% 50%'}}> or </label>
                    <input className="form-control" placeholder="Email" name="email" type="text" onChange={this.onChange}></input>
                  </div>
                  <div className="form-group">
                    <input className="form-control" placeholder="Password" name="password" type="password" onChange={this.onChange}></input>
                  </div>
                  <button className='btn btn-lg btn-primary btn-block' type='button' onClick={this.handleSubmit}>
                    Log in
                  </button>
                </fieldset>
              </form>
            </div>
            <div>{this.state.error.message}</div>
            <div>
              <Link style={{ margin: '30%'}} to={'#'}>Not a user? Sign up.</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm;
